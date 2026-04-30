import os
import re
import sys
from pathlib import Path

# Windows 터미널 UTF-8 출력 설정
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

def check_duplicates(file_path):
    """마크다운 문서에서 중복된 References 섹션을 검사합니다.

    Returns:
        tuple: (has_issue, issue_description)
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    ## ## References## References 같은 패턴 검사
    duplicate_ref_pattern = r'##\s+References\s*##\s+References'
    if re.search(duplicate_ref_pattern, content):
        return True, "중복된 References 헤더"

    ## ##으로 시작하는 모든 References 섹션 헤더 찾기
    section_pattern = r'^##\s+References\s*$'
    matches = list(re.finditer(section_pattern, content, re.MULTILINE))

    if len(matches) > 1:
        return True, f"{len(matches)}개의 References 섹션"

    return False, ""

def main():
    articles_dir = Path("content/articles")

    # 모든 .md 파일 검사
    issues = []
    total = 0

    for md_file in articles_dir.glob("*.md"):
        total += 1
        has_issue, description = check_duplicates(md_file)
        if has_issue:
            issues.append((md_file.name, description))

    # CSV 파일로 저장
    with open("duplicate_issues.csv", "w", encoding="utf-8") as f:
        f.write("filename,issue_description\n")
        for filename, description in sorted(issues):
            f.write(f'"{filename}","{description}"\n')

    # 결과 출력
    print(f"총 검사한 문서: {total}")
    print(f"중복 References 문제가 있는 문서: {len(issues)}")
    print()
    print(f"결과가 'duplicate_issues.csv' 파일로 저장되었습니다.")
    print()

    # 상위 20개만 샘플로 출력
    print("=" * 80)
    print("중복 References 문제가 있는 문서 목록 (상위 20개):")
    print("=" * 80)

    for filename, description in sorted(issues)[:20]:
        print(f"\n[FILE] {filename}")
        print(f"   {description}")

    if len(issues) > 20:
        print(f"\n... 그 외 {len(issues) - 20}개 문서는 CSV 파일에서 확인하세요.")

if __name__ == "__main__":
    main()
