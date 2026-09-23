import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Rating } from '../../atoms/Rating';
import { Avatar } from '../../atoms/Avatar';
import { ReviewCard } from '../../molecules/ReviewCard';
import { NotImplementedLink } from '../../molecules/NotImplementedLink';
import productsData from '../../../mocks/products.json';
import type { ProductDetailProps } from './ProductDetailProps';

// Mock product data - in a real app, this would come from an API
const mockProduct = {
	id: '1',
	title: 'Handwoven Tribal Basket',
	images: [
		'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
		'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=800&h=600&fit=crop',
		'https://images.unsplash.com/photo-1567225591450-06036b3392a6?w=800&h=600&fit=crop',
	],
	price: 850,
	originalPrice: 1200,
	rating: 4.7,
	reviewCount: 23,
	category: 'Handicrafts',
	inStock: true,
	stockCount: 15,
	description: 'This beautiful handwoven basket is crafted by skilled artisans from Manipur. Each piece is unique, showcasing traditional weaving patterns passed down through generations.\n\nMade from locally sourced bamboo and natural fibers, this basket is both functional and decorative. It can be used for storing fruits, vegetables, or as a beautiful home décor piece.\n\nThe intricate patterns reflect Manipuri craft traditions and stories of community life.',
	specifications: [
		{ label: 'Material', value: 'Bamboo & Natural Fibers' },
		{ label: 'Dimensions', value: '12" x 12" x 8"' },
		{ label: 'Weight', value: '350g' },
		{ label: 'Origin', value: 'Imphal, Manipur' },
		{ label: 'Craft Type', value: 'Handwoven' },
	],
	artisan: {
		name: 'Sushila Devi',
		photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop',
		tribe: 'Munda',
		location: 'Imphal, Manipur',
		experience: '25 years',
		about: 'Sushila Devi is a master weaver from the Munda tribe with 25 years of experience. She learned the art of basket weaving from her grandmother and has been preserving this traditional craft while supporting her family.',
	},
	relatedProducts: [
		{
			id: '2',
			title: 'Dokra Metal Art',
			image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
			price: 1500,
		},
		{
			id: '3',
			title: 'Tribal Painting',
			image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&h=200&fit=crop',
			price: 2200,
		},
		{
			id: '4',
			title: 'Sabai Grass Mat',
			image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
			price: 650,
		},
	],
	reviews: [
		{
			id: '1',
			author: 'Neha Singh',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
			rating: 5,
			date: 'December 2024',
			content: 'Absolutely beautiful craftsmanship! The basket is even more stunning in person. Perfect addition to my living room.',
		},
		{
			id: '2',
			author: 'Rajesh Kumar',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			rating: 4,
			date: 'November 2024',
			content: 'Great quality and fast shipping. Love supporting local artisans through this platform.',
		},
	],
};

/**
 * ProductDetail page component for displaying marketplace product details
 */
