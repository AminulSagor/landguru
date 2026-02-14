export type AgentRole = "Lawyer" | "Surveyor" | "Deed Writer" | "Field Assistant";

export interface AgentServiceOption {
  id: string;
  title: string;
}

export interface AgentOnboardFormState {
  role: AgentRole;

  personal: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    bankName: string;
    bankAccountNo: string;
    bankSwiftCode: string;
    bankRoutingNo: string;
  };

  location: {
    division: string;
    district: string;
    upazila: string;
    pourashavaOrUnion: string;
    wardNo: string;
    fullAddress: string;
  };

  services: {
    selectedServiceIds: string[];
    feesByServiceId: Record<string, string>; // "3000"
  };

  verification: {
    nidNumber: string;
    nidFrontFileName?: string;
    nidBackFileName?: string;
    tinNumber: string;
    tinFileName?: string;
  };
}
