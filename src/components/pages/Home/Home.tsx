import { useMemo } from 'react';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Rating } from '../../atoms/Rating';
import { Avatar } from '../../atoms/Avatar';
import { Hero } from '../../organisms/Hero';
import { ListingGrid } from '../../organisms/ListingGrid';
import { useApi } from '../../../hooks/useApi';
import { homestaysService } from '../../../services/homestays.service';
import type { HomeProps, Destination, Testimonial } from './HomeProps';
import type { ListingCardProps } from '../../molecules/ListingCard';
import type { Homestay } from '../../../types/api.types';

/**
 * Transform API homestay data to ListingCardProps format
 */
const transformHomestayToListingCard = (homestay: Homestay): Omit<ListingCardProps, 'isSaved' | 'onSave'> => ({
	id: homestay.id,
	type: 'homestay',
	title: homestay.title,
	image: homestay.images[0] || '',
	location: homestay.location,
	rating: homestay.rating,
	reviewCount: homestay.reviewCount,
	price: homestay.price,
	period: 'per night',
	badges: homestay.rating >= 4.8 ? [{ label: 'Superhost', variant: 'primary' as const }] : undefined,
});

// Fallback homestays data (used when API fails)
const fallbackHomestays: Omit<ListingCardProps, 'isSaved' | 'onSave'>[] = [
	{
		id: '1',
		type: 'homestay',
		title: 'Peaceful Cottage in Netarhat',
		image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop',
		location: 'Loktak Lake, Manipur',
		rating: 4.8,
		reviewCount: 24,
		price: 2500,
		period: 'per night',
		badges: [{ label: 'Superhost', variant: 'primary' }],
	},
	{
		id: '2',
		type: 'homestay',
		title: 'Floating Cottage at Loktak',
		image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=400&h=300&fit=crop',
		location: 'Moirang, Manipur',
		rating: 4.6,
		reviewCount: 18,
		price: 1800,
		period: 'per night',
	},
	{
		id: '3',
		type: 'homestay',
		title: 'Tribal Heritage Home',
		image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=300&fit=crop',
		location: 'Imphal, Manipur',
		rating: 4.9,
		reviewCount: 42,
		price: 3200,
		period: 'per night',
		badges: [{ label: 'New', variant: 'secondary' }],
	},
	{
		id: '4',
		type: 'homestay',
		title: 'Waterfall Retreat Cottage',
		image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop',
		location: 'Ukhrul, Manipur',
		rating: 4.7,
		reviewCount: 31,
		price: 2200,
		period: 'per night',
	},
];

// Default destinations
const defaultDestinations: Destination[] = [
	{
		id: '1',
		name: 'Loktak Lake',
		image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
		listingCount: 24,
	},
	{
		id: '2',
		name: 'Kangla Fort',
		image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
		listingCount: 18,
	},
	{
		id: '3',
		name: 'Imphal',
		image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
		listingCount: 45,
	},
	{
		id: '4',
		name: 'Shirui Hills',
		image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&h=300&fit=crop',
		listingCount: 12,
	},
	{
		id: '5',
		name: 'Andro',
		image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
		listingCount: 32,
	},
];

// Default testimonials
const defaultTestimonials: Testimonial[] = [
	{
		id: '1',
		name: 'Priya Sharma',
		avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
		text: 'Amazing experience staying at the tribal heritage home! The hosts were incredibly welcoming and the food was authentic and delicious.',
		rating: 5,
		location: 'Delhi',
	},
	{
		id: '2',
		name: 'Rahul Verma',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
		text: 'Our guide around Loktak Lake made the journey unforgettable. The floating islands and local stories were incredible.',
		rating: 5,
		location: 'Mumbai',
	},
	{
		id: '3',
		name: 'Anita Devi',
		avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
		text: 'Bought beautiful Dokra art pieces through the marketplace. Authentic tribal crafts delivered right to my doorstep!',
		rating: 4,
		location: 'Kolkata',
	},
];

// Categories data
const categories = [
	{
		id: 'homestays',
		title: 'Homestays',
		description: 'Stay with local families',
		icon: 'home',
		color: 'bg-primary/10 text-primary',
	},
	{
		id: 'guides',
		title: 'Local Guides',
		description: 'Expert tribal guides',
		icon: 'person_pin',
		color: 'bg-secondary/10 text-secondary',
	},
	{
		id: 'products',
		title: 'Handicrafts',
		description: 'Authentic tribal art',
		icon: 'palette',
		color: 'bg-accent/10 text-accent',
	},
	{
		id: 'experiences',
		title: 'Experiences',
		description: 'Cultural immersion',
		icon: 'celebration',
		color: 'bg-info/10 text-info',
	},
];

// How it works steps
const howItWorks = [
	{
		step: 1,
		title: 'Discover',
		description: 'Browse homestays, guides, and authentic Manipuri handicrafts from across the state',
		icon: 'explore',
	},
	{
		step: 2,
		title: 'Book',
		description: 'Reserve your stay, connect with guides, or purchase crafts securely online',
		icon: 'calendar_month',
	},
	{
		step: 3,
		title: 'Experience',
		description: 'Enjoy authentic tribal culture, nature, and hospitality during your stay',
		icon: 'favorite',
	},
];

/**
 * Home page component
 */
