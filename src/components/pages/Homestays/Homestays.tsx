import { useState } from 'react';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { ListingGrid } from '../../organisms/ListingGrid';
import { MapView } from '../../organisms/MapView';
import { SearchFilters, defaultFilterState } from '../../organisms/SearchFilters';
import type { FilterState } from '../../organisms/SearchFilters';
import type { HomestaysProps } from './HomestaysProps';
import { useApi } from '../../../hooks/useApi';
import { homestaysService } from "../../../services/homestays.service.ts";
import type { Homestay } from "../../../types/api.types.ts";
import type { ListingCardProps } from '../../molecules/ListingCard';
import homestaysMock from '../../../mocks/homestays.json';

/** Transform Homestay to ListingGrid format */
const transformHomestay = (homestay: Homestay): Omit<ListingCardProps, 'isSaved' | 'onSave'> => ({
	id: homestay.id,
	type: 'homestay' as const,
	title: homestay.title,
	image: homestay.images[0] || '',
	location: `${homestay.location}, ${homestay.district}`,
	rating: homestay.rating,
	reviewCount: homestay.reviewCount,
	price: homestay.price,
	period: 'per night',
});

const fallbackHomestays: Omit<ListingCardProps, 'isSaved' | 'onSave'>[] = [
	{
		id: 'loktak-lakeside', type: 'homestay', title: 'Loktak Lakeside Homestay',
		image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
		location: 'Moirang, Bishnupur', rating: 4.6, reviewCount: 42, price: 1800, period: 'per night',
	},
	{
		id: 'imphal-local-home', type: 'homestay', title: 'Imphal Local Family Home',
		image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
		location: 'Imphal, Imphal West', rating: 4.8, reviewCount: 35, price: 2200, period: 'per night',
	},
	{
		id: 'ukhrul-hill-stay', type: 'homestay', title: 'Shirui Hills View Homestay',
		image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
		location: 'Ukhrul, Ukhrul', rating: 4.7, reviewCount: 28, price: 2000, period: 'per night',
	},
];

const mockHomestays = (homestaysMock.data as Homestay[]).map(transformHomestay);

