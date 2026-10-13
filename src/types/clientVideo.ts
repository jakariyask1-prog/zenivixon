export type ClientCallType =
  | "Discovery Call"
  | "Client Review"
  | "Architecture Scoping"
  | "Pilot Sprint Review";

export interface ClientConversationVideo {
  id: string;
  clientName: string;
  role: string;
  companyOrIndustry: string;
  country: string;
  flag: string;
  topicTitle: string;
  keyTakeaway: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  tag: ClientCallType;
}
