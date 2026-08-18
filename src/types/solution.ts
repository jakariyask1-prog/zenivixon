export interface SolutionFeature {
  title: string;
  description: string;
  outcome: string;
}

export interface SolutionPillar {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  positioning: string;
  description: string;
  problemStatement: string;
  solutionApproach: string;
  features: SolutionFeature[];
  useCases: {
    title: string;
    description: string;
    targetRole: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
}
