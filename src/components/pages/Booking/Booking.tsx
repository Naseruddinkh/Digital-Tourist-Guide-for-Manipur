import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Rating } from '../../atoms/Rating';
import type { BookingProps, BookingDetails } from './BookingProps';

// Mock homestay data - in a real app, this would come from an API or state
const mockHomestay = {
	id: '1',
	title: 'Lakeside Homestay near Loktak',
	image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop',
	location: 'Moirang, Manipur',
	rating: 4.8,
	reviewCount: 24,
	pricePerNight: 2500,
	cleaningFee: 500,
	serviceFee: 250,
};

/**
 * Booking page component for the first step of the checkout flow
 */
export const Booking = ({
	homestayId: externalHomestayId,
	loading = false,
	onContinue,
	className = '',
}: BookingProps) => {
	const { homestayId: urlHomestayId } = useParams<{ homestayId: string }>();
	const homestayId = externalHomestayId || urlHomestayId;
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		checkIn: '',
		checkOut: '',
		guests: 2,
		guestName: '',
		guestEmail: '',
		guestPhone: '',
		specialRequests: '',
	});

	// In a real app, fetch homestay data based on homestayId
	const homestay = mockHomestay;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const calculateNights = () => {
		if (!formData.checkIn || !formData.checkOut) return 0;
		const checkIn = new Date(formData.checkIn);
		const checkOut = new Date(formData.checkOut);
		const diffTime = checkOut.getTime() - checkIn.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	};

	const nights = calculateNights();
	const roomTotal = nights * homestay.pricePerNight;
	const total = roomTotal + homestay.cleaningFee + homestay.serviceFee;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const bookingDetails: BookingDetails = {
			homestayId: homestayId || '',
			...formData,
		};
		if (onContinue) {
			onContinue(bookingDetails);
		} else {
			// Navigate to checkout
			navigate('/checkout');
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center py-16">
				<span className="loading loading-spinner loading-lg text-primary" />
			</div>
		);
	}

	const containerClasses = ['py-8', className].filter(Boolean).join(' ');

	return (
		<div className={containerClasses}>
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Booking Form */}
					<div className="lg:col-span-2">
						<form onSubmit={handleSubmit} className="space-y-8">
							{/* Dates & Guests */}
							<div className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<h2 className="card-title font-heading">
										<Icon name="calendar_today" className="text-primary" />
										Dates & Guests
									</h2>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
										<div className="form-control">
											<label className="label">
												<span className="label-text font-medium">Check-in</span>
											</label>
											<Input
												type="date"
												name="checkIn"
												value={formData.checkIn}
												onChange={handleInputChange}
												min={new Date().toISOString().split('T')[0]}
												bordered
												required
											/>
										</div>
										<div className="form-control">
											<label className="label">
												<span className="label-text font-medium">Check-out</span>
											</label>
											<Input
												type="date"
												name="checkOut"
												value={formData.checkOut}
												onChange={handleInputChange}
												min={formData.checkIn || new Date().toISOString().split('T')[0]}
												bordered
												required
											/>
										</div>
									</div>

									<div className="form-control mt-4">
										<label className="label">
											<span className="label-text font-medium">Number of Guests</span>
										</label>
										<select
											name="guests"
											value={formData.guests}
											onChange={handleInputChange}
											className="select select-bordered w-full"
										>
											{[1, 2, 3, 4, 5, 6].map((num) => (
												<option key={num} value={num}>
													{num} {num === 1 ? 'guest' : 'guests'}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>

							{/* Guest Details */}
							<div className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<h2 className="card-title font-heading">
										<Icon name="person" className="text-primary" />
										Guest Details
									</h2>

									<div className="space-y-4 mt-4">
										<div className="form-control">
											<label className="label">
												<span className="label-text font-medium">Full Name</span>
											</label>
											<Input
												type="text"
												name="guestName"
												value={formData.guestName}
												onChange={handleInputChange}
												placeholder="Enter your full name"
												bordered
												required
											/>
										</div>

										<div className="form-control">
											<label className="label">
												<span className="label-text font-medium">Email</span>
											</label>
											<Input
												type="email"
												name="guestEmail"
												value={formData.guestEmail}
												onChange={handleInputChange}
												placeholder="Enter your email"
												bordered
												required
											/>
										</div>

										<div className="form-control">
											<label className="label">
												<span className="label-text font-medium">Phone Number</span>
											</label>
											<Input
												type="tel"
												name="guestPhone"
												value={formData.guestPhone}
												onChange={handleInputChange}
												placeholder="Enter your phone number"
												bordered
												required
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Special Requests */}
							<div className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<h2 className="card-title font-heading">
										<Icon name="edit_note" className="text-primary" />
										Special Requests
									</h2>

									<div className="form-control mt-4">
										<textarea
											name="specialRequests"
											value={formData.specialRequests}
											onChange={handleInputChange}
											placeholder="Any special requests or requirements? (optional)"
											className="textarea textarea-bordered h-32"
										/>
									</div>
								</div>
							</div>

							{/* Submit Button - Mobile */}
							<div className="lg:hidden">
								<Button
									type="submit"
									variant="primary"
									className="w-full"
									disabled={!formData.checkIn || !formData.checkOut || nights === 0}
								>
									Continue to Payment
									<Icon name="arrow_forward" size="sm" />
								</Button>
							</div>
						</form>
					</div>

					{/* Booking Summary */}
					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<div className="card bg-base-100 shadow-lg">
								<div className="card-body">
									<h3 className="card-title font-heading text-lg">Booking Summary</h3>

									<div className="divider my-2" />

									{/* Homestay Info */}
									<div className="flex gap-4">
										<img
											src={homestay.image}
											alt={homestay.title}
											className="w-24 h-24 rounded-lg object-cover"
										/>
										<div>
											<h4 className="font-semibold">{homestay.title}</h4>
											<p className="text-sm text-base-content/60">{homestay.location}</p>
											<div className="flex items-center gap-1 mt-1">
												<Rating name="homestay-rating" value={homestay.rating} readOnly size="xs" />
												<span className="text-sm">{homestay.rating}</span>
												<span className="text-sm text-base-content/60">
													({homestay.reviewCount})
												</span>
											</div>
										</div>
									</div>

									<div className="divider my-4" />

									{/* Price Breakdown */}
									<div className="space-y-3 text-sm">
										<div className="flex justify-between">
											<span>
												{'₹' + homestay.pricePerNight.toLocaleString()} × {nights || 0} nights
											</span>
											<span>{'₹' + roomTotal.toLocaleString()}</span>
										</div>
										<div className="flex justify-between">
											<span>Cleaning fee</span>
											<span>{'₹' + homestay.cleaningFee.toLocaleString()}</span>
										</div>
										<div className="flex justify-between">
											<span>Service fee</span>
											<span>{'₹' + homestay.serviceFee.toLocaleString()}</span>
										</div>
									</div>

									<div className="divider my-4" />

									<div className="flex justify-between font-bold text-lg">
										<span>Total</span>
										<span className="text-primary">{'₹' + (nights > 0 ? total : 0).toLocaleString()}</span>
									</div>

									{/* Submit Button - Desktop */}
									<Button
										type="submit"
										variant="primary"
										className="w-full mt-4 hidden lg:flex"
										disabled={!formData.checkIn || !formData.checkOut || nights === 0}
										onClick={handleSubmit}
									>
										Continue to Payment
										<Icon name="arrow_forward" size="sm" />
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
