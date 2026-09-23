/**
 * SearchFilters organism component for filtering search results
 *
 * @component
 * @example
 * // Basic filters
 * <SearchFilters
 *   filters={filterState}
 *   onChange={(filters) => setFilterState(filters)}
 *   onClear={() => clearAllFilters()}
 * />
 *
 * @example
 * // Homestay-specific filters
 * <SearchFilters
 *   filters={filterState}
 *   listingType="homestay"
 *   onChange={(filters) => setFilterState(filters)}
 *   onClear={() => clearAllFilters()}
 * />
 */

export type ListingTypeFilter = 'all' | 'homestay' | 'guide' | 'product';

export interface PriceRange {
	min: number;
	max: number;
}

export interface FilterState {
	/** Listing type filter */
	listingType: ListingTypeFilter;
	/** Price range filter */
	priceRange: PriceRange;
	/** Minimum rating filter (1-5, 0 means no filter) */
	minRating: number;
	/** Selected district/location */
	district: string;
	/** Selected amenities (for homestays) */
	amenities: string[];
	/** Selected languages (for guides) */
	languages: string[];
	/** Selected categories (for products) */
	categories: string[];
}

export interface SearchFiltersProps {
	/** Current filter state */
	filters: FilterState;
	/** Callback when filters change */
	onChange: (filters: FilterState) => void;
	/** Callback to clear all filters */
	onClear: () => void;
	/** Apply button callback (for mobile) */
	onApply?: () => void;
	/** Current listing type context (affects which filters are shown) */
	listingType?: ListingTypeFilter;
	/** Whether to show the listing type selector */
	showListingTypeSelector?: boolean;
	/** Whether this is displayed in a mobile drawer */
	isMobileDrawer?: boolean;
	/** Additional CSS classes */
	className?: string;
}

// Default empty filter state
export const defaultFilterState: FilterState = {
	listingType: 'all',
	priceRange: { min: 0, max: 10000 },
	minRating: 0,
	district: '',
	amenities: [],
	languages: [],
	categories: [],
};

// Manipur districts and popular travel areas
export const districts = [
	'All Districts',
	'Imphal East',
	'Imphal West',
	'Bishnupur',
	'Churachandpur',
	'Ukhrul',
	'Senapati',
	'Tamenglong',
	'Thoubal',
	'Kangpokpi',
	'Kakching',
];

// Homestay amenities
export const amenities = [
	{ id: 'wifi', label: 'WiFi', icon: 'wifi' },
	{ id: 'parking', label: 'Parking', icon: 'local_parking' },
	{ id: 'ac', label: 'Air Conditioning', icon: 'ac_unit' },
	{ id: 'kitchen', label: 'Kitchen', icon: 'kitchen' },
	{ id: 'pool', label: 'Pool', icon: 'pool' },
	{ id: 'pets', label: 'Pet Friendly', icon: 'pets' },
	{ id: 'breakfast', label: 'Breakfast', icon: 'restaurant' },
	{ id: 'garden', label: 'Garden', icon: 'yard' },
];

// Guide languages
export const languages = [
	{ id: 'hindi', label: 'Hindi' },
	{ id: 'english', label: 'English' },
	{ id: 'santali', label: 'Santali' },
	{ id: 'mundari', label: 'Mundari' },
	{ id: 'ho', label: 'Ho' },
	{ id: 'kurukh', label: 'Kurukh' },
];

// Product categories
export const productCategories = [
	{ id: 'dokra', label: 'Dokra Art' },
	{ id: 'paitkar', label: 'Paitkar Painting' },
	{ id: 'bamboo', label: 'Bamboo Craft' },
	{ id: 'terracotta', label: 'Terracotta' },
	{ id: 'jewelry', label: 'Tribal Jewelry' },
	{ id: 'textile', label: 'Handloom Textiles' },
];
