// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  githubId: string;
}

// GitHub related types
export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string | null;
  stars: number;
  forks: number;
  isPrivate: boolean;
  url: string;
  // Optional fields that might be populated when setting up a bounty
  activeBounty?: Bounty;
  contributors?: Contributor[];
}

export interface Contributor {
  id: string;
  login: string;
  avatarUrl: string;
  contributions: ContributionStats;
  contributionPercentage?: number;
  walletAddress?: string;
}

export interface ContributionStats {
  commits: number;
  pullRequests: number;
  linesAdded: number;
  linesDeleted: number;
  filesChanged: number;
  reviews: number;
  // Optional code quality metrics
  codeQuality?: {
    complexity: number;
    duplications: number;
    testCoverage?: number;
    lintErrors: number;
  };
}

// Bounty related types
export interface Bounty {
  id: string;
  repositoryId: string;
  title: string;
  description: string;
  totalAmount: number;
  currency: "ETH" | "USDC" | "MATIC"; // Can add more currencies as needed
  status: BountyStatus;
  startDate: string;
  endDate: string;
  distributionCriteria: DistributionCriteria;
  createdAt: string;
  createdBy: string;
}

export type BountyStatus =
  | "draft"
  | "active"
  | "calculating"
  | "distributing"
  | "completed"
  | "cancelled";

export interface DistributionCriteria {
  weights: {
    commits: number;
    pullRequests: number;
    codeQuality: number;
    reviews: number;
  };
  minimumContribution?: {
    commits?: number;
    pullRequests?: number;
  };
  excludedUsers?: string[]; // GitHub usernames to exclude
  customRules?: CustomRule[];
}

export interface CustomRule {
  type: "bonus" | "penalty";
  condition: string; // e.g., "commits > 10"
  value: number; // percentage to add/subtract
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Form types
export interface BountyFormData {
  title: string;
  description: string;
  totalAmount: number;
  currency: Bounty["currency"];
  startDate: string;
  endDate: string;
  distributionCriteria: DistributionCriteria;
}

// Blockchain related types
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  status: "pending" | "confirmed" | "failed";
  timestamp: string;
}

export interface Distribution {
  bountyId: string;
  contributor: string;
  amount: number;
  percentage: number;
  transactionHash?: string;
  status: "pending" | "completed" | "failed";
}

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  chainId: number;
}
