/**
 * Common API response types
 */

export interface ApiResponse<T> {
	data: T;
	meta?: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface ApiError {
	message: string;
	status: number;
	errors?: Record<string, string[]>;
}

/**
 * Homestay types
 */
export interface Homestay {
	id: string;
	title: string;
	description: string;
	location: string;
	district: string;
	price: number;
	rating: number;
	reviewCount: number;
	images: string[];
	amenities: string[];
	hostId: string;
	hostName: string;
	hostAvatar?: string;
	capacity: {
		guests: number;
		bedrooms: number;
		beds: number;
		bathrooms: number;
	};
	propertyType: 'entire' | 'private' | 'shared';
	minStay: number;
	maxStay: number;
	houseRules: string[];
	coordinates?: {
		lat: number;
		lng: number;
	};
}

export interface HomestayListParams {
	page?: number;
	limit?: number;
	district?: string;
	minPrice?: number;
	maxPrice?: number;
	minRating?: number;
	amenities?: string[];
	sortBy?: 'price' | 'rating' | 'newest';
	sortOrder?: 'asc' | 'desc';
}

/**
 * Guide types
 */
export interface Guide {
	id: string;
	name: string;
	bio: string;
	location: string;
	district: string;
	avatar?: string;
	rating: number;
	reviewCount: number;
	languages: string[];
	specializations: string[];
	experience: number;
	pricePerDay: number;
	tours: Tour[];
	verified: boolean;
	responseRate: number;
	responseTime: string;
	coordinates?: {
		lat: number;
		lng: number;
	};
}

export interface Tour {
	id: string;
	title: string;
	description: string;
	duration: string;
	price: number;
	includes: string[];
}

export interface GuideListParams {
	page?: number;
	limit?: number;
	district?: string;
	languages?: string[];
	minRating?: number;
	sortBy?: 'rating' | 'price' | 'experience';
	sortOrder?: 'asc' | 'desc';
}

/**
 * Product types
 */
export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	originalPrice?: number;
	category: string;
	images: string[];
	artisan: {
		id: string;
		name: string;
		location: string;
		avatar?: string;
	};
	rating: number;
	reviewCount: number;
	inStock: boolean;
	craftStory?: string;
	materials: string[];
	dimensions?: string;
}

export interface ProductListParams {
	page?: number;
	limit?: number;
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	inStock?: boolean;
	sortBy?: 'price' | 'rating' | 'newest';
	sortOrder?: 'asc' | 'desc';
}

/**
 * Search types
 */
export interface SearchResult {
	id: string;
	type: 'homestay' | 'guide' | 'product';
	title: string;
	location: string;
	price: number;
	rating: number;
	reviewCount: number;
	image: string;
}

export interface SearchParams {
	query: string;
	type?: 'homestay' | 'guide' | 'product' | 'all';
	page?: number;
	limit?: number;
}

/**
 * Booking types
 */
export interface Booking {
	id: string;
	userId: string;
	listingId: string;
	listingType: 'homestay' | 'guide';
	listingTitle: string;
	listingImage: string;
	checkIn: string;
	checkOut: string;
	guests: {
		adults: number;
		children: number;
	};
	pricing: {
		basePrice: number;
		nights: number;
		subtotal: number;
		serviceFee: number;
		total: number;
	};
	status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
	createdAt: string;
}

export interface CreateBookingData {
	listingId: string;
	listingType: 'homestay' | 'guide';
	checkIn: string;
	checkOut: string;
	guests: {
		adults: number;
		children: number;
	};
}

/**
 * Review types
 */
export interface Review {
	id: string;
	userId: string;
	userName: string;
	userAvatar?: string;
	rating: number;
	content: string;
	date: string;
	listingId: string;
	listingType: 'homestay' | 'guide' | 'product';
}

export interface ReviewListParams {
	listingId: string;
	listingType: 'homestay' | 'guide' | 'product';
	page?: number;
	limit?: number;
}

/**
 * Cart types
 */
export interface CartItem {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
}
