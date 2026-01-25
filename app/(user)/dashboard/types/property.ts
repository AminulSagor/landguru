export type PropertyTag = "Plain Land" | "Flat" | "Water Land";
export type PropertyMode = "Sell Post" | "Buy Request";

export type Property = {
  id: string;
  title: string;
  locationText: string; // e.g. "Sector 4, Dhaka"
  areaText?: string; // optional small line
  price: number; // store as number
  currencySymbol?: string; // "৳"
  coverImage: string; // url or /public path
  tag: PropertyTag;
  mode: PropertyMode;
  verified?: boolean;
};
