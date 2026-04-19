export interface AgentDetailsProfileHeader {
  id: string;
  name: string;
  photoUrl: string | null;
  agentType: string;
  isNidVerified: boolean;
  isActive: boolean;
  joinedDate: string | null;
}

export interface AgentDetailsStats {
  totalTasks: number;
  totalEarned: number;
  lastPayoutDate: string | null;
}

export interface AgentDetailsPersonalInformation {
  fullName: string;
  phone: string;
  email: string;
}

export interface AgentDetailsBankInformation {
  bankName: string;
  bankAccountNo: string;
  swiftCode: string;
  routingNo: string;
}

export interface AgentDetailsAssignedLocation {
  id: string;
  userId: string;
  division: string;
  district: string;
  upazila: string;
  unionOrCityCorp: string;
  wardNo: string;
  postalCode: string;
  fullAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentDetailsServiceProvidedItem {
  name: string;
  fee: number;
}

export interface AgentDetailsVerificationDocumentItem {
  number: string | null;
  isVerified: boolean;
}

export interface AgentDetailsVerificationDocuments {
  nid: AgentDetailsVerificationDocumentItem;
  tin: AgentDetailsVerificationDocumentItem;
}

export interface AgentDetails {
  profileHeader: AgentDetailsProfileHeader;
  stats: AgentDetailsStats;
  personalInformation: AgentDetailsPersonalInformation;
  bankInformation: AgentDetailsBankInformation;
  assignedLocation: AgentDetailsAssignedLocation | null;
  servicesProvided: AgentDetailsServiceProvidedItem[];
  verificationDocuments: AgentDetailsVerificationDocuments;
}

export interface AgentDetailsResponse {
  success: boolean;
  data: AgentDetails;
}