const localHomestayGuides = [
	{
		title: 'Floating Homestay on Loktak Lake',
		location: 'Moirang, Manipur',
		description: 'Read about staying on a phumdi, travelling by boat, and experiencing life around the Jewel of Manipur.',
		image: 'https://i0.wp.com/buoyantlifestyles.com/wp-content/uploads/2025/05/IMG_6469-scaled-e1748024394225.jpeg?resize=960%2C1002&ssl=1',
		url: 'https://buoyantlifestyles.com/exploring-loktak-lake-in-manipur-from-a-floating-homestay',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=Maipakchao+Homestay+Moirang+Manipur',
	},
	{
		title: 'Manipur Homestay Directory',
		location: 'Across Manipur',
		description: 'Browse an external collection of homestay options and direct booking information for a Manipur trip.',
		image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
		url: 'https://bookmyhomestay.com/page/manipur',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=homestays+in+Manipur',
	},
	{
		title: 'Iranyai Homestay',
		location: 'Babupara, Imphal West',
		description: 'A welcoming Imphal stay with modern amenities, private rooms, WiFi, and easy access to the city.',
		image: 'https://wanderon-images.gumlet.io/blogs/new/2024/06/iranyai-homestay.jpg?auto=compress%2Cformat&w=800',
		url: 'https://wanderon.in/blogs/homestays-in-imphal',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=Iranyai+Homestay+Imphal+Manipur',
	},
	{
		title: "John's Home Stay",
		location: 'Chingmeirong, Imphal',
		description: 'A peaceful family homestay with a garden, private entrance, WiFi, and convenient access to Imphal attractions.',
		image: 'https://wanderon-images.gumlet.io/blogs/new/2024/06/johns-home-home-stay-1.jpg?auto=compress%2Cformat&w=800',
		url: 'https://wanderon.in/blogs/homestays-in-imphal',
		mapUrl: "https://www.google.com/maps/search/?api=1&query=John's+Home+Stay+Imphal+Manipur",
	},
	{
		title: 'Aheibam HomeStay',
		location: 'Iroishemba, Imphal',
		description: 'A serene local stay with a garden, shared lounge, breakfast, and bicycle-friendly surroundings.',
		image: 'https://wanderon-images.gumlet.io/blogs/new/2024/06/aheibam-homestay.jpg?auto=compress%2Cformat&w=800',
		url: 'https://wanderon.in/blogs/homestays-in-imphal',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=Aheibam+HomeStay+Imphal+Manipur',
	},
	{
		title: 'Hearth of Imphal',
		location: 'Chingmeirong, Imphal',
		description: 'A heritage-style stay with a peaceful garden, breakfast, WiFi, and mountain-view rooms.',
		image: 'https://wanderon-images.gumlet.io/blogs/new/2024/06/hearth-of-imphal.jpg?auto=compress%2Cformat&w=800',
		url: 'https://wanderon.in/blogs/homestays-in-imphal',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hearth+of+Imphal+Manipur',
	},
	{
		title: 'Yum & Hill Cottage',
		location: 'Luwangsangbam, Imphal East',
		description: 'A quiet cottage surrounded by greenery with WiFi, breakfast, parking, and a relaxed local atmosphere.',
		image: 'https://wanderon-images.gumlet.io/blogs/new/2024/06/yum-hill-cottage.jpg?auto=compress%2Cformat&w=800',
		url: 'https://wanderon.in/blogs/homestays-in-imphal',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=Yum+Hill+Cottage+Imphal+Manipur',
	},
	{
		title: 'Homestays of India: Manipur',
		location: 'Manipur',
		description: 'Browse Manipur stays including the Keibul Homestay near Loktak Lake from a dedicated homestay directory.',
		image: 'https://www.homestaysofindia.com/wp-content/uploads/2020/03/Aerial-View-Keibul-Homestay-Loktak.jpeg',
		url: 'https://www.homestaysofindia.com/manipur/',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=homestays+in+Manipur',
	},
	{
		title: 'Homestays in Thangmeiband',
		location: 'Thangmeiband, Imphal',
		description: 'Explore accommodation options around Thangmeiband in Imphal through MakeMyTrip.',
		image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
		url: 'https://www.makemytrip.global/hotels/area-homestays-in-thangmeiband-imphal.html',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=homestays+in+Thangmeiband+Imphal',
	},
	{
		title: 'Top Homestays in Imphal 2026',
		location: 'Imphal, Manipur',
		description: 'Compare traveller-focused Imphal stays such as Hearth of Imphal, Iranyai Homestay, and Eco Heritage Villas.',
		image: 'https://img.traveltriangle.com/blog/wp-content/uploads/2024/09/Homestays-in-Imphal-1.jpg?w=800&h=600&fit=crop',
		url: 'https://traveltriangle.com/blog/homestays-in-imphal/',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=homestays+in+Imphal+Manipur',
	},
];

