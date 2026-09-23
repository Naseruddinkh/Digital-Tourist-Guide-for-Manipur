import { Icon } from '../../atoms/Icon';
import { Price } from '../../atoms/Price';
import type { MapViewProps, MapMarker } from './MapViewProps';

// Default center (Imphal, Manipur)
const DEFAULT_CENTER = { lat: 24.817, lng: 93.9368 };

/**
 * Generate OpenStreetMap embed URL
 */
const getStaticMapUrl = (lat: number, lng: number): string => {
	// Using OpenStreetMap static tiles as a placeholder
	// In production, you would use Google Maps Static API with an API key
	return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.1}%2C${lat - 0.05}%2C${lng + 0.1}%2C${lat + 0.05}&layer=mapnik&marker=${lat}%2C${lng}`;
};

/**
 * Get Google Maps directions URL
 */
const getGoogleMapsUrl = (lat: number, lng: number, name?: string): string => {
	const query = name ? encodeURIComponent(name) : `${lat},${lng}`;
	return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

/**
 * MapView organism for displaying location maps
 *
 * Shows an interactive map placeholder with markers and external link
 *
 * @param props - Component props
 * @returns MapView component
 */
export const MapView = ({
	center = DEFAULT_CENTER,
	markers = [],
	height = '300px',
	onMarkerClick,
	locationName,
	showExternalLink = true,
	className = ''
}: MapViewProps) => {
	const handleMarkerClick = (marker: MapMarker) => {
		onMarkerClick?.(marker);
	};

	return (
		<div className={`relative rounded-lg overflow-hidden ${className}`.trim()}>
			{/* Map Container */}
			<div
				className="relative bg-base-200"
				style={{ height }}
			>
				{/* Static Map Image/Embed */}
				<iframe
					src={getStaticMapUrl(center.lat, center.lng)}
					className="w-full h-full border-0"
					title="Location Map"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				/>

				{/* Map Overlay with Markers */}
				<div className="absolute inset-0 pointer-events-none">
					{/* Center Marker */}
					{markers.length === 0 && (
						<div
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
						>
							<div className="bg-primary text-primary-content rounded-full p-2 shadow-lg">
								<Icon name="location_on" size="md" />
							</div>
						</div>
					)}

					{/* Custom Markers */}
					{markers.map((marker, index) => (
						<button
							key={marker.id}
							onClick={() => handleMarkerClick(marker)}
							className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-full hover:z-10 transition-transform hover:scale-110"
							style={{
								// Simple positioning - in a real app, you'd calculate based on lat/lng
								top: `${30 + (index * 10) % 40}%`,
								left: `${20 + (index * 15) % 60}%`
							}}
							title={marker.title}
						>
							{marker.price ? (
								<div className="bg-base-100 text-base-content px-2 py-1 rounded-lg shadow-lg border border-base-300 font-semibold text-sm whitespace-nowrap">
									<Price amount={marker.price} size="sm" />
								</div>
							) : (
								<div className="bg-primary text-primary-content rounded-full p-1.5 shadow-lg">
									<Icon name="location_on" size="sm" />
								</div>
							)}
						</button>
					))}
				</div>

				{/* Location Name Overlay */}
				{locationName && (
					<div className="absolute bottom-4 left-4 bg-base-100/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow">
						<div className="flex items-center gap-2">
							<Icon name="location_on" size="sm" className="text-primary" />
							<span className="font-medium text-sm">{locationName}</span>
						</div>
					</div>
				)}
			</div>

			{/* External Link */}
			{showExternalLink && (
				<a
					href={getGoogleMapsUrl(center.lat, center.lng, locationName)}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center gap-2 p-3 bg-base-100 border-t border-base-200 hover:bg-base-200 transition-colors"
				>
					<Icon name="open_in_new" size="sm" />
					<span className="text-sm font-medium">View on Google Maps</span>
				</a>
			)}
		</div>
	);
};
