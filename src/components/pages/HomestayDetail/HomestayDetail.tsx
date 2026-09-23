import { useState } from 'react';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Rating } from '../../atoms/Rating';
import { Price } from '../../atoms/Price';
import { Skeleton } from '../../atoms/Skeleton';
import { MapView } from '../../organisms/MapView';
import type { HomestayDetailProps, HomestayData, DateRange } from './HomestayDetailProps';

// Default homestay data
const defaultHomestay: HomestayData = {
	id: '1',
	title: 'Lakeside Homestay near Loktak',
	location: 'Moirang, Manipur',
	address: 'Near Loktak Lake, Bishnupur District, Manipur 795133',
	coordinates: { lat: 24.552, lng: 93.786 },
	description: `Experience the calm beauty of Manipur at our cozy homestay near Loktak Lake. Wake up to soft morning light over the water and spend your days exploring floating islands, forest paths, and nearby villages.

Our homestay offers an authentic glimpse into local life while providing all modern comforts. The rooms feature locally crafted furniture, traditional Manipuri textiles, and artwork by regional artisans.

Perfect for nature lovers, photographers, and anyone seeking a peaceful retreat away from city life. Our family has been hosting guests for over 15 years and we take pride in sharing our culture and cuisine with visitors from around the world.`,
	images: [
		'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop',
		'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
		'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
		'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
		'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
	],
	rating: 4.8,
	reviewCount: 24,
	pricePerNight: 2500,
	maxGuests: 6,
	bedrooms: 2,
	bathrooms: 1,
	host: {
		id: 'h1',
		name: 'Ramesh Singh',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
		isVerified: true,
		memberSince: '2019',
		responseRate: 98,
		responseTime: 'within an hour',
		bio: 'Born and raised near Loktak Lake, I love sharing the beauty of my homeland with visitors. I know the best spots for sunrise views, local food, and quiet nature walks.',
	},
	amenities: [
		{ id: 'wifi', label: 'WiFi', icon: 'wifi', category: 'basic' },
		{ id: 'parking', label: 'Free Parking', icon: 'local_parking', category: 'basic' },
		{ id: 'kitchen', label: 'Kitchen', icon: 'kitchen', category: 'basic' },
		{ id: 'breakfast', label: 'Breakfast Included', icon: 'restaurant', category: 'comfort' },
		{ id: 'garden', label: 'Garden View', icon: 'yard', category: 'outdoor' },
		{ id: 'fireplace', label: 'Fireplace', icon: 'fireplace', category: 'comfort' },
		{ id: 'hiking', label: 'Hiking Trails', icon: 'hiking', category: 'outdoor' },
		{ id: 'first-aid', label: 'First Aid Kit', icon: 'medical_services', category: 'safety' },
	],
	houseRules: [
		'Check-in: 2:00 PM - 8:00 PM',
		'Checkout: 11:00 AM',
		'No smoking inside',
		'Pets allowed (with prior approval)',
		'No parties or events',
		'Quiet hours: 10 PM - 7 AM',
	],
	reviews: [
		{
			id: 'r1',
			name: 'Priya Sharma',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			date: 'December 2024',
			rating: 5,
			text: 'Absolutely magical stay! The sunrise views were breathtaking and Ramesh was an amazing host. The food was delicious - we loved the local tribal dishes.',
		},
		{
			id: 'r2',
			name: 'Aarav Kumar',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			date: 'November 2024',
			rating: 5,
			text: 'Perfect getaway from city life. The cottage is clean, comfortable, and the location is stunning. Ramesh took us on a guided trek that was the highlight of our trip.',
		},
		{
			id: 'r3',
			name: 'Meera Patel',
			date: 'October 2024',
			rating: 4,
			text: 'Beautiful property with amazing views. The only minor issue was the WiFi being a bit slow, but honestly, it made us disconnect and enjoy nature more!',
		},
	],
	checkInTime: '2:00 PM',
	checkOutTime: '11:00 AM',
	cancellationPolicy: 'Free cancellation up to 48 hours before check-in. After that, the first night is non-refundable.',
};

/**
 * HomestayDetail page component
 */
