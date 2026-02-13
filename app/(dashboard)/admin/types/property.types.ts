export type PropertyType = "Flat" | "Land";

export type StatusKey =
  | "pending_review"
  | "service_fee_paid"
  | "live"
  | "sold"
  | "partially_sold"
  | "rejected";

export type MetricUnit = "Katha" | "Sqft" | "Decimal" | "Bigha";
export type DocKind = "pdf" | "doc" | "docx" | "image" | "other";

export type Property = {
  id: string;
  title: string;
  propertyType: PropertyType;
  addressLine1: string;
  addressLine2: string;
  tags: { label: string; tone: "blue" | "purple" | "red" | "gray" }[];
  thumbUrl: string;

  ask: string;
  val: string;

  owner: {
    name: string;
    phone: string;
    uid: string;
    avatarUrl: string;
  };

  progress: {
    labelLeft: string;
    done: number;
    total: number;
    note?: { text: string; count?: number };
  };

  status: {
    key: StatusKey;
    label: string;
    metaLabel: string;
    metaTime: string;
  };

  action: { kind: "review" | "active" | "view_details"; label: string };

  details?: PropertyDetails;
};

export type PropertyDetails = {
  header: {
    backLabel?: string;
    postRef: string; // "#POST-1042"
    statusBadgeLabel: string;
  };

  metricsUnit: MetricUnit;

  buyer?: {
    name: string;
    buyerId: string;
    phone: string;
    email: string;
    avatarUrl: string;
  };

  finalDeal?: {
    label: string;
    soldOn: string;
    amount: string;
  };

  rejection?: {
    title: string;
    message: string;
  };

  postInformation: {
    postedBy: Property["owner"];
    askingPrice: string;
    locationText: string;
    facts: { label: string; value: string }[];
    description: string;
    media: {
      photos: { url: string }[];
      video?: { url?: string; thumbUrl?: string };
    };
  };

  askingVsValidated: {
    askingPerUnit: string;
    askingTotal: string;
    validatedPerUnit: string;
    validatedTotal: string;
  };

  chosenServices: {
    mandatory: { label: string }[];
    optional: { label: string; selected: boolean }[];
  };

  serviceFees: {
    isPaid: boolean;
    mandatoryFee: string;
    optionalFee: string;
  };

  documents: {
    canReorganize: boolean;
    emptyLabel?: string;
    sections: {
      title: string;
      items: { name: string; sizeLabel: string; kind: DocKind; url?: string }[];
    }[];
  };

  serviceProgress?: {
    completedText: string; // "(7/9 Completed)"
    noteText?: string;
    rows: {
      serviceType: string;
      serviceRef?: string;
      assignedAgent?: { name: string; role: string; avatarUrl?: string };
      progressStatus:
        | "none"
        | "pending"
        | "in_progress"
        | "submitted"
        | "verified";
      action: {
        kind: "assign" | "view" | "review" | "disabled";
        label: string;
      };
    }[];
  };

  ownershipHistory?: {
    title: string;
    canEdit: boolean;
    owners: { name: string; dateRange: string; isCurrent?: boolean }[];
  };

  authenticityChecklist?: {
    title: string;
    canEdit: boolean;
    items: { label: string; checked: boolean }[];
  };
};
