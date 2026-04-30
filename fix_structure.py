import os
import re
import sys
from pathlib import Path

# Windows 터미널 UTF-8 출력 설정
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

def fix_document_structure(file_path):
    """마크다운 문서의 구조를 수정합니다.

    Returns:
        tuple: (was_fixed, sections_moved, error_message)
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # ##으로 시작하는 모든 섹션 헤더 찾기 (위치와 함께)
    section_pattern = r'^(##\s+.+)$'
    sections = []
    for match in re.finditer(section_pattern, content, re.MULTILINE):
        section_line = match.group(1)
        sections.append({
            'start': match.start(),
            'end': match.end(),
            'line': section_line.strip()
        })

    if len(sections) < 2:
        return False, 0, "Not enough sections"

    # References 섹션 위치 찾기
    references_index = -1
    for i, section in enumerate(sections):
        section_name = section['line'][2:].strip().lower()
        if section_name == "references":
            references_index = i
            break

    # References 섹션이 없으면 패스
    if references_index == -1:
        return False, 0, "No References section found"

    # References 뒤에 다른 섹션이 있는지 확인
    if references_index >= len(sections) - 1:
        return False, 0, "No sections after References"

    # References 섹션 시작 위치와 끝 위치
    references_start = sections[references_index]['start']
    references_end = sections[references_index]['end']

    # References 뒤에 있는 모든 섹션들의 내용을 추출
    # References 섹션 끝부터 파일 끝까지
    sections_after_references = sections[references_index + 1:]

    if not sections_after_references:
        return False, 0, "No sections to move"

    # References 뒤에 있는 모든 내용을 저장
    content_after_references = content[references_end:]

    # References 앞의 내용
    content_before_references = content[:references_start]

    # 파일의 frontmatter와 첫 번째 섹션 사이에 있는 빈 줄 등을 유지하기 위해
    # frontmatter 끝을 찾음
    frontmatter_match = re.match(r'^---\n.*?\n---\n\n?', content, re.DOTALL)
    if frontmatter_match:
        frontmatter_end = frontmatter_match.end()
    else:
        frontmatter_end = 0

    # 첫 번째 섹션의 시작 위치
    if len(sections) > 0:
        first_section_start = sections[0]['start']
        if first_section_start > frontmatter_end:
            # frontmatter와 첫 섹션 사이에 있는 내용
            between_content = content[frontmatter_end:first_section_start]
        else:
            between_content = ""
    else:
        between_content = ""

    # 새로운 순서로 재구성:
    # frontmatter + 섹션들 (References 전까지) + References 뒤에 있던 섹션들 + References + References 뒤에 있던 내용들
    # 하지만 References 뒤에 있던 섹션들의 내용은 이미 content_after_references에 포함됨

    # References 섹션의 텍스트
    references_section_text = content[references_start:references_end]

    # References 앞 섹션들의 끝
    sections_before_references = sections[:references_index]
    if sections_before_references:
        before_references_end = sections_before_references[-1]['end']
    else:
        before_references_end = references_start

    # 전체 파일을 세 부분으로 나눔:
    # 1. References 섹션 끝까지 (References 포함)
    # 2. References 뒤에 있는 섹션들
    # 3. 나머지 (없어야 함)

    # 실제로는:
    # References 섹션의 시작 전까지를 content_part1
    # References 섹션 뒤에 있는 섹션들의 전체 내용을 content_part2
    # References 섹션 자체를 references_section

    content_before_refs = content[:references_start]
    content_part2 = content[references_end:]  # References 뒤에 있는 모든 내용

    # References 뒤에 있는 섹션들의 시작 위치를 찾음
    next_section_start = None
    if len(sections) > references_index + 1:
        next_section_start = sections[references_index + 1]['start']

    # References 뒤의 첫 섹션 시작 전까지의 내용 (빈 줄 등)
    trailing_content = ""
    if next_section_start and next_section_start > references_end:
        trailing_content = content[references_end:next_section_start]

    # 첫 섹션 끝 전까지
    content_part1 = content[:references_start]

    # References 뒤 섹션들의 전체 내용
    content_after_refs = content[references_end:]

    # 새 순서: content_part1 + content_after_refs + references_section_text
    new_content = content_part1 + content_after_refs + "\n\n" + references_section_text

    # 파일 쓰기
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, len(sections_after_references), ""

def main():
    csv_path = Path("structure_issues.csv")

    if not csv_path.exists():
        print("structure_issues.csv 파일이 없습니다. 먼저 check_structure.py를 실행하세요.")
        return

    # CSV에서 문서 목록 읽기
    files_to_fix = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines[1:]:  # 헤더 건너뜀
            if line.strip():
                parts = line.strip().split('","')
                if len(parts) >= 1:
                    filename = parts[0].strip('"')
                    files_to_fix.append(filename)

    articles_dir = Path("content/articles")

    total = len(files_to_fix)
    fixed = 0
    errors = []

    print(f"총 {total}개 문서를 수정합니다...")
    print()

    for i, filename in enumerate(files_to_fix, 1):
        file_path = articles_dir / filename
        if not file_path.exists():
            errors.append(f"{filename}: 파일 없음")
            continue

        was_fixed, sections_moved, error_msg = fix_document_structure(file_path)

        if was_fixed:
            fixed += 1
            print(f"[{i}/{total}] {filename} - {sections_moved}개 섹션 이동 완료")
        else:
            if error_msg:
                errors.append(f"{filename}: {error_msg}")
            else:
                errors.append(f"{filename}: 수정 불필요")

    print()
    print("=" * 80)
    print(f"수정 완료: {fixed}/{total}")
    print(f"오류/건너뜀: {len(errors)}")
    print("=" * 80)

    if errors and len(errors) <= 50:
        print("\n오류 목록:")
        for error in errors[:50]:
            print(f"  - {error}")
        if len(errors) > 50:
            print(f"  ... 그 외 {len(errors) - 50}개 오류")

if __name__ == "__main__":
    main()
