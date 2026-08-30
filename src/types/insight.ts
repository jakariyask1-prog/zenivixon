export interface InsightArticle {
  slug: string;
  title: string;
  summary: string;
  category: "AI Agents" | "AI Automation" | "AI Integration" | "Engineering" | "AI Architecture" | "Software Engineering";
  readingTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
  };
  content: {
    heading: string;
    body: string;
  }[];
  keyTakeaways: string[];
}
