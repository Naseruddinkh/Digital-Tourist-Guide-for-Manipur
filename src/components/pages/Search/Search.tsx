import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { ListingGrid } from '../../organisms/ListingGrid';
import { SearchFilters, defaultFilterState } from '../../organisms/SearchFilters';
import { NotImplementedLink } from '../../molecules/NotImplementedLink';
import type { FilterState } from '../../organisms/SearchFilters';
import type { SearchProps } from './SearchProps';
import type { ListingCardProps } from '../../molecules/ListingCard';

// Mock search results - in a real app, this would come from an API
const mockResults: Omit<ListingCardProps, 'isSaved' | 'onSave'>[] = [
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
		type: 'guide',
		title: 'Ravi Kumar - Wildlife Expert',
		image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
		location: 'Kangla Fort',
		rating: 4.9,
		reviewCount: 67,
		price: 1500,
		period: 'per day',
		badges: [{ label: 'Top Guide', variant: 'primary' }],
	},
	{
		id: '5',
		type: 'product',
		title: 'Handwoven Tribal Basket',
		image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',
		location: 'Made in Manipur',
		rating: 4.7,
		reviewCount: 23,
		price: 850,
	},
];

/**
 * Search page component for searching homestays, guides, and products
 */
export const Search = ({
	initialQuery = '',
	results: externalResults,
	totalCount = 0,
	loading: externalLoading = false,
	savedIds = [],
	onSave,
	onSearch,
	className = '',
}: SearchProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const queryParam = searchParams.get('q') || initialQuery;

	const [searchQuery, setSearchQuery] = useState(queryParam);
	const [filters, setFilters] = useState<FilterState>(defaultFilterState);
	const [showMobileFilters, setShowMobileFilters] = useState(false);
	const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');
	const [loading] = useState(false);

	// Use external results if provided, otherwise use mock data filtered by query
	const results = externalResults || (queryParam
		? mockResults.filter(r =>
			r.title.toLowerCase().includes(queryParam.toLowerCase()) ||
			(r.location && r.location.toLowerCase().includes(queryParam.toLowerCase()))
		)
		: mockResults
	);

	const displayCount = totalCount || results.length;

	// Update search query when URL param changes
	useEffect(() => {
		setSearchQuery(queryParam);
	}, [queryParam]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			setSearchParams({ q: searchQuery.trim() });
			onSearch?.(searchQuery.trim());
		}
	};

	const handleClearFilters = () => {
		setFilters(defaultFilterState);
	};

	return (
		<div className={`min-h-screen bg-base-200 ${className}`.trim()}>
			{/* Search Header */}
			<div className="bg-base-100 border-b border-base-200">
				<div className="container mx-auto px-4 py-6">
					{/* Search Bar */}
					<form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
						<div className="join w-full">
							<Input
								type="text"
								placeholder="Search homestays, guides, products..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="join-item flex-1"
								bordered
							/>
							<Button type="submit" variant="primary" className="join-item">
								<Icon name="search" size="sm" />
								Search
							</Button>
						</div>
					</form>

					{/* Results Count & Sort */}
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							{queryParam ? (
								<>
									<h1 className="font-heading text-xl md:text-2xl font-bold">
										Search results for "{queryParam}"
									</h1>
									<p className="text-base-content/60 mt-1">
										{loading || externalLoading ? 'Searching...' : `${displayCount} results found`}
									</p>
								</>
							) : (
								<>
									<h1 className="font-heading text-xl md:text-2xl font-bold">
										Explore Manipur
									</h1>
									<p className="text-base-content/60 mt-1">
										Discover homestays, guides, and tribal crafts
									</p>
								</>
							)}
						</div>

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
								onChange={setFilters}
								onClear={handleClearFilters}
								showListingTypeSelector={true}
							/>
						</div>
					</aside>

					{/* Results Grid */}
					<div className="flex-1">
						{results.length > 0 ? (
							<ListingGrid
								listings={results}
								loading={loading || externalLoading}
								skeletonCount={6}
								savedIds={savedIds}
								onSave={onSave}
								columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
								emptyTitle="No results found"
								emptyMessage="Try adjusting your search or filters."
							/>
						) : queryParam ? (
							<div className="text-center py-16">
								<Icon name="search_off" className="text-6xl text-base-content/20 mb-4" />
								<h2 className="font-heading text-xl font-semibold mb-2">
									No results found
								</h2>
								<p className="text-base-content/60 mb-6">
									We couldn't find anything matching "{queryParam}".
									<br />
									Try different keywords or browse our categories.
								</p>
								<div className="flex flex-wrap justify-center gap-3">
									<Link to="/homestays" className="btn btn-outline btn-sm">
										<Icon name="cottage" size="sm" />
										Homestays
									</Link>
									<NotImplementedLink feature="Guides" className="btn btn-outline btn-sm">
										<Icon name="person" size="sm" />
										Guides
									</NotImplementedLink>
									<Link to="/marketplace" className="btn btn-outline btn-sm">
										<Icon name="storefront" size="sm" />
										Marketplace
									</Link>
								</div>
							</div>
						) : (
							<ListingGrid
								listings={mockResults}
								loading={loading || externalLoading}
								skeletonCount={6}
								savedIds={savedIds}
								onSave={onSave}
								columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
							/>
						)}
					</div>
				</div>
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
							onChange={setFilters}
							onClear={handleClearFilters}
							onApply={() => setShowMobileFilters(false)}
							showListingTypeSelector={true}
							isMobileDrawer
						/>
					</div>
				</>
			)}
		</div>
	);
};