export const HomestayDetail = ({
	homestay = defaultHomestay,
	loading = false,
	isSaved = false,
	onSave,
	onShare,
	onBook,
	onContactHost,
	className = '',
}: HomestayDetailProps) => {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [showAllPhotos, setShowAllPhotos] = useState(false);
	const [dates, setDates] = useState<DateRange>({ checkIn: null, checkOut: null });
	const [guests, setGuests] = useState(2);

	// Calculate total price
	const nights = dates.checkIn && dates.checkOut
		? Math.ceil((dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24))
		: 0;
	const subtotal = nights * homestay.pricePerNight;
	const serviceFee = Math.round(subtotal * 0.12);
	const total = subtotal + serviceFee;

	if (loading) {
		return (
			<div className={`container mx-auto px-4 py-8 ${className}`.trim()}>
				<Skeleton className="h-[400px] w-full rounded-xl mb-6" />
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<Skeleton className="h-8 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
						<Skeleton className="h-32 w-full" />
					</div>
					<div>
						<Skeleton className="h-[300px] w-full rounded-xl" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`min-h-screen bg-base-100 ${className}`.trim()}>
			{/* Image Gallery */}
			<section className="relative">
				{/* Desktop Gallery Grid */}
				<div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-2 h-[400px] lg:h-[500px]">
					<div className="col-span-2 row-span-2">
						<img
							src={homestay.images[0]}
							alt={homestay.title}
							className="w-full h-full object-cover rounded-l-xl cursor-pointer hover:opacity-95"
							onClick={() => setShowAllPhotos(true)}
						/>
					</div>
					{homestay.images.slice(1, 5).map((image, index) => (
						<div key={index} className={index === 1 ? 'rounded-tr-xl overflow-hidden' : index === 3 ? 'rounded-br-xl overflow-hidden' : ''}>
							<img
								src={image}
								alt={`${homestay.title} ${index + 2}`}
								className="w-full h-full object-cover cursor-pointer hover:opacity-95"
								onClick={() => {
									setSelectedImageIndex(index + 1);
									setShowAllPhotos(true);
								}}
							/>
						</div>
					))}
				</div>

				{/* Mobile Gallery */}
				<div className="md:hidden">
					<img
						src={homestay.images[selectedImageIndex]}
						alt={homestay.title}
						className="w-full h-64 object-cover"
					/>
					<div className="flex gap-2 p-2 overflow-x-auto">
						{homestay.images.map((image, index) => (
							<button
								key={index}
								onClick={() => setSelectedImageIndex(index)}
								className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
									index === selectedImageIndex ? 'border-primary' : 'border-transparent'
								}`}
							>
								<img src={image} alt="" className="w-full h-full object-cover" />
							</button>
						))}
					</div>
				</div>

				{/* Show All Photos Button */}
				<button
					onClick={() => setShowAllPhotos(true)}
					className="absolute bottom-4 right-4 btn btn-sm bg-base-100 gap-2 hidden md:flex"
				>
					<Icon name="grid_view" size="sm" />
					Show all photos
				</button>
			</section>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Details */}
					<div className="lg:col-span-2 space-y-8">
						{/* Header */}
						<div>
							<div className="flex items-start justify-between gap-4">
								<div>
									<h1 className="font-heading text-2xl md:text-3xl font-bold">
										{homestay.title}
									</h1>
									<div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-base-content/60">
										<span className="flex items-center gap-1">
											<Icon name="location_on" size="xs" />
											{homestay.location}
										</span>
										<span>•</span>
										<span className="flex items-center gap-1">
											<Icon name="star" size="xs" className="text-warning" />
											<strong className="text-base-content">{homestay.rating}</strong>
											({homestay.reviewCount} reviews)
										</span>
									</div>
								</div>
								<div className="flex gap-2">
									<Button style="ghost" size="sm" onClick={onShare}>
										<Icon name="share" size="sm" />
									</Button>
									<Button
										style="ghost"
										size="sm"
										onClick={onSave}
										className={isSaved ? 'text-error' : ''}
									>
										<Icon name={isSaved ? 'favorite' : 'favorite_border'} size="sm" />
									</Button>
								</div>
							</div>

							{/* Quick Info */}
							<div className="flex flex-wrap gap-4 mt-4 text-sm">
								<span className="flex items-center gap-1">
									<Icon name="group" size="sm" />
									{homestay.maxGuests} guests
								</span>
								<span className="flex items-center gap-1">
									<Icon name="bed" size="sm" />
									{homestay.bedrooms} bedrooms
								</span>
								<span className="flex items-center gap-1">
									<Icon name="bathroom" size="sm" />
									{homestay.bathrooms} bathroom
								</span>
							</div>
						</div>

						<div className="divider" />

						{/* Host Info */}
						<div className="flex items-center gap-4">
							<Avatar
								src={homestay.host.avatar}
								alt={homestay.host.name}
								placeholder={homestay.host.name.charAt(0)}
								size="lg"
								shape="circle"
							/>
							<div>
								<div className="flex items-center gap-2">
									<h3 className="font-semibold">Hosted by {homestay.host.name}</h3>
									{homestay.host.isVerified && (
										<Badge variant="success" size="sm">
											<Icon name="verified" size="xs" />
											Verified
										</Badge>
									)}
								</div>
								<p className="text-sm text-base-content/60">
									Hosting since {homestay.host.memberSince}
								</p>
							</div>
						</div>

						{/* Highlights */}
						<div className="space-y-4">
							<div className="flex gap-4">
								<Icon name="emoji_events" size="md" className="text-primary mt-1" />
								<div>
									<p className="font-semibold">Superhost</p>
									<p className="text-sm text-base-content/60">
										{homestay.host.name} is a Superhost with {homestay.host.responseRate}% response rate.
									</p>
								</div>
							</div>
							<div className="flex gap-4">
								<Icon name="location_on" size="md" className="text-primary mt-1" />
								<div>
									<p className="font-semibold">Great location</p>
									<p className="text-sm text-base-content/60">
										100% of recent guests gave the location a 5-star rating.
									</p>
								</div>
							</div>
							<div className="flex gap-4">
								<Icon name="calendar_month" size="md" className="text-primary mt-1" />
								<div>
									<p className="font-semibold">Free cancellation for 48 hours</p>
									<p className="text-sm text-base-content/60">
										Get a full refund if you change your mind.
									</p>
								</div>
							</div>
						</div>

						<div className="divider" />

						{/* Exact homestay location */}
						{homestay.coordinates && (
							<div>
								<h2 className="font-heading font-semibold text-xl mb-4">Where you will stay</h2>
								<p className="text-sm text-base-content/60 mb-4">{homestay.address || homestay.location}</p>
								<MapView
									center={homestay.coordinates}
									locationName={homestay.location}
									markers={[{
										id: homestay.id,
										lat: homestay.coordinates.lat,
										lng: homestay.coordinates.lng,
										title: homestay.title,
									}]}
									height="360px"
								/>
							</div>
						)}

						{/* Description */}
						<div>
							<h2 className="font-heading font-semibold text-xl mb-4">About this place</h2>
							<p className="text-base-content/80 whitespace-pre-line">
								{homestay.description}
							</p>
						</div>

						<div className="divider" />

						{/* Amenities */}
						<div>
							<h2 className="font-heading font-semibold text-xl mb-4">What this place offers</h2>
							<div className="grid grid-cols-2 gap-4">
								{homestay.amenities.map((amenity) => (
									<div key={amenity.id} className="flex items-center gap-3">
										<Icon name={amenity.icon} size="md" className="text-base-content/60" />
										<span>{amenity.label}</span>
									</div>
								))}
							</div>
						</div>

						<div className="divider" />

						{/* House Rules */}
						{homestay.houseRules && homestay.houseRules.length > 0 && (
							<>
								<div>
									<h2 className="font-heading font-semibold text-xl mb-4">House rules</h2>
									<ul className="space-y-2">
										{homestay.houseRules.map((rule, index) => (
											<li key={index} className="flex items-start gap-2">
												<Icon name="check" size="sm" className="text-success mt-0.5" />
												<span>{rule}</span>
											</li>
										))}
									</ul>
								</div>
								<div className="divider" />
							</>
						)}

						{/* Reviews */}
						<div>
							<div className="flex items-center gap-2 mb-6">
								<Icon name="star" size="md" className="text-warning" />
								<h2 className="font-heading font-semibold text-xl">
									{homestay.rating} · {homestay.reviewCount} reviews
								</h2>
							</div>

							<div className="space-y-6">
								{homestay.reviews.map((review) => (
									<div key={review.id} className="border-b border-base-200 pb-6 last:border-0">
										<div className="flex items-center gap-3 mb-3">
											<Avatar
												src={review.avatar}
												alt={review.name}
												placeholder={review.name.charAt(0)}
												size="sm"
												shape="circle"
											/>
											<div>
												<p className="font-semibold text-sm">{review.name}</p>
												<p className="text-xs text-base-content/60">{review.date}</p>
											</div>
										</div>
										<Rating
											name={`review-${review.id}`}
											value={review.rating}
											size="xs"
											readOnly
											className="mb-2"
										/>
										<p className="text-base-content/80">{review.text}</p>
									</div>
								))}
							</div>

							{homestay.reviewCount > 3 && (
								<Button style="outline" className="mt-4">
									Show all {homestay.reviewCount} reviews
								</Button>
							)}
						</div>
					</div>

					{/* Right Column - Booking Widget */}
					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<div className="card bg-base-100 shadow-xl border border-base-200">
								<div className="card-body">
									{/* Price */}
									<div className="flex items-baseline gap-1 mb-4">
										<Price amount={homestay.pricePerNight} size="lg" />
										<span className="text-base-content/60">/ night</span>
									</div>

									{/* Date Inputs */}
									<div className="grid grid-cols-2 gap-2 mb-4">
										<div className="form-control">
											<label className="label py-1">
												<span className="label-text text-xs font-medium">CHECK-IN</span>
											</label>
											<input
												type="date"
												className="input input-bordered input-sm"
												onChange={(e) => setDates((d) => ({ ...d, checkIn: e.target.value ? new Date(e.target.value) : null }))}
											/>
										</div>
										<div className="form-control">
											<label className="label py-1">
												<span className="label-text text-xs font-medium">CHECKOUT</span>
											</label>
											<input
												type="date"
												className="input input-bordered input-sm"
												onChange={(e) => setDates((d) => ({ ...d, checkOut: e.target.value ? new Date(e.target.value) : null }))}
											/>
										</div>
									</div>

									{/* Guests */}
									<div className="form-control mb-4">
										<label className="label py-1">
											<span className="label-text text-xs font-medium">GUESTS</span>
										</label>
										<select
											className="select select-bordered select-sm"
											value={guests}
											onChange={(e) => setGuests(Number(e.target.value))}
										>
											{Array.from({ length: homestay.maxGuests }, (_, i) => i + 1).map((n) => (
												<option key={n} value={n}>
													{n} guest{n > 1 ? 's' : ''}
												</option>
											))}
										</select>
									</div>

									{/* Reserve Button */}
									<Button
										variant="primary"
										className="w-full"
										onClick={() => onBook?.(dates, guests)}
										disabled={!dates.checkIn || !dates.checkOut}
									>
										Reserve
									</Button>

									{nights > 0 && (
										<>
											<p className="text-center text-sm text-base-content/60 mt-2">
												You won&apos;t be charged yet
											</p>

											{/* Price Breakdown */}
											<div className="space-y-2 mt-4 pt-4 border-t border-base-200">
												<div className="flex justify-between text-sm">
													<span className="underline">
														<Price amount={homestay.pricePerNight} size="sm" /> x {nights} nights
													</span>
													<Price amount={subtotal} size="sm" />
												</div>
												<div className="flex justify-between text-sm">
													<span className="underline">Service fee</span>
													<Price amount={serviceFee} size="sm" />
												</div>
												<div className="flex justify-between font-semibold pt-2 border-t border-base-200">
													<span>Total</span>
													<Price amount={total} size="md" />
												</div>
											</div>
										</>
									)}
								</div>
							</div>

							{/* Contact Host */}
							<button
								onClick={onContactHost}
								className="btn btn-ghost w-full mt-4 gap-2"
							>
								<Icon name="chat" size="sm" />
								Contact Host
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Photo Gallery Modal */}
			{showAllPhotos && (
				<div className="fixed inset-0 bg-black z-50 overflow-y-auto">
					<div className="sticky top-0 bg-black p-4 flex items-center justify-between z-10">
						<Button
							style="ghost"
							className="text-white"
							onClick={() => setShowAllPhotos(false)}
						>
							<Icon name="close" size="md" />
							Close
						</Button>
						<span className="text-white">
							{selectedImageIndex + 1} / {homestay.images.length}
						</span>
					</div>
					<div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
						<img
							src={homestay.images[selectedImageIndex]}
							alt={`${homestay.title} ${selectedImageIndex + 1}`}
							className="max-w-full max-h-[80vh] object-contain"
						/>
					</div>
					<div className="flex gap-2 p-4 overflow-x-auto justify-center">
						{homestay.images.map((image, index) => (
							<button
								key={index}
								onClick={() => setSelectedImageIndex(index)}
								className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${
									index === selectedImageIndex ? 'border-white' : 'border-transparent opacity-50'
								}`}
							>
								<img src={image} alt="" className="w-full h-full object-cover" />
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
