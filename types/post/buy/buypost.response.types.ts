export type BuyPostDraftResponse = {
	id?: string;
	offerId?: string;
	draftOfferId?: string;
	postId?: string;
	data?: {
		id?: string;
		offerId?: string;
		draftOfferId?: string;
		postId?: string;
	};
};

export type BuyPostDetailsResponse = {
	id?: string;
	lastCompletedStep?: number;
	title?: string;
	description?: string;
	propertyType?: string;
	landSizeMin?: number;
	landSizeUnit?: string;
	plotSizeMin?: number;
	plotSizeUnit?: string;
	roadDistanceMin?: number;
	roadDistanceMax?: number;
	budgetMin?: number;
	budgetMax?: number;
	division?: string;
	district?: string;
	upazila?: string;
	unionOrCityCorp?: string;
	wardNo?: string;
	postalCode?: string;
	fullAddress?: string;
	address?: {
		division?: string;
		district?: string;
		upazila?: string;
		unionOrCityCorp?: string;
		wardNo?: string;
		postalCode?: string;
	};
};
