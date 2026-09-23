/**
 * ListingCard component for displaying listing previews
 *
 * @component
 * @example
 * // Basic homestay card
 * <ListingCard
 *   id="1"
 *   type="homestay"
 *   title="Peaceful Cottage in Netarhat"
 *   image="/images/cottage.jpg"
 *   location="Netarhat, Jharkhand"
 *   rating={4.8}
 *   reviewCount={24}
 *   price={2500}
 *   period="per night"
 * />
 *
 * @example
 * // Product card with discount
 * <ListingCard
 *   id="2"
 *   type="product"
 *   title="Tribal Dokra Art Elephant"
 *   image="/images/dokra.jpg"
 *   price={1200}
 *   originalPrice={1500}
 *   badges={[{ label: '20% off', variant: 'secondary' }]}
 * />
 *
 * @example
 * // Guide card with saved state
 * <ListingCard
 *   id="3"
 *   type="guide"
 *   title="Raju - Betla Wildlife Expert"
 *   image="/images/guide.jpg"
 *   location="Betla National Park"
 *   rating={4.9}
 *   reviewCount={56}
 *   price={1500}
 *   period="per day"
 *   isSaved={true}
 *   onSave={(id) => toggleSave(id)}
 * />
 */

export type ListingType = 'homestay' | 'guide' | 'product';

export type BadgeVariant = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';

export interface ListingBadge {
	/** Badge text */
	label: string;
	/** Badge color variant */
	variant?: BadgeVariant;
}

export interface ListingCardProps {
	/** Unique identifier */
	id: string;
	/** Type of listing */
	type: ListingType;
	/** Listing title */
	title: string;
	/** Main image URL */
	image: string;
	/** Fallback image URL if primary fails to load */
	fallbackImage?: string;
	/** Location text (optional for products) */
	location?: string;
	/** Rating value (1-5) */
	rating?: number;
	/** Number of reviews */
	reviewCount?: number;
	/** Current price */
	price: number;
	/** Original price (for showing discount) */
	originalPrice?: number;
	/** Price period (e.g., "per night", "per day") */
	period?: string;
	/** Badges to display on the card */
	badges?: ListingBadge[];
	/** Whether the listing is saved/favorited */
	isSaved?: boolean;
	/** Callback when save button is clicked */
	onSave?: (id: string) => void;
	/** Additional CSS classes */
	className?: string;
}
