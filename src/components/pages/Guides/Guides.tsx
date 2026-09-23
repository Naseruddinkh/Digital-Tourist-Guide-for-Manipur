import { useApi } from '../../../hooks/useApi';
import { guidesService } from '../../../services/guides.service';
import { ListingGrid } from '../../organisms/ListingGrid';
import { MapView } from '../../organisms/MapView';
import type { ListingCardProps } from '../../molecules/ListingCard';
import type { Guide } from '../../../types/api.types';

const transformGuide = (guide: Guide): Omit<ListingCardProps, 'isSaved' | 'onSave'> => ({
	id: guide.id,
	type: 'guide',
	title: guide.name,
	image: guide.avatar || '',
	location: `${guide.location}, ${guide.district}`,
	rating: guide.rating,
	reviewCount: guide.reviewCount,
	price: guide.pricePerDay,
	period: 'per day',
	badges: guide.verified ? [{ label: 'Verified', variant: 'success' as const }] : undefined,
});

const fallbackGuides: Omit<ListingCardProps, 'isSaved' | 'onSave'>[] = [
	{
		id: 'guide-imphal',
		type: 'guide',
		title: 'Manipur Culture & Nature Guide',
		image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f8d?w=600&h=600&fit=crop',
		location: 'Imphal, Imphal West',
		rating: 4.9,
		reviewCount: 61,
		price: 1800,
		period: 'per day',
		badges: [{ label: 'Verified', variant: 'success' }],
	},
	{
		id: 'guide-loktak',
		type: 'guide',
		title: 'Loktak Lake & Moirang Guide',
		image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&h=600&fit=crop',
		location: 'Moirang, Bishnupur',
		rating: 4.8,
		reviewCount: 38,
		price: 1600,
		period: 'per day',
		badges: [{ label: 'Verified', variant: 'success' }],
	},
];

export const Guides = () => {
	const { data, loading } = useApi(() => guidesService.getAll({ limit: 20 }), []);
	const guideData = data?.data || [];
	const guides = guideData.length > 0 ? guideData.map(transformGuide) : fallbackGuides;
	const guideMarkers = guideData.length > 0 ? guideData.flatMap((guide) => guide.coordinates ? [{
		id: guide.id,
		lat: guide.coordinates.lat,
		lng: guide.coordinates.lng,
		title: guide.name,
		description: `${guide.location}, ${guide.district}`,
	}] : []) : [
		{ id: 'guide-imphal', lat: 24.817, lng: 93.936, title: 'Manipur Culture & Nature Guide', description: 'Imphal, Imphal West' },
		{ id: 'guide-loktak', lat: 24.552, lng: 93.786, title: 'Loktak Lake & Moirang Guide', description: 'Moirang, Bishnupur' },
	];

	return (
		<main className="min-h-screen bg-base-200 py-10 md:py-16">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-wide text-primary">One Manipur Tourism</p>
					<h1 className="font-heading text-3xl md:text-4xl font-bold mt-2">Local Guides in Manipur</h1>
					<p className="text-base-content/70 mt-2 max-w-2xl">
						Meet verified local guides for culture walks, nature trails, food tours, and Loktak Lake experiences.
					</p>
				</div>

				<ListingGrid
					listings={guides}
					loading={loading}
					skeletonCount={4}
					columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
					emptyTitle="No guides found"
					emptyMessage="New local guides will appear here soon."
				/>

				<section className="mt-12" aria-labelledby="guide-map-title">
					<div className="mb-5">
						<h2 id="guide-map-title" className="font-heading text-2xl md:text-3xl font-bold">
							Find guides by location
						</h2>
						<p className="text-base-content/60 mt-1">
							Explore guide locations around Imphal and Loktak Lake.
						</p>
					</div>
					<MapView
						center={{ lat: 24.817, lng: 93.936 }}
						markers={guideMarkers}
						locationName="Manipur local guides"
						height="380px"
					/>
				</section>
			</div>
		</main>
	);
};
