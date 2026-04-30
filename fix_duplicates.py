import os
import re
import sys
from pathlib import Path

# Windows 터미널 UTF-8 출력 설정
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

def fix_duplicate_references(file_path):
    """중복된 References 헤더를 수정합니다.

    Returns:
        tuple: (was_fixed, error_message)
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    ## ## References## References 같은 패턴을 ## References로 수정
    duplicate_ref_pattern = r'##\s+References\s*##\s+References'
    content = re.sub(duplicate_ref_pattern, '## References', content)

    if content == original_content:
        return False, "변경 사항 없음"

    # 파일 쓰기
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return True, ""

def main():
    csv_path = Path("duplicate_issues.csv")

    if not csv_path.exists():
        print("duplicate_issues.csv 파일이 없습니다. 먼저 check_duplicates.py를 실행하세요.")
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

        was_fixed, error_msg = fix_duplicate_references(file_path)

        if was_fixed:
            fixed += 1
            print(f"[{i}/{total}] {filename} - 수정 완료")
        else:
            if "변경 사항 없음" in error_msg:
                skipped += 1
            else:
                errors.append(f"{filename}: {error_msg}")

    print()
    print("=" * 80)
    print(f"수정 완료: {fixed}/{total}")
    print(f"건너뜀: {skipped}")
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
