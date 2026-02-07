import { Property } from "@/app/(admin)/admin/types/property.types";

export const properties: Property[] = [
  // -------------------- PENDING REVIEW --------------------
  {
    id: "POST-1042",
    title: "5 Katha Plot in Sector 4",
    addressLine1: "Block-C, Banani, Banani Thana, Dhaka North City",
    addressLine2: "Corporation, Dhaka-1213, Dhaka, Bangladesh.",
    propertyType: "Flat",
    tags: [
      { label: "Flat", tone: "blue" },
      { label: "#POST-1042", tone: "gray" },
    ],
    thumbUrl: "/images/properties/flat-1.png",
    ask: "৳ 2 Cr",
    val: "Pending",
    owner: {
      name: "Mr. Rahman",
      phone: "+880123456789",
      uid: "#9921",
      avatarUrl: "/images/properties/flat-1.png",
    },
    progress: { labelLeft: "Progress", done: 0, total: 0 },
    status: {
      key: "pending_review",
      label: "Pending Review",
      metaLabel: "Submitted:",
      metaTime: "10 mins ago",
    },
    action: { kind: "review", label: "Review" },

    details: {
      header: {
        backLabel: "Property Listings",
        postRef: "#POST-1042",
        statusBadgeLabel: "Pending Review",
      },
      metricsUnit: "Katha",

      postInformation: {
        postedBy: {
          name: "Mr. Rahman",
          phone: "+880123456789",
          uid: "#9921",
          avatarUrl: "/images/properties/flat-1.png",
        },
        askingPrice: "৳ 2,00,00,000",
        locationText:
          "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
        facts: [
          { label: "Sellable Land Amount", value: "15 Katha" },
          { label: "Plot Size", value: "15 Katha" },
          { label: "Distance from Road", value: "200m~750m" },
          { label: "Share Unit", value: "1 Katha" },
        ],
        description:
          "A stunning newly renovated villa featuring an open-concept living area, chef’s kitchen with top-tier appliances, and a private backyards oasis.. Read More",
        media: {
          photos: [
            { url: "/images/properties/p1.png" },
            { url: "/images/properties/p2.png" },
            { url: "/images/properties/p3.png" },
            { url: "/images/properties/p4.png" },
            { url: "/images/properties/p5.png" },
          ],
          video: { thumbUrl: "/images/properties/video-thumb.png" },
        },
      },

      askingVsValidated: {
        askingPerUnit: "৳ 13,33,333",
        askingTotal: "৳ 2,00,00,000",
        validatedPerUnit: "৳ 13,33,333",
        validatedTotal: "৳ 2,00,00,000",
      },

      chosenServices: {
        mandatory: [
          { label: "Ownership History Validation" },
          { label: "Physical estimate & Border Demarcation" },
          { label: "Pentagraph Map" },
          { label: "Document Organization" },
        ],
        optional: [
          { label: "Property Registration/ Deed Writing Service", selected: true },
          {
            label: "Namjari/ DCR/ Pouro City Corp Record Update",
            selected: true,
          },
          { label: "Inheritance Dispute Analysis", selected: true },
          { label: "Government Acquisition Risk", selected: false },
          { label: "Court case verification", selected: false },
        ],
      },

      serviceFees: {
        isPaid: false,
        mandatoryFee: "৳ 3000",
        optionalFee: "৳ 3000",
      },

      documents: {
        canReorganize: false,
        sections: [
          {
            title: "Deed section",
            items: [
              { name: "Deed document 1.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "Deed document 2.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "Deed document 2.pdf", sizeLabel: "1.5MB", kind: "pdf" },
            ],
          },
          {
            title: "Khatian section",
            items: [
              { name: "CS Khatian.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "SA Khatian.docx", sizeLabel: "1.5MB", kind: "docx" },
              { name: "RS Khatian.pdf", sizeLabel: "1.5MB", kind: "pdf" },
            ],
          },
          {
            title: "Other Documents (VAT, Tax, etc.)",
            items: [
              { name: "Other 1.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "Other 2.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "Other 2.pdf", sizeLabel: "1.5MB", kind: "pdf" },
            ],
          },
        ],
      },
    },
  },

  // -------------------- LIVE --------------------
  {
    id: "POST-1044",
    title: "Commercial Plot 10 Katha",
    addressLine1: "Block-C, Banani, Banani Thana, Dhaka North City",
    addressLine2: "Corporation, Dhaka-1213, Dhaka, Bangladesh.",
    propertyType: "Land",
    tags: [
      { label: "Land", tone: "purple" },
      { label: "#POST-1044", tone: "gray" },
    ],
    thumbUrl: "/images/properties/flat-1.png",
    ask: "৳ 2.2 Crore",
    val: "৳ 2.1 Crore",
    owner: {
      name: "Ms. Sarah",
      phone: "+880123456789",
      uid: "#4421",
      avatarUrl: "/images/properties/flat-1.png",
    },
    progress: {
      labelLeft: "Progress",
      done: 7,
      total: 9,
      note: { text: "Pending Assign", count: 1 },
    },
    status: {
      key: "live",
      label: "Live",
      metaLabel: "Published:",
      metaTime: "1h ago",
    },
    action: { kind: "view_details", label: "View Details" },

    details: {
      header: {
        backLabel: "Property Listings",
        postRef: "#POST-1044",
        statusBadgeLabel: "Live",
      },
      metricsUnit: "Katha",

      postInformation: {
        postedBy: {
          name: "Ms. Sarah",
          phone: "+880123456789",
          uid: "#4421",
          avatarUrl: "/images/properties/flat-1.png",
        },
        askingPrice: "৳ 2,00,00,000",
        locationText:
          "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
        facts: [
          { label: "Sellable Land Amount", value: "10 Katha" },
          { label: "Plot Size", value: "10 Katha" },
          { label: "Distance from Road", value: "200m~750m" },
        ],
        description:
          "A stunning newly renovated villa featuring an open-concept living area, chef’s kitchen with top-tier appliances, and a private backyards oasis.. Read More",
        media: {
          photos: [
            { url: "/images/properties/p1.png" },
            { url: "/images/properties/p2.png" },
            { url: "/images/properties/p3.png" },
            { url: "/images/properties/p4.png" },
            { url: "/images/properties/p5.png" },
          ],
          video: { thumbUrl: "/images/properties/video-thumb.png" },
        },
      },

      askingVsValidated: {
        askingPerUnit: "৳ 20,00,000",
        askingTotal: "৳ 2,00,00,000",
        validatedPerUnit: "৳ 21,00,000",
        validatedTotal: "৳ 2,10,00,000",
      },

      chosenServices: {
        mandatory: [
          { label: "Ownership History Validation" },
          { label: "Physical estimate & Border Demarcation" },
          { label: "Pentagraph Map" },
          { label: "Document Organization" },
        ],
        optional: [
          { label: "Property Registration/ Deed Writing Service", selected: true },
          {
            label: "Namjari/ DCR/ Pouro City Corp Record Update",
            selected: true,
          },
          { label: "Inheritance Dispute Analysis", selected: true },
          { label: "Government Acquisition Risk", selected: false },
          { label: "Court case verification", selected: false },
        ],
      },

      serviceFees: {
        isPaid: true,
        mandatoryFee: "৳ 3000",
        optionalFee: "৳ 3000",
      },

      documents: {
        canReorganize: true,
        sections: [
          {
            title: "Deed section",
            items: [
              { name: "Deed document 1.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "Deed document 2.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "Deed document 2.pdf", sizeLabel: "1.5MB", kind: "pdf" },
            ],
          },
          {
            title: "Khatian section",
            items: [
              { name: "CS Khatian.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "SA Khatian.docx", sizeLabel: "1.5MB", kind: "docx" },
              { name: "RS Khatian.pdf", sizeLabel: "1.5MB", kind: "pdf" },
            ],
          },
          {
            title: "Other Documents (VAT, Tax, etc.)",
            items: [
              { name: "Other 1.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "Other 2.pdf", sizeLabel: "1.5MB", kind: "pdf" },
              { name: "Other 2.pdf", sizeLabel: "1.5MB", kind: "pdf" },
            ],
          },
        ],
      },

      serviceProgress: {
        completedText: "(7/9 Completed)",
        noteText: "Pending 1 agent(s) to assign",
        rows: [
          {
            serviceType: "Pentagraph Map",
            progressStatus: "pending",
            action: { kind: "assign", label: "Assign" },
          },
          {
            serviceType: "Ownership History Validation",
            assignedAgent: { name: "Rahman", role: "Lawyer" },
            progressStatus: "pending",
            action: { kind: "view", label: "View" },
          },
          {
            serviceType: "Physical estimate & Border Demarcation",
            assignedAgent: { name: "Rahman", role: "Lawyer" },
            progressStatus: "in_progress",
            action: { kind: "view", label: "View" },
          },
          {
            serviceType: "Document Organization",
            assignedAgent: { name: "Sahil", role: "Lawyer" },
            progressStatus: "submitted",
            action: { kind: "review", label: "Review" },
          },
          {
            serviceType: "Property Registration/ Deed Writing Service",
            assignedAgent: { name: "Faisal", role: "Lawyer" },
            progressStatus: "verified",
            action: { kind: "view", label: "View" },
          },
        ],
      },

      ownershipHistory: {
        title: "List of previous owners",
        canEdit: true,
        owners: [
          { name: "Farhan", dateRange: "2022 - Present", isCurrent: true },
          { name: "Mithila Akhter", dateRange: "2010 - 2022" },
          { name: "Trusted Developer", dateRange: "2007 - 2010" },
        ],
      },

      authenticityChecklist: {
        title: "Risk & Due Diligence Checklist",
        canEdit: true,
        items: [
          { label: "Fraud Detection Passed", checked: true },
          { label: "Multiple ownership checked", checked: true },
          { label: "Court case verification passed", checked: true },
          { label: "Inheritance dispute analysis checked", checked: true },
          { label: "Government acquisition risk checked", checked: true },
        ],
      },
    },
  },

  // -------------------- SOLD --------------------
  {
    id: "POST-1046",
    title: "Modern Duplex Villa",
    addressLine1: "Block-C, Banani, Banani Thana, Dhaka North City",
    addressLine2: "Corporation, Dhaka-1213, Dhaka, Bangladesh.",
    propertyType: "Land",
    tags: [
      { label: "Land", tone: "purple" },
      { label: "#POST-1046", tone: "gray" },
    ],
    thumbUrl: "/images/properties/flat-1.png",
    ask: "৳ 42 Lakh",
    val: "৳ 40 Lakh",
    owner: {
      name: "Ms. Sarah",
      phone: "+880123456789",
      uid: "#4421",
      avatarUrl: "/images/properties/flat-1.png",
    },
    progress: { labelLeft: "All Clear", done: 9, total: 9 },
    status: {
      key: "sold",
      label: "Sold",
      metaLabel: "Sold:",
      metaTime: "1d ago",
    },
    action: { kind: "view_details", label: "View Details" },

    details: {
      header: {
        backLabel: "Property Listings",
        postRef: "#POST-1046",
        statusBadgeLabel: "Sold",
      },
      metricsUnit: "Katha",

      buyer: {
        name: "Mr. Abul Hasan",
        buyerId: "ID: #4421",
        phone: "+88017...12",
        email: "abul.h@example.com",
        avatarUrl: "/images/users/buyer.png",
      },
      finalDeal: {
        label: "FINAL DEAL AMOUNT",
        soldOn: "14 Oct 2026",
        amount: "৳ 2,10,00,000",
      },

      postInformation: {
        postedBy: {
          name: "Ms. Sarah",
          phone: "+880123456789",
          uid: "#4421",
          avatarUrl: "/images/properties/flat-1.png",
        },
        askingPrice: "৳ 2,10,00,000",
        locationText:
          "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
        facts: [
          { label: "Sellable Land Amount", value: "10 Katha" },
          { label: "Plot Size", value: "10 Katha" },
          { label: "Distance from Road", value: "200m~750m" },
        ],
        description:
          "A stunning newly renovated villa featuring an open-concept living area, chef’s kitchen with top-tier appliances, and a private backyards oasis.. Read More",
        media: {
          photos: [
            { url: "/images/properties/p1.png" },
            { url: "/images/properties/p2.png" },
            { url: "/images/properties/p3.png" },
            { url: "/images/properties/p4.png" },
            { url: "/images/properties/p5.png" },
          ],
          video: { thumbUrl: "/images/properties/video-thumb.png" },
        },
      },

      askingVsValidated: {
        askingPerUnit: "৳ 20,00,000",
        askingTotal: "৳ 2,00,00,000",
        validatedPerUnit: "৳ 21,00,000",
        validatedTotal: "৳ 2,10,00,000",
      },

      chosenServices: {
        mandatory: [
          { label: "Ownership History Validation" },
          { label: "Physical estimate & Border Demarcation" },
          { label: "Pentagraph Map" },
          { label: "Document Organization" },
        ],
        optional: [
          { label: "Property Registration/ Deed Writing Service", selected: true },
          {
            label: "Namjari/ DCR/ Pouro City Corp Record Update",
            selected: true,
          },
          { label: "Inheritance Dispute Analysis", selected: true },
          { label: "Government Acquisition Risk", selected: false },
          { label: "Court case verification", selected: false },
        ],
      },

      serviceFees: {
        isPaid: true,
        mandatoryFee: "৳ 3000",
        optionalFee: "৳ 3000",
      },

      documents: {
        canReorganize: true,
        sections: [
          { title: "Deed section", items: [] },
          { title: "Khatian section", items: [] },
          { title: "Other Documents (VAT, Tax, etc.)", items: [] },
        ],
      },

      serviceProgress: {
        completedText: "(9/9 Completed)",
        rows: [
          {
            serviceType: "Pentagraph Map",
            assignedAgent: { name: "Salman", role: "Field Assistant" },
            progressStatus: "verified",
            action: { kind: "view", label: "View" },
          },
          {
            serviceType: "Ownership History Validation",
            assignedAgent: { name: "Rahman", role: "Lawyer" },
            progressStatus: "verified",
            action: { kind: "view", label: "View" },
          },
          {
            serviceType: "Physical estimate & Border Demarcation",
            assignedAgent: { name: "Rahman", role: "Lawyer" },
            progressStatus: "verified",
            action: { kind: "view", label: "View" },
          },
          {
            serviceType: "Document Organization",
            assignedAgent: { name: "Sahil", role: "Admin(You)" },
            progressStatus: "verified",
            action: { kind: "view", label: "View" },
          },
          {
            serviceType: "Property Registration/ Deed Writing Service",
            assignedAgent: { name: "Faisal", role: "Lawyer" },
            progressStatus: "verified",
            action: { kind: "view", label: "View" },
          },
        ],
      },

      ownershipHistory: {
        title: "List of previous owners",
        canEdit: true,
        owners: [
          { name: "Farhan", dateRange: "2022 - Present", isCurrent: true },
          { name: "Mithila Akhter", dateRange: "2010 - 2022" },
          { name: "Trusted Developer", dateRange: "2007 - 2010" },
        ],
      },

      authenticityChecklist: {
        title: "Risk & Due Diligence Checklist",
        canEdit: true,
        items: [
          { label: "Fraud Detection Passed", checked: true },
          { label: "Multiple ownership checked", checked: true },
          { label: "Court case verification passed", checked: true },
          { label: "Inheritance dispute analysis checked", checked: true },
          { label: "Government acquisition risk checked", checked: true },
        ],
      },
    },
  },

  // -------------------- REJECTED --------------------
  {
    id: "POST-1047",
    title: "Sothern Villa in Sector 2",
    addressLine1: "Block-C, Banani, Banani Thana, Dhaka North City",
    addressLine2: "Corporation, Dhaka-1213, Dhaka, Bangladesh.",
    propertyType: "Land",
    tags: [
      { label: "Land", tone: "purple" },
      { label: "#POST-1047", tone: "gray" },
    ],
    thumbUrl: "/images/properties/flat-1.png",
    ask: "৳ 42 Lakh",
    val: "৳ 40 Lakh",
    owner: {
      name: "Ms. Sarah",
      phone: "+880123456789",
      uid: "#4421",
      avatarUrl: "/images/properties/flat-1.png",
    },
    progress: { labelLeft: "Progress", done: 0, total: 0 },
    status: {
      key: "rejected",
      label: "Rejected",
      metaLabel: "Rejected:",
      metaTime: "1d ago",
    },
    action: { kind: "view_details", label: "View Details" },

    details: {
      header: {
        backLabel: "Property Listings",
        postRef: "#POST-1047",
        statusBadgeLabel: "Rejected",
      },
      metricsUnit: "Katha",

      rejection: {
        title: "REJECTED",
        message: "The user didn’t meet the minimum requirement to fulfill the post",
      },

      postInformation: {
        postedBy: {
          name: "Ms. Sarah",
          phone: "+880123456789",
          uid: "#4421",
          avatarUrl: "/images/properties/flat-1.png",
        },
        askingPrice: "৳ 2,10,00,000",
        locationText:
          "Block-C, Banani, Banani Thana, Dhaka North City Corporation, Dhaka-1213, Dhaka, Bangladesh.",
        facts: [
          { label: "Sellable Land Amount", value: "10 Katha" },
          { label: "Plot Size", value: "10 Katha" },
          { label: "Distance from Road", value: "200m~750m" },
        ],
        description:
          "A stunning newly renovated villa featuring an open-concept living area, chef’s kitchen with top-tier appliances, and a private backyards oasis.. Read More",
        media: {
          photos: [
            { url: "/images/properties/p1.png" },
            { url: "/images/properties/p2.png" },
            { url: "/images/properties/p3.png" },
            { url: "/images/properties/p4.png" },
            { url: "/images/properties/p5.png" },
          ],
          video: { thumbUrl: "/images/properties/video-thumb.png" },
        },
      },

      askingVsValidated: {
        askingPerUnit: "৳ 20,00,000",
        askingTotal: "৳ 2,00,00,000",
        validatedPerUnit: "৳ 0",
        validatedTotal: "৳ 0",
      },

      chosenServices: {
        mandatory: [
          { label: "Ownership History Validation" },
          { label: "Physical estimate & Border Demarcation" },
          { label: "Pentagraph Map" },
          { label: "Document Organization" },
        ],
        optional: [
          { label: "Property Registration/ Deed Writing Service", selected: true },
          {
            label: "Namjari/ DCR/ Pouro City Corp Record Update",
            selected: true,
          },
          { label: "Inheritance Dispute Analysis", selected: true },
          { label: "Government Acquisition Risk", selected: false },
          { label: "Court case verification", selected: false },
        ],
      },

      serviceFees: {
        isPaid: false,
        mandatoryFee: "৳ 3000",
        optionalFee: "৳ 3000",
      },

      documents: {
        canReorganize: false,
        emptyLabel: "None",
        sections: [],
      },

      serviceProgress: {
        completedText: "(0/9 Completed)",
        rows: [
          {
            serviceType: "Pentagraph Map",
            progressStatus: "none",
            action: { kind: "disabled", label: "View" },
          },
          {
            serviceType: "Ownership History Validation",
            progressStatus: "none",
            action: { kind: "disabled", label: "View" },
          },
          {
            serviceType: "Physical estimate & Border Demarcation",
            progressStatus: "none",
            action: { kind: "disabled", label: "View" },
          },
          {
            serviceType: "Document Organization",
            progressStatus: "none",
            action: { kind: "disabled", label: "View" },
          },
          {
            serviceType: "Property Registration/ Deed Writing Service",
            progressStatus: "none",
            action: { kind: "disabled", label: "View" },
          },
        ],
      },
    },
  },
];
