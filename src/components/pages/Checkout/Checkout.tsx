import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { NotImplementedLink } from '../../molecules/NotImplementedLink';
import type { CheckoutProps, PaymentDetails } from './CheckoutProps';

// Mock booking data - in a real app, this would come from state or URL params
const mockBooking = {
	homestay: {
		title: 'Lakeside Homestay near Loktak',
		image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop',
		location: 'Moirang, Manipur',
	},
	checkIn: '2025-01-15',
	checkOut: '2025-01-18',
	guests: 2,
	nights: 3,
	roomTotal: 7500,
	cleaningFee: 500,
	serviceFee: 250,
	total: 8250,
};

/**
 * Checkout page component for the payment step of the checkout flow
 */
export const Checkout = ({
	loading = false,
	onComplete,
	className = '',
}: CheckoutProps) => {
	const navigate = useNavigate();
	const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
	const [cardDetails, setCardDetails] = useState({
		cardNumber: '',
		expiry: '',
		cvv: '',
		cardName: '',
	});
	const [upiId, setUpiId] = useState('');
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const booking = mockBooking;

	const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCardDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!termsAccepted) return;

		setIsProcessing(true);

		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const paymentDetails: PaymentDetails = {
			paymentMethod,
			transactionId: 'TXN' + Date.now(),
		};

		if (onComplete) {
			onComplete(paymentDetails);
		} else {
			// Navigate to success page or dashboard
			navigate('/dashboard');
		}

		setIsProcessing(false);
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
					{/* Payment Form */}
					<div className="lg:col-span-2">
						<form onSubmit={handleSubmit} className="space-y-8">
							{/* Payment Method */}
							<div className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<h2 className="card-title font-heading">
										<Icon name="payment" className="text-primary" />
										Payment Method
									</h2>

									<div className="space-y-4 mt-4">
										{/* Card Option */}
										<label className={'flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ' + (paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-base-300')}>
											<input
												type="radio"
												name="paymentMethod"
												value="card"
												checked={paymentMethod === 'card'}
												onChange={() => setPaymentMethod('card')}
												className="radio radio-primary"
											/>
											<Icon name="credit_card" className="text-2xl" />
											<span className="font-medium">Credit / Debit Card</span>
										</label>

										{/* UPI Option */}
										<label className={'flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ' + (paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-base-300')}>
											<input
												type="radio"
												name="paymentMethod"
												value="upi"
												checked={paymentMethod === 'upi'}
												onChange={() => setPaymentMethod('upi')}
												className="radio radio-primary"
											/>
											<Icon name="qr_code" className="text-2xl" />
											<span className="font-medium">UPI</span>
										</label>

										{/* Net Banking Option */}
										<label className={'flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ' + (paymentMethod === 'netbanking' ? 'border-primary bg-primary/5' : 'border-base-300')}>
											<input
												type="radio"
												name="paymentMethod"
												value="netbanking"
												checked={paymentMethod === 'netbanking'}
												onChange={() => setPaymentMethod('netbanking')}
												className="radio radio-primary"
											/>
											<Icon name="account_balance" className="text-2xl" />
											<span className="font-medium">Net Banking</span>
										</label>
									</div>
								</div>
							</div>

							{/* Card Details */}
							{paymentMethod === 'card' && (
								<div className="card bg-base-100 shadow-sm">
									<div className="card-body">
										<h2 className="card-title font-heading">
											<Icon name="credit_card" className="text-primary" />
											Card Details
										</h2>

										<div className="space-y-4 mt-4">
											<div className="form-control">
												<label className="label">
													<span className="label-text font-medium">Card Number</span>
												</label>
												<Input
													type="text"
													name="cardNumber"
													value={cardDetails.cardNumber}
													onChange={handleCardInputChange}
													placeholder="1234 5678 9012 3456"
													bordered
													required
												/>
											</div>

											<div className="grid grid-cols-2 gap-4">
												<div className="form-control">
													<label className="label">
														<span className="label-text font-medium">Expiry Date</span>
													</label>
													<Input
														type="text"
														name="expiry"
														value={cardDetails.expiry}
														onChange={handleCardInputChange}
														placeholder="MM/YY"
														bordered
														required
													/>
												</div>
												<div className="form-control">
													<label className="label">
														<span className="label-text font-medium">CVV</span>
													</label>
													<Input
														type="text"
														name="cvv"
														value={cardDetails.cvv}
														onChange={handleCardInputChange}
														placeholder="123"
														bordered
														required
													/>
												</div>
											</div>

											<div className="form-control">
												<label className="label">
													<span className="label-text font-medium">Name on Card</span>
												</label>
												<Input
													type="text"
													name="cardName"
													value={cardDetails.cardName}
													onChange={handleCardInputChange}
													placeholder="Enter name as on card"
													bordered
													required
												/>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* UPI Details */}
							{paymentMethod === 'upi' && (
								<div className="card bg-base-100 shadow-sm">
									<div className="card-body">
										<h2 className="card-title font-heading">
											<Icon name="qr_code" className="text-primary" />
											UPI Details
										</h2>

										<div className="form-control mt-4">
											<label className="label">
												<span className="label-text font-medium">UPI ID</span>
											</label>
											<Input
												type="text"
												value={upiId}
												onChange={(e) => setUpiId(e.target.value)}
												placeholder="yourname@upi"
												bordered
												required
											/>
										</div>
									</div>
								</div>
							)}

							{/* Net Banking Details */}
							{paymentMethod === 'netbanking' && (
								<div className="card bg-base-100 shadow-sm">
									<div className="card-body">
										<h2 className="card-title font-heading">
											<Icon name="account_balance" className="text-primary" />
											Select Bank
										</h2>

										<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
											{['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map((bank) => (
												<label
													key={bank}
													className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:border-primary transition-colors"
												>
													<input type="radio" name="bank" className="radio radio-sm radio-primary" />
													<span>{bank}</span>
												</label>
											))}
										</div>
									</div>
								</div>
							)}

							{/* Terms & Conditions */}
							<div className="card bg-base-100 shadow-sm">
								<div className="card-body">
									<label className="flex items-start gap-3 cursor-pointer">
										<input
											type="checkbox"
											checked={termsAccepted}
											onChange={(e) => setTermsAccepted(e.target.checked)}
											className="checkbox checkbox-primary mt-1"
										/>
										<span className="text-sm">
											I agree to the{' '}
											<NotImplementedLink feature="Terms & Conditions" className="link link-primary">
												Terms & Conditions
											</NotImplementedLink>{' '}
											and{' '}
											<NotImplementedLink feature="Privacy Policy" className="link link-primary">
												Privacy Policy
											</NotImplementedLink>
											. I understand that my booking is subject to the host's cancellation policy.
										</span>
									</label>
								</div>
							</div>

							{/* Submit Button - Mobile */}
							<div className="lg:hidden">
								<Button
									type="submit"
									variant="primary"
									className="w-full"
									disabled={!termsAccepted || isProcessing}
								>
									{isProcessing ? (
										<>
											<span className="loading loading-spinner loading-sm" />
											Processing...
										</>
									) : (
										<>
											Pay {'₹' + booking.total.toLocaleString()}
											<Icon name="lock" size="sm" />
										</>
									)}
								</Button>
							</div>
						</form>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<div className="card bg-base-100 shadow-lg">
								<div className="card-body">
									<h3 className="card-title font-heading text-lg">Order Summary</h3>

									<div className="divider my-2" />

									{/* Homestay Info */}
									<div className="flex gap-4">
										<img
											src={booking.homestay.image}
											alt={booking.homestay.title}
											className="w-24 h-24 rounded-lg object-cover"
										/>
										<div>
											<h4 className="font-semibold">{booking.homestay.title}</h4>
											<p className="text-sm text-base-content/60">{booking.homestay.location}</p>
										</div>
									</div>

									<div className="divider my-4" />

									{/* Booking Details */}
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-base-content/60">Check-in</span>
											<span>{booking.checkIn}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-base-content/60">Check-out</span>
											<span>{booking.checkOut}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-base-content/60">Guests</span>
											<span>{booking.guests}</span>
										</div>
									</div>

									<div className="divider my-4" />

									{/* Price Breakdown */}
									<div className="space-y-3 text-sm">
										<div className="flex justify-between">
											<span>Room ({booking.nights} nights)</span>
											<span>{'₹' + booking.roomTotal.toLocaleString()}</span>
										</div>
										<div className="flex justify-between">
											<span>Cleaning fee</span>
											<span>{'₹' + booking.cleaningFee.toLocaleString()}</span>
										</div>
										<div className="flex justify-between">
											<span>Service fee</span>
											<span>{'₹' + booking.serviceFee.toLocaleString()}</span>
										</div>
									</div>

									<div className="divider my-4" />

									<div className="flex justify-between font-bold text-lg">
										<span>Total</span>
										<span className="text-primary">{'₹' + booking.total.toLocaleString()}</span>
									</div>

									{/* Submit Button - Desktop */}
									<Button
										type="submit"
										variant="primary"
										className="w-full mt-4 hidden lg:flex"
										disabled={!termsAccepted || isProcessing}
										onClick={handleSubmit}
									>
										{isProcessing ? (
											<>
												<span className="loading loading-spinner loading-sm" />
												Processing...
											</>
										) : (
											<>
												Pay {'₹' + booking.total.toLocaleString()}
												<Icon name="lock" size="sm" />
											</>
										)}
									</Button>

									<div className="flex items-center justify-center gap-2 text-xs text-base-content/60 mt-3">
										<Icon name="lock" size="sm" />
										<span>Secured by 256-bit SSL encryption</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
