import { Routes, Route } from 'react-router';

// Layout imports
import { MainLayout } from './components/layouts/MainLayout';
import { AuthLayout } from './components/layouts/AuthLayout';
import { CheckoutLayout } from './components/layouts/CheckoutLayout';
import { DashboardLayout } from './components/layouts/DashboardLayout';

// Page imports
import { Home } from './components/pages/Home';
import { Homestays } from './components/pages/Homestays';
import { HomestayDetail } from './components/pages/HomestayDetail';
import { Search } from './components/pages/Search';
import { GuideDetail } from './components/pages/GuideDetail';
import { Guides } from './components/pages/Guides';
import { ProductDetail } from './components/pages/ProductDetail';
import { Marketplace } from './components/pages/Marketplace';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Booking } from './components/pages/Booking';
import { Checkout } from './components/pages/Checkout';
import { Dashboard } from './components/pages/Dashboard';
import { Profile } from './components/pages/Profile';
import { NotFound } from './components/pages/NotFound';

/**
 * Main application component with route configuration
 *
 * Route structure:
 * - Public routes (MainLayout): /, /homestays, /homestays/:id, /search, /guides/:id, /products/:id
 * - Auth routes (AuthLayout): /login, /register
 * - Checkout routes (CheckoutLayout): /booking/:id, /checkout
 * - Dashboard routes (DashboardLayout): /dashboard, /dashboard/profile, etc.
 */
const App = () => {
	// Mock user for demonstration - in a real app, this would come from auth state/context
	const mockUser = { name: 'John Doe', avatar: '' };

	return (
		<Routes>
			{/* Public routes with MainLayout */}
			<Route element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="homestays" element={<Homestays />} />
				<Route path="homestays/:homestayId" element={<HomestayDetail />} />
				<Route path="search" element={<Search />} />
				<Route path="guides" element={<Guides />} />
				<Route path="guides/:guideId" element={<GuideDetail />} />
				<Route path="products/:productId" element={<ProductDetail />} />
				<Route path="marketplace" element={<Marketplace />} />
				<Route path="*" element={<NotFound />} />
			</Route>

			{/* Auth routes with AuthLayout */}
			<Route element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>

			{/* Checkout flow with CheckoutLayout */}
			<Route element={<CheckoutLayout steps={['Details', 'Payment', 'Confirmation']} currentStep={0} />}>
				<Route path="booking/:homestayId" element={<Booking />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>

			{/* Dashboard routes with DashboardLayout */}
			<Route path="dashboard" element={<DashboardLayout user={mockUser} />}>
				<Route index element={<Dashboard />} />
				<Route path="profile" element={<Profile />} />
			</Route>
		</Routes>
	);
};

export default App;
