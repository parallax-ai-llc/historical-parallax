import os
import re
import sys
from pathlib import Path

# Windows 터미널 UTF-8 출력 설정
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

def fix_document_structure_v2(file_path):
    """마크다운 문서의 구조를 수정합니다 - References 섹션을 마지막으로 이동

    Returns:
        tuple: (was_fixed, error_message)
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # ##으로 시작하는 모든 섹션 헤더 찾기
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
        return False, "Not enough sections"

    # References 섹션들 위치 찾기
    references_indices = []
    for i, section in enumerate(sections):
        section_name = section['line'][2:].strip().lower()
        if section_name == "references":
            references_indices.append(i)

    if len(references_indices) == 0:
        return False, "No References section found"
    elif len(references_indices) == 1:
        # References가 하나만 있으면, References 뒤에 다른 섹션이 있는지 확인
        ref_index = references_indices[0]
        if ref_index < len(sections) - 1:
            # References 뒤에 섹션이 있음 - References를 마지막으로 이동
            pass  # 아래 로직에서 처리
        else:
            return False, "References is already last"
    else:
        # References가 여러 개 있음 - 첫 번째를 제외하고 삭제
        pass  # 아래 로직에서 처리

    # References 섹션의 내용 추출
    first_ref_idx = references_indices[0]
    first_ref = sections[first_ref_idx]

    # References 섹션의 끝 찾기 (다음 섹션 전까지)
    if first_ref_idx < len(sections) - 1:
        next_section = sections[first_ref_idx + 1]
        ref_end = next_section['start']
    else:
        ref_end = len(content)

    # References 섹션의 전체 내용 (헤더 포함)
    ref_full_text = content[first_ref['start']:ref_end]

    # References 섹션 앞의 내용 (frontmatter + 다른 섹션들)
    content_before_ref = content[:first_ref['start']]

    # References 뒤에 있는 모든 섹션들의 내용
    content_after_ref = content[ref_end:]

    # 새로운 순서:
    # content_before_ref + content_after_ref + ref_full_text
    new_content = content_before_ref + content_after_ref + ref_full_text

    # 파일 쓰기
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, ""

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
    skipped = 0

    print(f"총 {total}개 문서를 수정합니다...")
    print()

    for i, filename in enumerate(files_to_fix, 1):
        file_path = articles_dir / filename
        if not file_path.exists():
            errors.append(f"{filename}: 파일 없음")
            continue

        was_fixed, error_msg = fix_document_structure_v2(file_path)

        if was_fixed:
            fixed += 1
            print(f"[{i}/{total}] {filename} - 수정 완료")
        else:
            if error_msg == "References is already last" or "No References section found" in error_msg:
                skipped += 1
            else:
                errors.append(f"{filename}: {error_msg}")

    print()
    print("=" * 80)
    print(f"수정 완료: {fixed}/{total}")
    print(f"건너뜀 (이미 올바름): {skipped}")
    print(f"오류: {len(errors)}")
    print("=" * 80)

    if errors and len(errors) <= 20:
        print("\n오류 목록:")
        for error in errors:
            print(f"  - {error}")
    elif len(errors) > 20:
        print(f"\n오류가 너무 많아 생략합니다 (총 {len(errors)}개)")

if __name__ == "__main__":
    main()