const getGoogleMapsSearchUrl = (district: string) => {
	const searchArea = district && district !== 'All Districts' ? `${district}, Manipur` : 'Manipur';
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`homestays in ${searchArea}`)}`;
};

/**
 * Homestays page component for browsing homestay listings
 */
export const Homestays = ({
	homestays: externalHomestays,
	totalCount: externalTotalCount,
	loading: externalLoading = false,
	filters: externalFilters,
	onFilterChange,
	onApplyFilters,
	onClearFilters,
	savedIds = [],
	onSave,
	page = 1,
	totalPages = 8,
	onPageChange,
	className = '',
}: HomestaysProps) => {
	// Fetch homestays from API (uses VITE_API_BASE_URL from .env)
	const { data: apiData } = useApi(
		() => homestaysService.getAll(),
		[]
	);

	// Transform API data to ListingCard format
	const apiListings = apiData?.data?.map(transformHomestay) || [];
	const externalListings = externalHomestays?.map(transformHomestay) || [];

	// Use external data if provided, otherwise use API data
	const listings = externalListings.length > 0
		? externalListings
		: apiListings.length > 0
			? apiListings
			: mockHomestays.length > 0 ? mockHomestays : fallbackHomestays;

	const loading = externalLoading;
	const totalCount = externalTotalCount ?? apiData?.meta?.total ?? mockHomestays.length;
	const mapSource = apiData?.data?.length ? apiData.data : homestaysMock.data as Homestay[];
	const homestayMarkers = mapSource.flatMap((homestay) => homestay.coordinates ? [{
		id: homestay.id,
		lat: homestay.coordinates.lat,
		lng: homestay.coordinates.lng,
		title: homestay.title,
		price: homestay.price,
	}] : []) || [
		{ id: 'loktak-lakeside', lat: 24.552, lng: 93.786, title: 'Loktak Lakeside Homestay', price: 1800 },
		{ id: 'imphal-local-home', lat: 24.817, lng: 93.936, title: 'Imphal Local Family Home', price: 2200 },
		{ id: 'ukhrul-hill-stay', lat: 25.095, lng: 94.36, title: 'Shirui Hills View Homestay', price: 2000 },
	];

	// Internal filter state (used if no external control)
	const [internalFilters, setInternalFilters] = useState<FilterState>({
		...defaultFilterState,
		listingType: 'homestay',
	});
	const [showMobileFilters, setShowMobileFilters] = useState(false);
	const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');

	// Use external or internal filters
	const filters = externalFilters || internalFilters;
	const selectedDistrict = filters.district;
	const handleFilterChange = onFilterChange || setInternalFilters;
	const handleClearFilters = onClearFilters || (() => setInternalFilters({
		...defaultFilterState,
		listingType: 'homestay',
	}));

	return (
		<div className={`min-h-screen bg-base-200 ${className}`.trim()}>
			{/* Page Header */}
			<div className="bg-base-100 border-b border-base-200">
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="font-heading text-2xl md:text-3xl font-bold">
								Homestays in Manipur
							</h1>
							<p className="text-base-content/60 mt-1">
									{loading ? 'Loading...' : `${totalCount} authentic Manipuri homestays`}
							</p>
						</div>
						<Button
							as="a"
							href={getGoogleMapsSearchUrl(selectedDistrict)}
							target="_blank"
							rel="noreferrer"
							style="outline"
							size="sm"
							className="w-fit"
						>
							<Icon name="location_on" size="sm" />
							{selectedDistrict && selectedDistrict !== 'All Districts'
								? `Find stays in ${selectedDistrict}`
								: 'Search Manipur homestays'}
						</Button>

						{/* Sort & Filter Controls */}
						<div className="flex items-center gap-3">
							{/* Sort Dropdown */}
							<div className="dropdown dropdown-end">
								<label tabIndex={0} className="btn btn-ghost btn-sm gap-2">
									<Icon name="sort" size="sm" />
									Sort
								</label>
								<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52">
									{[
										{ value: 'recommended', label: 'Recommended' },
										{ value: 'price-low', label: 'Price: Low to High' },
										{ value: 'price-high', label: 'Price: High to Low' },
										{ value: 'rating', label: 'Top Rated' },
									].map((option) => (
										<li key={option.value}>
											<button
												onClick={() => setSortBy(option.value as typeof sortBy)}
												className={sortBy === option.value ? 'active' : ''}
											>
												{option.label}
											</button>
										</li>
									))}
								</ul>
							</div>

							{/* Mobile Filter Button */}
							<Button
								style="outline"
								size="sm"
								className="lg:hidden"
								onClick={() => setShowMobileFilters(true)}
							>
								<Icon name="filter_list" size="sm" />
								Filters
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-6">
				<div className="flex gap-6">
					{/* Desktop Filters Sidebar */}
					<aside className="hidden lg:block w-72 flex-shrink-0">
						<div className="sticky top-20">
							<SearchFilters
								filters={filters}
								onChange={handleFilterChange}
								onClear={handleClearFilters}
								listingType="homestay"
								showListingTypeSelector={false}
							/>
						</div>
					</aside>

					{/* Listings Grid */}
					<div className="flex-1">
						<ListingGrid
							listings={listings}
							loading={loading}
							skeletonCount={6}
							savedIds={savedIds}
							onSave={onSave}
							columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
							emptyTitle="No homestays found"
							emptyMessage="Try adjusting your filters to find more results."
						/>

						<section className="mt-12" aria-labelledby="homestay-map-title">
							<h2 id="homestay-map-title" className="font-heading text-2xl md:text-3xl font-bold mb-2">
								Homestay locations in Manipur
							</h2>
							<p className="text-base-content/60 mb-5">
								See stays around Imphal West, Loktak Lake in Bishnupur, and Ukhrul.
							</p>
							<MapView
								center={{ lat: 24.817, lng: 93.936 }}
								markers={homestayMarkers}
								locationName="Manipur homestays"
								height="380px"
							/>
						</section>

						{/* Pagination */}
						{!loading && listings.length > 0 && totalPages > 1 && (
							<div className="mt-8 flex justify-center">
								<div className="join">
									<button
										className="join-item btn btn-sm"
										disabled={page <= 1}
										onClick={() => onPageChange?.(page - 1)}
									>
										<Icon name="chevron_left" size="sm" />
									</button>

									{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
										let pageNum: number;
										if (totalPages <= 5) {
											pageNum = i + 1;
										} else if (page <= 3) {
											pageNum = i + 1;
										} else if (page >= totalPages - 2) {
											pageNum = totalPages - 4 + i;
										} else {
											pageNum = page - 2 + i;
										}

										return (
											<button
												key={pageNum}
												className={`join-item btn btn-sm ${page === pageNum ? 'btn-active' : ''}`}
												onClick={() => onPageChange?.(pageNum)}
											>
												{pageNum}
											</button>
										);
									})}

									<button
										className="join-item btn btn-sm"
										disabled={page >= totalPages}
										onClick={() => onPageChange?.(page + 1)}
									>
										<Icon name="chevron_right" size="sm" />
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				<section className="mt-12" aria-labelledby="local-homestay-guides-title">
					<div className="mb-6">
						<h2 id="local-homestay-guides-title" className="font-heading text-2xl md:text-3xl font-bold">
							Local homestay guides
						</h2>
						<p className="text-base-content/60 mt-1 max-w-2xl">
							Explore local stays and booking ideas from trusted travel and homestay resources.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{localHomestayGuides.map((guide) => (
							<article key={guide.url} className="card bg-base-100 shadow-sm overflow-hidden">
								<figure className="aspect-[16/10]">
									<img src={guide.image} alt={guide.title} loading="lazy" className="w-full h-full object-cover" />
								</figure>
								<div className="card-body p-5">
									<p className="text-sm text-primary font-medium">{guide.location}</p>
									<h3 className="card-title text-lg">{guide.title}</h3>
									<p className="text-sm text-base-content/70">{guide.description}</p>
									<div className="flex flex-wrap gap-2 mt-2">
										<Button as="a" href={guide.url} target="_blank" rel="noreferrer" style="outline" size="sm">
											<Icon name="open_in_new" size="sm" />
											View guide
										</Button>
										<Button as="a" href={guide.mapUrl} target="_blank" rel="noreferrer" style="ghost" size="sm">
											<Icon name="map" size="sm" />
											Google Maps
										</Button>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>
			</div>

			{/* Mobile Filter Drawer */}
			{showMobileFilters && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black/50 z-40 lg:hidden"
						onClick={() => setShowMobileFilters(false)}
					/>

					{/* Drawer */}
					<div className="fixed inset-y-0 right-0 w-full max-w-sm bg-base-100 z-50 lg:hidden shadow-xl">
						{/* Drawer Header */}
						<div className="flex items-center justify-between p-4 border-b border-base-200">
							<h3 className="font-semibold text-lg">Filters</h3>
							<Button
								style="ghost"
								size="sm"
								className="btn-circle"
								onClick={() => setShowMobileFilters(false)}
							>
								<Icon name="close" size="md" />
							</Button>
						</div>

						{/* Filters */}
						<SearchFilters
							filters={filters}
							onChange={handleFilterChange}
							onClear={handleClearFilters}
							onApply={() => {
								onApplyFilters?.();
								setShowMobileFilters(false);
							}}
							listingType="homestay"
							showListingTypeSelector={false}
							isMobileDrawer
						/>
					</div>
				</>
			)}
		</div>
	);
};
