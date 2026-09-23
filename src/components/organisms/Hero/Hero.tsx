import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { SearchBar } from '../../molecules/SearchBar';
import type { HeroProps } from './HeroProps';

// Scenic travel image used when the homepage does not provide a custom background.
const DEFAULT_BG = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920&h=1080&fit=crop';

/**
 * Hero organism component for homepage hero section
 *
 * @param props - Component props
 * @returns Hero component
 */
export const Hero = ({
	backgroundImage = DEFAULT_BG,
	title = 'Discover the Soul of Manipur',
	subtitle = 'Experience authentic homestays, connect with expert local guides, and explore handcrafted tribal treasures from the heart of India.',
	onSearch,
	className = ''
}: HeroProps) => {
	// Quick category links
	const categories = [
		{ label: 'Homestays', href: '/homestays', icon: 'cottage' },
		{ label: 'Local Guides', href: '/guides', icon: 'person' },
		{ label: 'Marketplace', href: '/marketplace', icon: 'storefront' },
	];

	return (
		<section
			className={`hero min-h-[80vh] relative ${className}`.trim()}
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			{/* Gradient Overlay */}
			<div className="hero-overlay bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

			{/* Hero Content */}
			<div className="hero-content text-center text-neutral-content py-12">
				<div className="max-w-3xl">
					{/* Main Heading */}
					<h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
						{title}
					</h1>

					{/* Subtitle */}
					<p className="mb-8 text-lg md:text-xl text-neutral-content/90 max-w-2xl mx-auto">
						{subtitle}
					</p>

					{/* Search Bar */}
					<div className="mb-8 max-w-xl mx-auto">
						<SearchBar
							placeholder="Search destinations, homestays, experiences..."
							size="lg"
							onSearch={onSearch}
							showFilterButton={false}
						/>
					</div>

					{/* Quick Category Buttons */}
					<div className="flex flex-wrap justify-center gap-3">
						{categories.map((category) => (
							<Button
								key={category.href}
								as="a"
								href={category.href}
								variant="neutral"
								style="outline"
								size="md"
								className="border-neutral-content/30 text-neutral-content hover:bg-neutral-content hover:text-neutral hover:border-neutral-content"
							>
								<Icon name={category.icon} size="sm" />
								{category.label}
							</Button>
						))}
					</div>

					{/* Stats or Trust Indicators */}
					<div className="mt-12 flex flex-wrap justify-center gap-8 text-neutral-content/80">
						<div className="text-center">
							<p className="text-3xl font-bold text-neutral-content">500+</p>
							<p className="text-sm">Homestays</p>
						</div>
						<div className="text-center">
							<p className="text-3xl font-bold text-neutral-content">200+</p>
							<p className="text-sm">Local Guides</p>
						</div>
						<div className="text-center">
							<p className="text-3xl font-bold text-neutral-content">1000+</p>
							<p className="text-sm">Happy Travelers</p>
						</div>
						<div className="text-center">
							<p className="text-3xl font-bold text-neutral-content">24</p>
							<p className="text-sm">Districts</p>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<Icon name="keyboard_arrow_down" size="xl" className="text-neutral-content/60" />
			</div>
		</section>
	);
};
