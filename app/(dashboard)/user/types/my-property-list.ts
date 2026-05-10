
export type ListingTagVariant =
  | "primary"   // FLAT
  | "secondary"
  | "gray"      // pending, draft
  | "green"     // active, verified
  | "danger";   // quoted (custom red from ss)

export type ListingTag = {
  label: string;
  variant: ListingTagVariant;
};

export type ListingCard = {
  id: string;          // "POST-1042"
  title: string;       // "Modern Duplex Villa"
  type: string;        // "Flat"
  price: number;       // 4000000
  time: string;        // "2h ago"
  image: string;       // image url/path
  images?: string[];
  description?: string;
  location?: string;
  postedByName?: string;
  postedByImage?: string;
  sellableAmount?: number | null;
  sellableUnit?: string | null;
  plotSize?: number | null;
  plotUnit?: string | null;
  shareAmount?: number | null;
  shareUnit?: string | null;
  roadDistanceMin?: number | null;
  roadDistanceMax?: number | null;
  sellableAmountText?: string;
  plotSizeText?: string;
  shareAmountText?: string;
  roadDistanceText?: string;
  lastCompletedStep?: number | null;
  tags: ListingTag[];
};
