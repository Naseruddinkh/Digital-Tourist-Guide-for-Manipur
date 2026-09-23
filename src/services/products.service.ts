import api from './api';
import type { ApiResponse, Product, ProductListParams, Review, ReviewListParams } from '../types/api.types';

/**
 * Curated placeholder images for products (crafts, handicrafts)
 */
const PRODUCT_PLACEHOLDER_IMAGES = [
	'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop',
];

/**
 * Check if an image URL is valid/usable
 */
function isValidImageUrl(url: string): boolean {
	if (!url || typeof url !== 'string') return false;
	if (url.startsWith('/') || url.startsWith('data:') || url.startsWith('blob:')) return true;
	try {
		const parsed = new URL(url);
		return ['http:', 'https:'].includes(parsed.protocol);
	} catch {
		return false;
	}
}

/**
 * Get a placeholder image based on index
 */
function getPlaceholderImage(index: number): string {
	return PRODUCT_PLACEHOLDER_IMAGES[index % PRODUCT_PLACEHOLDER_IMAGES.length];
}

/**
 * Raw product from API
 */
interface RawProduct {
	id: string | number;
	title: string;
	description: string;
	price: number;
	originalPrice?: number;
	category: string;
	images: string[] | Array<{ item: string }>;
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
	materials: string[] | Array<{ item: string }>;
	dimensions?: string;
}

/**
 * Normalize raw API data to expected Product format
 */
function normalizeProduct(raw: RawProduct, index: number = 0): Product {
	// Extract and validate images
	const rawImages = Array.isArray(raw.images)
		? raw.images.map(img => typeof img === 'string' ? img : img.item)
		: [];

	const validImages = rawImages.filter(isValidImageUrl);
	const images = validImages.length > 0
		? validImages
		: [getPlaceholderImage(index), getPlaceholderImage(index + 1)];

	return {
		id: String(raw.id),
		title: raw.title,
		description: raw.description,
		price: raw.price,
		originalPrice: raw.originalPrice,
		category: raw.category,
		images,
		artisan: raw.artisan,
		rating: raw.rating,
		reviewCount: raw.reviewCount,
		inStock: raw.inStock,
		craftStory: raw.craftStory,
		materials: Array.isArray(raw.materials)
			? raw.materials.map(m => typeof m === 'string' ? m : m.item).filter(m => !m.includes('error:'))
			: [],
		dimensions: raw.dimensions,
	};
}

/**
 * Product service for API operations
 */
export const productsService = {
	/**
	 * Get all products with optional filters
	 */
	async getAll(params?: ProductListParams): Promise<ApiResponse<Product[]>> {
		const response = await api.get<RawProduct[] | ApiResponse<RawProduct[]>>('/products', { params });

		const rawData = Array.isArray(response.data)
			? response.data
			: response.data.data;

		const normalizedData = rawData.map((item, index) => normalizeProduct(item, index));

		return {
			data: normalizedData,
			meta: Array.isArray(response.data)
				? { total: normalizedData.length, page: 1, limit: normalizedData.length, totalPages: 1 }
				: response.data.meta,
		};
	},

	/**
	 * Get a single product by ID
	 */
	async getById(id: string): Promise<Product> {
		const response = await api.get<RawProduct | { data: RawProduct }>(`/products/${id}`);

		const rawData = 'data' in response.data && response.data.data
			? response.data.data
			: response.data as RawProduct;

		return normalizeProduct(rawData);
	},

	/**
	 * Get reviews for a product
	 */
	async getReviews(params: ReviewListParams): Promise<ApiResponse<Review[]>> {
		const response = await api.get<ApiResponse<Review[]> | Review[]>(
			`/products/${params.listingId}/reviews`,
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
	 * Get featured products for homepage
	 */
	async getFeatured(): Promise<Product[]> {
		const response = await api.get<RawProduct[] | ApiResponse<RawProduct[]>>('/products', {
			params: { featured: true, limit: 4 }
		});

		const rawData = Array.isArray(response.data)
			? response.data
			: response.data.data;

		return rawData.map((item, index) => normalizeProduct(item, index));
	},

	/**
	 * Get products by category
	 */
	async getByCategory(category: string, limit?: number): Promise<Product[]> {
		const response = await api.get<RawProduct[] | ApiResponse<RawProduct[]>>('/products', {
			params: { category, limit }
		});

		const rawData = Array.isArray(response.data)
			? response.data
			: response.data.data;

		return rawData.map((item, index) => normalizeProduct(item, index));
	},
};
