import os
import re
import sys
from pathlib import Path

# Windows 터미널 UTF-8 출력 설정
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

def check_document_structure(file_path):
    """마크다운 문서의 구조를 검사합니다.

    Returns:
        tuple: (has_issue, issue_description)
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # ##으로 시작하는 모든 섹션 헤더 찾기
    section_pattern = r'^##\s+(.+)$'
    sections = []
    for match in re.finditer(section_pattern, content, re.MULTILINE):
        section_name = match.group(1).strip()
        sections.append((match.start(), section_name))

    if len(sections) < 2:
        return False, ""

    # References 섹션 위치 찾기
    references_index = -1
    for i, (pos, section_name) in enumerate(sections):
        if section_name.lower() == "references":
            references_index = i
            break

    # References 섹션이 없으면 문제 없음
    if references_index == -1:
        return False, ""

    # References 뒤에 다른 섹션이 있는지 확인
    if references_index < len(sections) - 1:
        # References 뒤에 오는 섹션들
        sections_after_references = sections[references_index + 1:]
        section_names = [name for _, name in sections_after_references]
        return True, "; ".join(section_names)

    return False, ""

def main():
    articles_dir = Path("content/articles")

    # 모든 .md 파일 검사
    issues = []
    total = 0

    for md_file in articles_dir.glob("*.md"):
        total += 1
        has_issue, description = check_document_structure(md_file)
        if has_issue:
            issues.append((md_file.name, description))

    # CSV 파일로 저장
    with open("structure_issues.csv", "w", encoding="utf-8") as f:
        f.write("filename,sections_after_references\n")
        for filename, description in sorted(issues):
            f.write(f'"{filename}","{description}"\n')

    # 결과 출력
    print(f"총 검사한 문서: {total}")
    print(f"구조 문제가 있는 문서: {len(issues)}")
    print()
    print(f"결과가 'structure_issues.csv' 파일로 저장되었습니다.")
    print()

    # 상위 20개만 샘플로 출력
    print("=" * 80)
    print("구조 문제가 있는 문서 목록 (상위 20개):")
    print("=" * 80)

    for filename, description in sorted(issues)[:20]:
        print(f"\n[FILE] {filename}")
        sections = description.split("; ")
        print(f"   {len(sections)}개 섹션: {description[:100]}...")

    if len(issues) > 20:
        print(f"\n... 그 외 {len(issues) - 20}개 문서는 CSV 파일에서 확인하세요.")

if __name__ == "__main__":
    main()
