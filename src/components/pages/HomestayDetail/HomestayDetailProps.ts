/**
 * HomestayDetail page component for viewing a homestay listing
 *
 * @component
 * @example
 * // Basic usage with ID
 * <HomestayDetail homestayId="123" />
 *
 * @example
 * // With pre-loaded data
 * <HomestayDetail
 *   homestay={homestayData}
 *   onBook={(dates, guests) => handleBooking(dates, guests)}
 * />
 */

export interface HomestayHost {
	/** Host ID */
	id: string;
	/** Host name */
	name: string;
	/** Host avatar URL */
	avatar?: string;
	/** Whether host is verified */
	isVerified?: boolean;
	/** Host since date */
	memberSince?: string;
	/** Response rate */
	responseRate?: number;
	/** Response time */
	responseTime?: string;
	/** Host bio */
	bio?: string;
}

export interface HomestayAmenity {
	/** Amenity ID */
	id: string;
	/** Amenity label */
	label: string;
	/** Material icon name */
	icon: string;
	/** Category */
	category?: 'basic' | 'comfort' | 'safety' | 'outdoor';
}

export interface HomestayReview {
	/** Review ID */
	id: string;
	/** Reviewer name */
	name: string;
	/** Reviewer avatar */
	avatar?: string;
	/** Review date */
	date: string;
	/** Rating */
	rating: number;
	/** Review text */
	text: string;
}

export interface DateRange {
	/** Check-in date */
	checkIn: Date | null;
	/** Check-out date */
	checkOut: Date | null;
}

export interface HomestayData {
	/** Homestay ID */
	id: string;
	/** Title */
	title: string;
	/** Location */
	location: string;
	/** Full address */
	address?: string;
	/** Exact map coordinates for this homestay */
	coordinates?: {
		lat: number;
		lng: number;
	};
	/** Description */
	description: string;
	/** Images array */
	images: string[];
	/** Rating */
	rating: number;
	/** Review count */
	reviewCount: number;
	/** Price per night */
	pricePerNight: number;
	/** Max guests */
	maxGuests: number;
	/** Number of bedrooms */
	bedrooms: number;
	/** Number of bathrooms */
	bathrooms: number;
	/** Host info */
	host: HomestayHost;
	/** Amenities */
	amenities: HomestayAmenity[];
	/** House rules */
	houseRules?: string[];
	/** Reviews */
	reviews: HomestayReview[];
	/** Check-in time */
	checkInTime?: string;
	/** Check-out time */
	checkOutTime?: string;
	/** Cancellation policy */
	cancellationPolicy?: string;
}

export interface HomestayDetailProps {
	/** Homestay ID (for fetching data) */
	homestayId?: string;
	/** Pre-loaded homestay data */
	homestay?: HomestayData;
	/** Whether data is loading */
	loading?: boolean;
	/** Whether homestay is saved */
	isSaved?: boolean;
	/** Callback when save is toggled */
	onSave?: () => void;
	/** Callback when share is clicked */
	onShare?: () => void;
	/** Callback when booking is submitted */
	onBook?: (dates: DateRange, guests: number) => void;
	/** Callback when contact host is clicked */
	onContactHost?: () => void;
	/** Additional CSS classes */
	className?: string;
}
