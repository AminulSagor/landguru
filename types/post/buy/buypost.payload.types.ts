export type PropertyTypeLabel =
	| "Plain Land"
	| "Flat"
	| "Commercial"
	| "Water Land"
	| "Agro Land"
	| "Blank Roof";

export type LandSizeUnitLabel = "Sqft" | "Katha" | "Decimal" | "Acre" | "Bigha";

export type createBuyPostDraftPayload = {
	title: string;
	description: string;
	propertyType: PropertyTypeLabel;
	landSizeMin: number;
	landSizeUnit: LandSizeUnitLabel;
	budgetMin: number;
	budgetMax: number;
	plotSizeMin?: number;
	plotSizeUnit?: LandSizeUnitLabel;
	roadDistanceMin?: number;
	roadDistanceMax?: number;
	division?: string;
	district?: string;
	upazila?: string;
	unionOrCityCorp?: string;
	wardNo?: string;
	postalCode?: string;
};
