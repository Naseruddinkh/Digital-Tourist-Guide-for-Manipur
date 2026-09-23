import { useState, useMemo } from 'react';
import { ListingGrid } from '../../organisms/ListingGrid';
import { Icon } from '../../atoms/Icon';
import productsData from '../../../mocks/products.json';
import type { ListingCardProps } from '../../molecules/ListingCard';

export const Marketplace = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [searchQuery, setSearchQuery] = useState<string>('');

	const categories = useMemo(() => {
		const cats = Array.from(new Set(productsData.data.map((p) => p.category)));
		return ['all', ...cats];
	}, []);

	const filteredProducts = useMemo(() => {
		return productsData.data.filter((product) => {
			const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
			const matchesSearch =
				searchQuery === '' ||
				product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.artisan.location.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [selectedCategory, searchQuery]);

	const marketplaceListings: Omit<ListingCardProps, 'isSaved' | 'onSave'>[] = filteredProducts.map((product) => ({
		id: product.id,
		type: 'product',
		title: product.title,
		image: product.images[0] || '',
		fallbackImage: product.images[1] || product.images[0] || '',
		location: product.artisan.location,
		rating: product.rating,
		reviewCount: product.reviewCount,
		price: product.price,
		originalPrice: product.originalPrice,
		badges: product.inStock ? [{ label: 'In stock', variant: 'success' as const }] : undefined,
	}));

	return (
		<main className="min-h-screen bg-base-200 py-10 md:py-16">
			<div className="container mx-auto px-4">
				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-wide text-primary">One Manipur Tourism</p>
					<h1 className="font-heading text-3xl md:text-4xl font-bold mt-2">Manipuri Handicrafts & Marketplace</h1>
					<p className="text-base-content/70 mt-2 max-w-2xl">
						Shop authentic indigenous crafts, handwoven tribal textiles, and cane & bamboo creations made by local artisans across Manipur.
					</p>
				</div>

				{/* Category Filters and Search */}
				<div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
					<div className="flex flex-wrap gap-2">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`btn btn-sm capitalize ${selectedCategory === cat ? 'btn-primary' : 'btn-ghost bg-base-100'}`}
							>
								{cat === 'all' ? 'All Crafts' : cat}
							</button>
						))}
					</div>
					<div className="relative w-full md:w-72">
						<input
							type="text"
							placeholder="Search crafts or location..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="input input-bordered input-sm w-full bg-base-100 pl-9"
						/>
						<span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/50">
							<Icon name="search" size="sm" />
						</span>
					</div>
				</div>

				<ListingGrid
					listings={marketplaceListings}
					columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
					emptyTitle="No crafts found"
					emptyMessage="Try adjusting your filter or search query."
				/>
			</div>
		</main>
	);
};
