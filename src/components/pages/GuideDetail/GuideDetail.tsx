import { useParams, Link } from 'react-router';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Rating } from '../../atoms/Rating';
import { Avatar } from '../../atoms/Avatar';
import { ReviewCard } from '../../molecules/ReviewCard';
import { NotImplementedLink } from '../../molecules/NotImplementedLink';
import type { GuideDetailProps } from './GuideDetailProps';

// Mock guide data - in a real app, this would come from an API
const mockGuide = {
	id: '1',
	name: 'Ravi Kumar',
	photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
	title: 'Wildlife Expert & Naturalist',
	location: 'Loktak Lake, Manipur',
	languages: ['Manipuri', 'Hindi', 'English'],
	experience: '12 years',
	rating: 4.9,
	reviewCount: 67,
	pricePerDay: 1500,
	about: `I am a certified nature guide with over 12 years of experience around Loktak Lake. Growing up in Manipur, I developed a deep connection with its lakes, hills, and wildlife from an early age.

My expertise includes wildlife tracking, bird watching, and sharing knowledge about the local tribal culture and traditions. I have guided thousands of tourists through the pristine forests of Palamu Tiger Reserve, helping them spot tigers, elephants, leopards, and over 200 species of birds.

I believe in sustainable tourism that benefits both visitors and local communities. Every tour I conduct includes local stories, traditional food, and an authentic glimpse into Manipur's rich cultural heritage.`,
	specializations: [
		{ icon: 'pets', label: 'Wildlife Tracking' },
		{ icon: 'forest', label: 'Nature Walks' },
		{ icon: 'photo_camera', label: 'Wildlife Photography' },
		{ icon: 'groups', label: 'Cultural Tours' },
		{ icon: 'hiking', label: 'Trekking' },
	],
	tours: [
		{
			id: '1',
			title: 'Loktak Lake Nature Tour',
			duration: '1 day',
			price: 1500,
			description: 'Full day exploration of Loktak Lake with bird watching and local landscape walks.',
		},
		{
			id: '2',
			title: 'Tribal Village Experience',
			duration: '2 days',
			price: 3500,
			description: 'Immersive experience with local tribal communities, traditional food, and cultural activities.',
		},
		{
			id: '3',
			title: 'Photography Expedition',
			duration: '3 days',
			price: 6000,
			description: 'Dedicated wildlife photography tour with best spots and timing for capturing wildlife.',
		},
	],
	reviews: [
		{
			id: '1',
			author: 'Amit Sharma',
			avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
			rating: 5,
			date: 'December 2024',
			content: 'Ravi is an exceptional guide! His knowledge of wildlife and the forest is incredible. We spotted a tiger on our first safari, and he knew exactly where to look.',
		},
		{
			id: '2',
			author: 'Priya Patel',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
			rating: 5,
			date: 'November 2024',
			content: 'The tribal village tour was a life-changing experience. Ravi made us feel welcome everywhere we went. Highly recommend!',
		},
		{
			id: '3',
			author: 'John Miller',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
			rating: 4,
			date: 'October 2024',
			content: 'Great photography expedition. Ravi knows all the best spots and the right times to catch wildlife in action.',
		},
	],
};

/**
 * GuideDetail page component for displaying local guide profiles
 */
