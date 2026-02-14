type Role = "Surveyor" | "Lawyer" | "Field Assistant" | "Deed Writer";

interface Profile {
  image: string;
  name: string;
  profileId: string;
}

export interface Agent {
  id: string;
  profile: Profile;
  role: Role;
  assigned_zone: string;
  contact: string;
  perfomance: string;
  status: "on" | "off";
}
