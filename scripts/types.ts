// Legal case types for the Legal Parallax system

export interface CaseMeta {
  id: string;
  title: string;
  court: string;
  country: "KR" | "US";
  date: string;
  caseNumber: string;
  parties: {
    plaintiff: string;
    defendant: string;
  };
  category: string[];
  keywords: string[];
  summary: string;
  lastUpdated: string;
  sourceUrl: string;
}

export interface Case {
  meta: CaseMeta;
  content: string;
  toc: TocItem[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Raw data from Korea Law API
export interface KoreaRawCase {
  판례일련번호: string;
  사건명: string;
  사건번호: string;
  선고일자: string;
  법원명: string;
  사건종류명: string;
  판시사항: string;
  판결요지: string;
  참조조문: string;
  참조판례: string;
  전문: string;
}

// Raw data from CourtListener API
export interface CourtListenerCase {
  id: number;
  absolute_url: string;
  case_name: string;
  case_name_short: string;
  court: string;
  court_id: string;
  date_filed: string;
  docket_number: string;
  citation: string[];
  judges: string;
  nature_of_suit: string;
  posture: string;
  syllabus: string;
  procedural_history: string;
  holding: string;
  plain_text: string;
  html: string;
}

// Normalized case structure for AI processing
export interface NormalizedCase {
  id: string;
  title: string;
  court: string;
  country: "KR" | "US";
  date: string;
  caseNumber: string;
  parties: {
    plaintiff: string;
    defendant: string;
  };
  category: string[];
  keywords: string[];
  sourceUrl: string;

  // Content sections (AI generated)
  summary: string;
  caseOverview: string;
  issues: string;
  holding: string;
  plaintiffArguments: string;
  defendantArguments: string;
  significance: string;
  timeline: Array<{ date: string; event: string }>;
  references: string[];
}

// Collection options
export interface CollectorOptions {
  startDate?: string;
  endDate?: string;
  limit?: number;
  courtType?: string;
}
