import {
  AgentSchedule,
  Appointment,
} from "@/app/(dashboard)/admin/types/appointment-types";
import { IMAGE } from "@/constants/image-paths";

//=======appointments=======//
export const appointments: Appointment[] = [
  {
    id: "apt_0001",
    requestedAt: "2026-10-26T14:00:00+06:00",
    property: {
      image: IMAGE.property,
      name: "Gulshan Ave Apt",
      id: "#POST-1044",
    },
    buyer: {
      image: IMAGE.avatar,
      name: "Mr. Rahim",
      phoneNumber: "+880 1711-2091XX",
    },
    owner: {
      image: IMAGE.avatar,
      name: "Anwar Hossain",
      phoneNumber: "+880 1822-555XXX",
    },
    status: "pending_scheduling",
  },

  {
    id: "apt_0002",
    requestedAt: "2026-10-26T13:00:00+06:00",
    property: {
      image: IMAGE.property,
      name: "Bashundhara R-Block",
      id: "#POST-1045",
    },
    buyer: {
      image: IMAGE.avatar,
      name: "Mr. Hasan",
      phoneNumber: "+880 1911-304XXX",
    },
    owner: {
      image: IMAGE.avatar,
      name: "Sarah Karim",
      phoneNumber: "+880 1633-888XXX",
    },
    status: "confirmed",
  },

  {
    id: "apt_0003",
    requestedAt: "2026-10-26T12:00:00+06:00",
    property: {
      image: IMAGE.property,
      name: "Banani Block-C",
      id: "#POST-1046",
    },
    buyer: {
      image: IMAGE.avatar,
      name: "Mr. Kamal",
      phoneNumber: "+880 1711-XXXXXX",
    },
    owner: {
      image: IMAGE.avatar,
      name: "Mr. Shafiq",
      phoneNumber: "+880 1822-XXXXXX",
    },
    status: "pending_scheduling",
  },

  {
    id: "apt_0004",
    requestedAt: "2026-10-26T10:00:00+06:00",
    property: {
      image: IMAGE.property,
      name: "Dhanmondi Lake View",
      id: "#POST-1047",
    },
    buyer: {
      image: IMAGE.avatar,
      name: "Mr. Arif",
      phoneNumber: "+880 1912-XXXXXX",
    },
    owner: {
      image: IMAGE.avatar,
      name: "Nusrat Jahan",
      phoneNumber: "+880 1555-XXXXXX",
    },
    status: "pending_scheduling",
  },

  {
    id: "apt_0005",
    requestedAt: "2026-10-25T15:00:00+06:00",
    property: {
      image: IMAGE.property,
      name: "Uttara Sector 7",
      id: "#POST-1048",
    },
    buyer: {
      image: IMAGE.avatar,
      name: "Mr. Tanvir",
      phoneNumber: "+880 1700-XXXXXX",
    },
    owner: {
      image: IMAGE.avatar,
      name: "Fahim Ahmed",
      phoneNumber: "+880 1811-XXXXXX",
    },
    status: "confirmed",
  },
];

//=======agent schedule=======//
export const agentSchedules: AgentSchedule[] = [
  {
    id: "sched_0001",
    scheduledAt: "2026-10-26T14:00:00+06:00",
    property: {
      image: IMAGE.property,
      name: "Banani Block-C",
      id: "#POST-1044",
    },
    service: {
      icon: "map",
      name: "Pentagraph Map",
      id: "#SERV-892",
    },
    agent: {
      image: IMAGE.avatar,
      name: "Surveyor Karim",
      phoneNumber: "+880 1711-2091XX",
    },
    status: "scheduled",
  },

  {
    id: "sched_0002",
    scheduledAt: "2026-10-26T16:30:00+06:00",
    property: {
      image: IMAGE.property,
      name: "Gulshan Ave Apt",
      id: "#POST-1045",
    },
    service: {
      icon: "document",
      name: "Ownership History",
      id: "#SERV-893",
    },
    agent: {
      image: IMAGE.avatar,
      name: "Adv. Sahil",
      phoneNumber: "+880 1822-555XXX",
    },
    status: "scheduled",
  },

  {
    id: "sched_0003",
    scheduledAt: "2026-10-27T10:00:00+06:00",
    property: {
      image: IMAGE.property,
      name: "Uttara Sector 7",
      id: "#POST-1046",
    },
    service: {
      icon: "measure",
      name: "Physical Demarcation",
      id: "#SERV-894",
    },
    agent: {
      image: IMAGE.avatar,
      name: "Mr. Faisal",
      phoneNumber: "+880 1633-888XXX",
    },
    status: "visited",
  },
];