export const Home = ({
	featuredDestinations = defaultDestinations,
	testimonials = defaultTestimonials,
	onSearch,
	onCategoryClick,
	onDestinationClick,
	className = '',
}: HomeProps) => {
	// Fetch featured homestays from API
	const {
		data: homestaysResponse,
		loading: homestaysLoading,
		error: homestaysError
	} = useApi(
		() => homestaysService.getAll({ limit: 4, sortBy: 'rating', sortOrder: 'desc' }),
		[]
	);

	// Transform API data to ListingCardProps format, with fallback
	const featuredHomestays = useMemo(() => {
		if (homestaysError || !homestaysResponse?.data) {
			return fallbackHomestays;
		}
		return homestaysResponse.data.slice(0, 4).map(transformHomestayToListingCard);
	}, [homestaysResponse, homestaysError]);

	return (
		<div className={`min-h-screen ${className}`.trim()}>
			{/* Hero Section */}
			<Hero onSearch={onSearch} />

			{/* Categories Section */}
			<section className="py-12 md:py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<div className="text-center mb-8">
						<h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
							Explore Manipur
						</h2>
						<p className="text-base-content/60 max-w-2xl mx-auto">
							Discover vibrant culture, serene landscapes, and warm hospitality across Manipur
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => onCategoryClick?.(category.id)}
								className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
							>
								<div className="card-body items-center text-center p-4 md:p-6">
									<div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${category.color} flex items-center justify-center mb-2`}>
										<Icon name={category.icon} size="lg" />
									</div>
									<h3 className="font-semibold text-sm md:text-base">{category.title}</h3>
									<p className="text-xs md:text-sm text-base-content/60 hidden sm:block">
										{category.description}
									</p>
								</div>
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Featured Destinations */}
			<section className="py-12 md:py-16 bg-base-200">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
								Popular Destinations
							</h2>
							<p className="text-base-content/60">
								Explore the most visited places in Manipur
							</p>
						</div>
						<Button style="ghost" className="hidden md:flex">
							View All
							<Icon name="arrow_forward" size="sm" />
						</Button>
					</div>

					<div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
						{featuredDestinations.map((destination) => (
							<button
								key={destination.id}
								onClick={() => onDestinationClick?.(destination.id)}
								className="flex-shrink-0 w-48 md:w-64 snap-start"
							>
								<div className="card bg-base-100 shadow hover:shadow-lg transition-shadow overflow-hidden">
									<figure className="aspect-[4/3]">
										<img
											src={destination.image}
											alt={destination.name}
											className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
										/>
									</figure>
									<div className="card-body p-3 md:p-4">
										<h3 className="font-semibold text-sm md:text-base">{destination.name}</h3>
										<p className="text-xs md:text-sm text-base-content/60">
											{destination.listingCount} listings
										</p>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-12 md:py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<div className="text-center mb-10">
						<h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
							How It Works
						</h2>
						<p className="text-base-content/60 max-w-2xl mx-auto">
							Your journey to authentic Manipur experiences in three simple steps
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{howItWorks.map((item, index) => (
							<div key={item.step} className="text-center relative">
								{/* Connector line (hidden on mobile) */}
								{index < howItWorks.length - 1 && (
									<div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-base-300" />
								)}

								<div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-content mb-4">
									<Icon name={item.icon} size="lg" />
								</div>
								<h3 className="font-heading font-semibold text-lg mb-2">
									{item.step}. {item.title}
								</h3>
								<p className="text-base-content/60 max-w-xs mx-auto">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Homestays */}
			<section className="py-12 md:py-16 bg-base-200">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
								Featured Homestays
							</h2>
							<p className="text-base-content/60">
								Hand-picked stays for an authentic experience
							</p>
						</div>
						<Button style="ghost" className="hidden md:flex">
							View All
							<Icon name="arrow_forward" size="sm" />
						</Button>
					</div>

					<ListingGrid
						listings={featuredHomestays}
						columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
						loading={homestaysLoading}
						skeletonCount={4}
					/>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-12 md:py-16 bg-base-100">
				<div className="container mx-auto px-4">
					<div className="text-center mb-10">
						<h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
							What Travelers Say
						</h2>
						<p className="text-base-content/60 max-w-2xl mx-auto">
							Real experiences from our community of travelers
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{testimonials.map((testimonial) => (
							<div key={testimonial.id} className="card bg-base-200">
								<div className="card-body">
									<Rating
										name={`testimonial-${testimonial.id}`}
										value={testimonial.rating}
										size="sm"
										readOnly
									/>
									<p className="text-base-content/80 my-4">
										&ldquo;{testimonial.text}&rdquo;
									</p>
									<div className="flex items-center gap-3 mt-auto">
										<Avatar
											src={testimonial.avatar}
											alt={testimonial.name}
											placeholder={testimonial.name.charAt(0)}
											size="sm"
											shape="circle"
										/>
										<div>
											<p className="font-semibold text-sm">{testimonial.name}</p>
											{testimonial.location && (
												<p className="text-xs text-base-content/60">
													{testimonial.location}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 md:py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-content">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
						{/* Become a Host */}
						<div className="text-center md:text-left">
							<Icon name="home" size="lg" className="mb-4" />
							<h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
								Become a Host
							</h3>
							<p className="opacity-90 mb-6 max-w-md">
								Share your home and culture with travelers from around the world. Earn extra income while preserving tribal heritage.
							</p>
							<Button variant="secondary" size="lg">
								Start Hosting
								<Icon name="arrow_forward" size="sm" />
							</Button>
						</div>

						{/* Sell Your Crafts */}
						<div className="text-center md:text-left md:border-l md:border-primary-content/20 md:pl-8">
							<Icon name="palette" size="lg" className="mb-4" />
							<h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
								Sell Your Crafts
							</h3>
							<p className="opacity-90 mb-6 max-w-md">
								Artisans, reach customers across India and beyond. List your authentic tribal handicrafts on our marketplace.
							</p>
							<Button variant="secondary" size="lg">
								Start Selling
								<Icon name="arrow_forward" size="sm" />
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
