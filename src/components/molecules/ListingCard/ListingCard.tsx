import { Badge } from '../../atoms/Badge';
import { Icon } from '../../atoms/Icon';
import { Price } from '../../atoms/Price';
import { Rating } from '../../atoms/Rating';
import type { ListingCardProps } from './ListingCardProps';

/**
 * ListingCard component for displaying listing previews
 *
 * @param props - Component props
 * @returns ListingCard component
 */
export const ListingCard = ({
	id,
	type,
	title,
	image,
	fallbackImage,
	location,
	rating,
	reviewCount,
	price,
	originalPrice,
	period,
	badges = [],
	isSaved = false,
	onSave,
	className = ''
}: ListingCardProps) => {
	// Build route based on type
	const route = `/${type}s/${id}`;

	// Handle save button click
	const handleSaveClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onSave?.(id);
	};

	// Build accessible label for the card link
	const buildAriaLabel = () => {
		let label = title;
		if (location) label += ` in ${location}`;
		if (rating !== undefined) label += `, rated ${rating.toFixed(1)}`;
		if (reviewCount !== undefined) label += ` with ${reviewCount} reviews`;
		label += `, ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price)}`;
		if (period) label += ` ${period}`;
		return label;
	};

	return (
		<a
			href={route}
			className={`card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 group ${className}`.trim()}
			aria-label={buildAriaLabel()}
		>
			{/* Image container */}
			<figure className="relative aspect-[4/3] overflow-hidden bg-base-200">
				<img
					src={image}
					alt={title}
					loading="lazy"
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					onError={(e) => {
						const target = e.currentTarget;
						if (!target.dataset.hasFallback && fallbackImage) {
							target.dataset.hasFallback = 'true';
							target.src = fallbackImage;
						}
					}}
				/>

				{/* Save button */}
				{onSave && (
					<button
						onClick={handleSaveClick}
						className="absolute top-2 right-2 sm:top-3 sm:right-3 btn btn-circle btn-xs sm:btn-sm bg-base-100/80 hover:bg-base-100 border-none shadow-sm"
						aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
					>
						<Icon
							name={isSaved ? 'favorite' : 'favorite_border'}
							size="sm"
							color={isSaved ? 'error' : 'base-content'}
							fill={isSaved}
						/>
					</button>
				)}

				{/* Badges */}
				{badges.length > 0 && (
					<div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1">
						{badges.map((badge, index) => (
							<Badge
								key={index}
								variant={badge.variant || 'primary'}
								size="sm"
							>
								{badge.label}
							</Badge>
						))}
					</div>
				)}
			</figure>

			{/* Card body */}
			<div className="card-body p-3 sm:p-4">
				{/* Title */}
				<h3 className="card-title text-sm sm:text-base font-semibold line-clamp-2">
					{title}
				</h3>

				{/* Location */}
				{location && (
					<p className="flex items-center gap-1 text-sm text-base-content/70">
						<Icon name="location_on" size="xs" />
						<span className="truncate">{location}</span>
					</p>
				)}

				{/* Rating and Price row */}
				<div className="flex items-center justify-between mt-2">
					{/* Rating */}
					{rating !== undefined && (
						<div className="flex items-center gap-1">
							<Rating
								name={`listing-${id}-rating`}
								value={rating}
								totalStars={1}
								readOnly
								size="xs"
								color="bg-warning"
							/>
							<span className="text-sm font-medium">{rating.toFixed(1)}</span>
							{reviewCount !== undefined && (
								<span className="text-sm text-base-content/60">
									({reviewCount})
								</span>
							)}
						</div>
					)}

					{/* Price */}
					<Price
						amount={price}
						originalAmount={originalPrice}
						period={period}
						size="sm"
					/>
				</div>
			</div>
		</a>
	);
};
