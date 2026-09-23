import api from './api';
import type { ApiResponse, Guide, GuideListParams, Review, ReviewListParams } from '../types/api.types';

/**
 * Curated placeholder images for guides (people, portraits)
 */
const GUIDE_PLACEHOLDER_AVATARS = [
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
	'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
];

/**
 * Check if an image URL is valid/usable
 */
function isValidImageUrl(url: string | undefined): boolean {
	if (!url || typeof url !== 'string') return false;
	const validDomains = ['unsplash.com', 'pexels.com', 'picsum.photos', 'placehold.co', 'randomuser.me'];
	return validDomains.some(domain => url.includes(domain));
}

/**
 * Raw guide from API
 */
interface RawGuide {
	id: string | number;
	name: string;
	bio: string;
	location: string;
	district: string;
	avatar?: string;
	rating: number;
	reviewCount: number;
	languages: string[] | Array<{ item: string }>;
	specializations: string[] | Array<{ item: string }>;
	experience: number;
	pricePerDay: number;
	tours: Array<{
		id: string;
		title: string;
		description: string;
		duration: string;
		price: number;
		includes: string[];
	}>;
	verified: boolean;
	responseRate: number;
	responseTime: string;
	coordinates?: {
		lat: number;
		lng: number;
	};
}

/**
 * Normalize raw API data to expected Guide format
 */
function normalizeGuide(raw: RawGuide, index: number = 0): Guide {
	const avatar = isValidImageUrl(raw.avatar)
		? raw.avatar
		: GUIDE_PLACEHOLDER_AVATARS[index % GUIDE_PLACEHOLDER_AVATARS.length];

	return {
		id: String(raw.id),
		name: raw.name,
		bio: raw.bio,
		location: raw.location,
		district: raw.district,
		avatar,
		rating: raw.rating,
		reviewCount: raw.reviewCount,
		languages: Array.isArray(raw.languages)
			? raw.languages.map(l => typeof l === 'string' ? l : l.item).filter(l => !l.includes('error:'))
			: [],
		specializations: Array.isArray(raw.specializations)
			? raw.specializations.map(s => typeof s === 'string' ? s : s.item).filter(s => !s.includes('error:'))
			: [],
		experience: raw.experience,
		pricePerDay: raw.pricePerDay,
		tours: raw.tours || [],
		verified: raw.verified,
		responseRate: raw.responseRate,
		responseTime: raw.responseTime,
		coordinates: raw.coordinates,
	};
}

/**
 * Guide service for API operations
 */
export const guidesService = {
	/**
	 * Get all guides with optional filters
	 */
	async getAll(params?: GuideListParams): Promise<ApiResponse<Guide[]>> {
		const response = await api.get<RawGuide[] | ApiResponse<RawGuide[]>>('/guides', { params });

		const rawData = Array.isArray(response.data)
			? response.data
			: response.data.data;

		const normalizedData = rawData.map((item, index) => normalizeGuide(item, index));

		return {
			data: normalizedData,
			meta: Array.isArray(response.data)
				? { total: normalizedData.length, page: 1, limit: normalizedData.length, totalPages: 1 }
				: response.data.meta,
		};
	},

	/**
	 * Get a single guide by ID
	 */
	async getById(id: string): Promise<Guide> {
		const response = await api.get<RawGuide | { data: RawGuide }>(`/guides/${id}`);

		const rawData = 'data' in response.data && response.data.data
			? response.data.data
			: response.data as RawGuide;

		return normalizeGuide(rawData);
	},

	/**
	 * Get reviews for a guide
	 */
	async getReviews(params: ReviewListParams): Promise<ApiResponse<Review[]>> {
		const response = await api.get<ApiResponse<Review[]> | Review[]>(
			`/guides/${params.listingId}/reviews`,
			{ params: { page: params.page, limit: params.limit } }
		);

		if (Array.isArray(response.data)) {
			return {
				data: response.data,
				meta: { total: response.data.length, page: 1, limit: response.data.length, totalPages: 1 }
			};
		}
		return response.data;
	},

	/**
	 * Get featured guides for homepage
	 */
	async getFeatured(): Promise<Guide[]> {
		const response = await api.get<RawGuide[] | ApiResponse<RawGuide[]>>('/guides', {
			params: { featured: true, limit: 4 }
		});

		const rawData = Array.isArray(response.data)
			? response.data
			: response.data.data;

		return rawData.map((item, index) => normalizeGuide(item, index));
	},
};
