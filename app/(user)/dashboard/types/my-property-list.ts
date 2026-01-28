
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
  tags: ListingTag[];
};