export const ProductDetail = ({
	productId: externalProductId,
	loading = false,
	onAddToCart,
	className = '',
}: ProductDetailProps) => {
	const { productId: urlProductId } = useParams<{ productId: string }>();
	const productId = externalProductId || urlProductId;

	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);

	// Find product by id from productsData, or fallback to mockProduct
	const foundProduct = productsData.data.find((p) => p.id === productId);
	const product = useMemo(() => {
		if (!foundProduct) return mockProduct;
		return {
			id: foundProduct.id,
			title: foundProduct.title,
			images: foundProduct.images,
			price: foundProduct.price,
			originalPrice: foundProduct.originalPrice,
			rating: foundProduct.rating,
			reviewCount: foundProduct.reviewCount,
			category: foundProduct.category,
			inStock: foundProduct.inStock,
			stockCount: 15,
			description: foundProduct.description,
			specifications: [
				{ label: 'Craft Type', value: foundProduct.category },
				{ label: 'Materials', value: foundProduct.materials.join(', ') },
				{ label: 'Dimensions', value: foundProduct.dimensions || 'Handcrafted standard size' },
				{ label: 'Origin', value: `${foundProduct.artisan.location}, Manipur` },
			],
			artisan: {
				name: foundProduct.artisan.name,
				photo: foundProduct.artisan.avatar || 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop',
				tribe: 'Manipuri Artisan',
				location: `${foundProduct.artisan.location}, Manipur`,
				experience: '20+ years',
				about: foundProduct.craftStory || 'Master artisan committed to sustaining Manipur’s rich craft legacy.',
			},
			relatedProducts: productsData.data
				.filter((p) => p.id !== foundProduct.id)
				.slice(0, 3)
				.map((p) => ({
					id: p.id,
					title: p.title,
					image: p.images[0],
					price: p.price,
				})),
			reviews: mockProduct.reviews,
		};
	}, [foundProduct]);

	const handleAddToCart = () => {
		onAddToCart?.(productId || '', quantity);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-base-200 flex items-center justify-center">
				<span className="loading loading-spinner loading-lg text-primary" />
			</div>
		);
	}

	const discountPercentage = product.originalPrice
		? Math.round((1 - product.price / product.originalPrice) * 100)
		: 0;

	const containerClasses = ['min-h-screen bg-base-200', className].filter(Boolean).join(' ');

	return (
		<div className={containerClasses}>
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="breadcrumbs text-sm mb-6">
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/marketplace" className="link link-hover">Marketplace</Link></li>
						<li><NotImplementedLink feature={product.category}>{product.category}</NotImplementedLink></li>
						<li>{product.title}</li>
					</ul>
				</div>

				{/* Product Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					{/* Image Gallery */}
					<div className="space-y-4">
						<div className="aspect-[4/3] rounded-xl overflow-hidden bg-base-100">
							<img
								src={product.images[selectedImage] || product.images[0]}
								alt={product.title}
								className="w-full h-full object-cover"
								onError={(e) => {
									const img = e.currentTarget;
									if (!img.dataset.hasFallback) {
										img.dataset.hasFallback = 'true';
										img.src = product.images[1] || '/images/products/handwoven_textile.jpg';
									}
								}}
							/>
						</div>
						<div className="flex gap-3">
							{product.images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ' + (selectedImage === index ? 'border-primary' : 'border-transparent')}
								>
									<img
										src={image}
										alt={product.title + ' ' + (index + 1)}
										className="w-full h-full object-cover"
										onError={(e) => {
											const img = e.currentTarget;
											if (!img.dataset.hasFallback) {
												img.dataset.hasFallback = 'true';
												img.src = product.images[1] || '/images/products/handwoven_textile.jpg';
											}
										}}
									/>
								</button>
							))}
						</div>
					</div>

					{/* Product Info */}
					<div className="card bg-base-100 shadow-sm">
						<div className="card-body">
							<div className="flex flex-wrap gap-2 mb-2">
								<Badge variant="secondary">{product.category}</Badge>
								{discountPercentage > 0 && (
									<Badge variant="error">{discountPercentage}% OFF</Badge>
								)}
							</div>

							<h1 className="font-heading text-2xl md:text-3xl font-bold mb-3">
								{product.title}
							</h1>

							<div className="flex items-center gap-3 mb-4">
								<Rating name="product-rating" value={product.rating} readOnly size="sm" />
								<span className="font-semibold">{product.rating}</span>
								<span className="text-base-content/60">({product.reviewCount} reviews)</span>
							</div>

							<div className="flex items-baseline gap-3 mb-6">
								<span className="text-3xl font-bold text-primary">
									{'₹' + product.price.toLocaleString()}
								</span>
								{product.originalPrice && (
									<span className="text-lg text-base-content/50 line-through">
										{'₹' + product.originalPrice.toLocaleString()}
									</span>
								)}
							</div>

							<p className="text-base-content/70 mb-6">
								{product.description.split('\n\n')[0]}
							</p>

							{/* Stock Status */}
							<div className="flex items-center gap-2 mb-6">
								{product.inStock ? (
									<>
										<Icon name="check_circle" className="text-success" />
										<span className="text-success font-medium">In Stock</span>
										<span className="text-base-content/60">({product.stockCount} available)</span>
									</>
								) : (
									<>
										<Icon name="cancel" className="text-error" />
										<span className="text-error font-medium">Out of Stock</span>
									</>
								)}
							</div>

							{/* Quantity Selector */}
							<div className="form-control mb-6">
								<label className="label">
									<span className="label-text font-medium">Quantity</span>
								</label>
								<div className="join">
									<button
										className="btn btn-outline join-item"
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										disabled={quantity <= 1}
									>
										<Icon name="remove" />
									</button>
									<input
										type="number"
										value={quantity}
										onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
										className="input input-bordered join-item w-20 text-center"
										min="1"
										max={product.stockCount}
									/>
									<button
										className="btn btn-outline join-item"
										onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
										disabled={quantity >= product.stockCount}
									>
										<Icon name="add" />
									</button>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-wrap gap-3">
								<Button
									variant="primary"
									className="flex-1"
									onClick={handleAddToCart}
									disabled={!product.inStock}
								>
									<Icon name="shopping_cart" size="sm" />
									Add to Cart
								</Button>
								<Button style="outline" className="flex-1">
									<Icon name="favorite_border" size="sm" />
									Wishlist
								</Button>
							</div>

							<div className="divider" />

							{/* Delivery Info */}
							<div className="space-y-3 text-sm">
								<div className="flex items-center gap-3">
									<Icon name="local_shipping" className="text-primary" />
									<span>Free delivery on orders above ₹500</span>
								</div>
								<div className="flex items-center gap-3">
									<Icon name="verified" className="text-primary" />
									<span>Authentic tribal craft with certificate</span>
								</div>
								<div className="flex items-center gap-3">
									<Icon name="replay" className="text-primary" />
									<span>Easy 7-day returns</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Details Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column */}
					<div className="lg:col-span-2 space-y-8">
						{/* Description */}
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h2 className="card-title font-heading">
									<Icon name="description" className="text-primary" />
									Description
								</h2>
								<div className="prose max-w-none">
									{product.description.split('\n\n').map((paragraph, index) => (
										<p key={index}>{paragraph}</p>
									))}
								</div>
							</div>
						</div>

						{/* Specifications */}
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h2 className="card-title font-heading">
									<Icon name="list_alt" className="text-primary" />
									Specifications
								</h2>
								<div className="overflow-x-auto">
									<table className="table">
										<tbody>
											{product.specifications.map((spec) => (
												<tr key={spec.label}>
													<td className="font-medium w-1/3">{spec.label}</td>
													<td>{spec.value}</td>
												</tr>
											))}
										</tbody>
									</table>
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
									<Button size="sm" style="outline">
										Write a Review
									</Button>
								</div>
								<div className="space-y-4">
									{product.reviews.map((review) => (
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

					{/* Right Column - Artisan Info */}
					<div className="lg:col-span-1 space-y-8">
						{/* Artisan Story */}
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h2 className="card-title font-heading">
									<Icon name="person" className="text-primary" />
									Meet the Artisan
								</h2>
								<div className="flex items-center gap-4 mt-4">
									<Avatar
										src={product.artisan.photo}
										alt={product.artisan.name}
										size="lg"
									/>
									<div>
										<h3 className="font-semibold">{product.artisan.name}</h3>
										<p className="text-sm text-base-content/60">{product.artisan.tribe} Tribe</p>
										<p className="text-sm text-base-content/60">{product.artisan.location}</p>
									</div>
								</div>
								<p className="mt-4 text-sm text-base-content/70">
									{product.artisan.about}
								</p>
								<div className="flex items-center gap-2 mt-4 text-sm">
									<Icon name="schedule" size="sm" className="text-primary" />
									<span>{product.artisan.experience} of experience</span>
								</div>
							</div>
						</div>

						{/* Related Products */}
						<div className="card bg-base-100 shadow-sm">
							<div className="card-body">
								<h2 className="card-title font-heading">
									<Icon name="apps" className="text-primary" />
									You May Also Like
								</h2>
								<div className="space-y-4 mt-4">
									{product.relatedProducts.map((related) => (
										<Link
											key={related.id}
											to={'/products/' + related.id}
											className="flex items-center gap-4 p-2 rounded-lg hover:bg-base-200 transition-colors"
										>
											<img
												src={related.image}
												alt={related.title}
												className="w-16 h-16 rounded-lg object-cover"
											/>
											<div>
												<h4 className="font-medium text-sm">{related.title}</h4>
												<p className="text-primary font-semibold">{'₹' + related.price.toLocaleString()}</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