export const GuideDetail = ({
	guideId: externalGuideId,
	loading = false,
	onBook,
	className = '',
}: GuideDetailProps) => {
	const { guideId: urlGuideId } = useParams<{ guideId: string }>();
	const guideId = externalGuideId || urlGuideId;

	// In a real app, fetch guide data based on guideId
	const guide = mockGuide;

	if (loading) {
		return (
			<div className="min-h-screen bg-base-200 flex items-center justify-center">
				<span className="loading loading-spinner loading-lg text-primary" />
			</div>
		);
	}

	return (
		<div className={`min-h-screen bg-base-200 ${className}`.trim()}>
			{/* Header Section */}
			<div className="bg-base-100 border-b border-base-200">
				<div className="container mx-auto px-4 py-8">
					{/* Breadcrumb */}
					<div className="breadcrumbs text-sm mb-6">
						<ul>
							<li><Link to="/">Home</Link></li>
							<li><NotImplementedLink feature="Guides">Guides</NotImplementedLink></li>
							<li>{guide.name}</li>
						</ul>
					</div>

					<div className="flex flex-col md:flex-row gap-8">
						{/* Guide Photo */}
						<div className="flex-shrink-0">
							<Avatar
								src={guide.photo}
								alt={guide.name}
								size="xl"
								className="w-32 h-32 md:w-48 md:h-48"
							/>
						</div>

						{/* Guide Info */}
						<div className="flex-1">
							<div className="flex flex-wrap items-start gap-3 mb-2">
								<h1 className="font-heading text-2xl md:text-3xl font-bold">
									{guide.name}
								</h1>
								<Badge variant="primary">Top Guide</Badge>
							</div>

							<p className="text-lg text-base-content/70 mb-3">{guide.title}</p>

							<div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60 mb-4">
								<span className="flex items-center gap-1">
									<Icon name="location_on" size="sm" />
									{guide.location}
								</span>
								<span className="flex items-center gap-1">
									<Icon name="schedule" size="sm" />
									{guide.experience} experience
								</span>
							</div>

							<div className="flex items-center gap-2 mb-4">
								<Rating name="guide-rating" value={guide.rating} readOnly size="sm" />
								<span className="font-semibold">{guide.rating}</span>
								<span className="text-base-content/60">({guide.reviewCount} reviews)</span>
							</div>

							<div className="flex flex-wrap gap-2 mb-6">
								{guide.languages.map((lang) => (
									<Badge key={lang} style="soft" size="sm">
										{lang}
									</Badge>
								))}
							</div>

							<div className="flex flex-wrap items-center gap-4">
								<div>
									<span className="text-2xl font-bold text-primary">₹{guide.pricePerDay.toLocaleString()}</span>
									<span className="text-base-content/60"> / day</span>
								</div>
								<Button
									variant="primary"
									onClick={() => onBook?.(guideId || '')}
								>
									<Icon name="calendar_today" size="sm" />
									Book Now
								</Button>
								<Button style="outline">
									<Icon name="chat" size="sm" />
									Contact
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - About & Tours */}
					<div className="lg:col-span-2 space-y-8">
						{/* About Section */}
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h2 className="card-title font-heading">
									<Icon name="person" className="text-primary" />
									About Me
								</h2>
								<div className="prose max-w-none">
									{guide.about.split('\n\n').map((paragraph, index) => (
										<p key={index}>{paragraph}</p>
									))}
								</div>
							</div>
						</div>

						{/* Specializations */}
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h2 className="card-title font-heading">
									<Icon name="star" className="text-primary" />
									Specializations
								</h2>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
									{guide.specializations.map((spec) => (
										<div
											key={spec.label}
											className="flex items-center gap-3 p-3 rounded-lg bg-base-200"
										>
											<Icon name={spec.icon} className="text-primary" />
											<span className="font-medium">{spec.label}</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Tour Packages */}
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h2 className="card-title font-heading">
									<Icon name="tour" className="text-primary" />
									Tour Packages
								</h2>
								<div className="space-y-4 mt-4">
									{guide.tours.map((tour) => (
										<div
											key={tour.id}
											className="border border-base-200 rounded-lg p-4 hover:border-primary transition-colors"
										>
											<div className="flex flex-wrap items-start justify-between gap-4">
												<div>
													<h3 className="font-semibold text-lg">{tour.title}</h3>
													<p className="text-base-content/60 mt-1">{tour.description}</p>
													<div className="flex items-center gap-3 mt-2 text-sm text-base-content/60">
														<span className="flex items-center gap-1">
															<Icon name="schedule" size="sm" />
															{tour.duration}
														</span>
													</div>
												</div>
												<div className="text-right">
													<div className="text-xl font-bold text-primary">
														₹{tour.price.toLocaleString()}
													</div>
													<Button size="sm" variant="primary" className="mt-2">
														Book
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Reviews */}
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<div className="flex items-center justify-between mb-4">
									<h2 className="card-title font-heading">
										<Icon name="reviews" className="text-primary" />
										Reviews
									</h2>
									<Link to="#" className="link link-primary text-sm">
										See all {guide.reviewCount} reviews
									</Link>
								</div>
								<div className="space-y-4">
									{guide.reviews.map((review) => (
										<ReviewCard
											key={review.id}
											author={review.author}
											avatarSrc={review.avatar}
											rating={review.rating}
											date={review.date}
											content={review.content}
										/>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Booking Card */}
					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<div className="card bg-base-100 shadow-lg">
								<div className="card-body">
									<h3 className="card-title font-heading">Book This Guide</h3>

									<div className="divider my-2" />

									<div className="form-control">
										<label className="label">
											<span className="label-text font-medium">Select Date</span>
										</label>
										<input
											type="date"
											className="input input-bordered w-full"
											min={new Date().toISOString().split('T')[0]}
										/>
									</div>

									<div className="form-control mt-4">
										<label className="label">
											<span className="label-text font-medium">Number of Days</span>
										</label>
										<select className="select select-bordered w-full">
											<option>1 day</option>
											<option>2 days</option>
											<option>3 days</option>
											<option>4 days</option>
											<option>5+ days</option>
										</select>
									</div>

									<div className="form-control mt-4">
										<label className="label">
											<span className="label-text font-medium">Group Size</span>
										</label>
										<select className="select select-bordered w-full">
											<option>1-2 people</option>
											<option>3-5 people</option>
											<option>6-10 people</option>
											<option>10+ people</option>
										</select>
									</div>

									<div className="divider my-4" />

									<div className="flex justify-between items-center mb-4">
										<span>₹{guide.pricePerDay.toLocaleString()} × 1 day</span>
										<span className="font-semibold">₹{guide.pricePerDay.toLocaleString()}</span>
									</div>

									<Button
										variant="primary"
										className="w-full"
										onClick={() => onBook?.(guideId || '')}
									>
										Request Booking
									</Button>

									<p className="text-xs text-center text-base-content/60 mt-3">
										You won't be charged yet
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
