# Historical Parallax - Data Collector

이 디렉토리는 Claude Code를 활용하여 역사적/정치적 인물에 대한 데이터를 자동으로 수집하는 스크립트를 포함합니다.

## 구조

```
data-collector/
├── collect.js          # 메인 수집 스크립트
├── person-list.json    # 수집 대상 인물 목록
├── prompts/
│   └── article-prompt.md   # Claude에게 전달할 프롬프트 템플릿
└── README.md
```

## 사전 요구사항

1. **Claude Code CLI 설치**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **API 키 설정**
   ```bash
   export ANTHROPIC_API_KEY=your-api-key
   ```

## 사용법

### 다음 미수집 인물 처리
```bash
node collect.js
```

### 특정 인물 처리
```bash
node collect.js --id=gandhi-mohandas
```

### 모든 미수집 인물 처리
```bash
node collect.js --all
```

## 새 인물 추가하기

`person-list.json` 파일에 새 인물을 추가합니다:

```json
{
  "id": "unique-id",
  "name": "Full Name in English",
  "nameKo": "한국어 이름",
  "nationality": "Country",
  "collected": false
}
```

## GitHub Actions 자동화

이 저장소는 GitHub Actions를 통해 매일 자동으로 데이터를 수집합니다.

### 워크플로우 설정

1. GitHub 저장소 Settings > Secrets에서 `ANTHROPIC_API_KEY` 추가
2. Actions 탭에서 워크플로우 활성화

### 수동 실행

Actions 탭에서 "Collect Historical Data" 워크플로우를 수동으로 실행할 수 있습니다:
- 특정 인물 ID 지정 가능
- "Collect all" 옵션으로 모든 미수집 인물 처리 가능

## 데이터 형식

생성되는 Markdown 파일은 다음 형식을 따릅니다:

```markdown
---
id: "person-id"
name: "Full Name"
nameKo: "한국어 이름"
birth: "YYYY-MM-DD"
death: "YYYY-MM-DD"
nationality: "Country"
occupation: ["직업1", "직업2"]
image: "Wikimedia Commons URL"
socialLinks:
  wikipedia: "URL"
lastUpdated: "YYYY-MM-DD"
---

## Summary
...

## Early Life (초기 삶)
...

## Middle Years (중기 삶)
...

## Later Life (말년)
...

## Positive Perspectives (긍정 평가)
...

## Negative Perspectives (부정 평가)
...

## Recent News
...

## Career Timeline
...

## References
...
```

## 주의사항

- API 비용이 발생할 수 있습니다
- 생성된 콘텐츠는 반드시 사람이 검토해야 합니다
- 출처 정보의 정확성을 확인하세요
- Wikimedia Commons 이미지 라이선스를 준수하세요
