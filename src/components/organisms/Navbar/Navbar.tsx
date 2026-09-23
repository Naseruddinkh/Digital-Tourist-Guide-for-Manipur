import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Icon } from '../../atoms/Icon';
import { SearchBar } from '../../molecules/SearchBar';
import { NotImplementedLink } from '../../molecules/NotImplementedLink';
import type { NavbarProps } from './NavbarProps';

/**
 * Navbar organism component for site-wide navigation
 *
 * @param props - Component props
 * @returns Navbar component
 */
export const Navbar = ({
	user,
	cartItemCount = 0,
	onLogout,
	onSearch,
	className = ''
}: NavbarProps) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Navigation links (implemented flag indicates if route exists)
	const navLinks = [
		{ label: 'Homestays', href: '/homestays', icon: 'cottage', implemented: true },
		{ label: 'Guides', href: '/guides', icon: 'person', implemented: true },
		{ label: 'Marketplace', href: '/marketplace', icon: 'storefront', implemented: true },
	];

	// User dropdown links
	const userLinks = [
		{ label: 'Profile', href: '/dashboard/profile', icon: 'account_circle', implemented: true },
		{ label: 'My Bookings', href: '/bookings', icon: 'calendar_month', implemented: false },
		{ label: 'Saved', href: '/saved', icon: 'favorite', implemented: false },
		{ label: 'Settings', href: '/settings', icon: 'settings', implemented: false },
	];

	// Provider-only links
	const providerLinks = [
		{ label: 'Dashboard', href: '/dashboard', icon: 'dashboard', implemented: true },
		{ label: 'My Listings', href: '/dashboard/listings', icon: 'list', implemented: false },
	];

	return (
		<header className={`navbar bg-base-100 shadow-sm sticky top-0 z-50 ${className}`.trim()}>
			{/* Navbar Start - Logo & Mobile Menu */}
			<div className="navbar-start">
				{/* Mobile menu button */}
				<button
					className="btn btn-ghost lg:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={mobileMenuOpen}
				>
					<Icon name={mobileMenuOpen ? 'close' : 'menu'} size="md" />
				</button>

				{/* Logo */}
				<Link to="/" className="btn btn-ghost text-xl font-heading font-bold text-primary">
					<Icon name="landscape" size="lg" color="primary" />
					<span className="hidden sm:inline">One Manipur Tourism</span>
					<span className="sm:hidden">JY</span>
				</Link>
			</div>

			{/* Navbar Center - Navigation Links (Desktop) */}
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 gap-1">
					{navLinks.map((link) => (
						<li key={link.href}>
							{link.implemented ? (
								<NavLink
									to={link.href}
									className={({ isActive }) =>
										`font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`
									}
								>
									<Icon name={link.icon} size="sm" />
									{link.label}
								</NavLink>
							) : (
								<NotImplementedLink
									feature={link.label}
									className="font-medium hover:text-primary transition-colors"
								>
									<Icon name={link.icon} size="sm" />
									{link.label}
								</NotImplementedLink>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* Navbar End - Search, Cart, User */}
			<div className="navbar-end gap-2">
				{/* Search bar (desktop only) */}
				<div className="hidden md:block w-64">
					<SearchBar
						placeholder="Search..."
						size="sm"
						onSearch={onSearch}
					/>
				</div>

				{/* Cart button */}
				<NotImplementedLink feature="Cart" className="btn btn-ghost btn-circle">
					<div className="indicator">
						<Icon name="shopping_cart" size="md" />
						{cartItemCount > 0 && (
							<Badge
								variant="error"
								size="xs"
								className="indicator-item"
							>
								{cartItemCount > 9 ? '9+' : cartItemCount}
							</Badge>
						)}
					</div>
				</NotImplementedLink>

				{/* User section */}
				{user ? (
					// Logged in - show avatar dropdown
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<Avatar
								src={user.avatar}
								alt={user.name}
								placeholder={user.name.charAt(0).toUpperCase()}
								size="sm"
								shape="circle"
							/>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
						>
							{/* User info */}
							<li className="menu-title">
								<span className="text-base-content font-semibold">{user.name}</span>
							</li>
							<div className="divider my-0"></div>

							{/* Provider links */}
							{user.role === 'provider' && (
								<>
									{providerLinks.map((link) => (
										<li key={link.href}>
											{link.implemented ? (
												<Link to={link.href}>
													<Icon name={link.icon} size="sm" />
													{link.label}
												</Link>
											) : (
												<NotImplementedLink feature={link.label}>
													<Icon name={link.icon} size="sm" />
													{link.label}
												</NotImplementedLink>
											)}
										</li>
									))}
									<div className="divider my-0"></div>
								</>
							)}

							{/* User links */}
							{userLinks.map((link) => (
								<li key={link.href}>
									{link.implemented ? (
										<Link to={link.href}>
											<Icon name={link.icon} size="sm" />
											{link.label}
										</Link>
									) : (
										<NotImplementedLink feature={link.label}>
											<Icon name={link.icon} size="sm" />
											{link.label}
										</NotImplementedLink>
									)}
								</li>
							))}

							<div className="divider my-0"></div>

							{/* Logout */}
							<li>
								<button onClick={onLogout} className="text-error">
									<Icon name="logout" size="sm" color="error" />
									Sign Out
								</button>
							</li>
						</ul>
					</div>
				) : (
					// Not logged in - show auth buttons
					<div className="flex items-center gap-2">
						<Link to="/login" className="btn btn-ghost btn-sm hidden sm:flex">
							Sign In
						</Link>
						<Link to="/register" className="btn btn-primary btn-sm">
							Sign Up
						</Link>
					</div>
				)}
			</div>

			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div className="absolute top-full left-0 right-0 bg-base-100 shadow-lg lg:hidden border-t border-base-200">
					{/* Mobile Search */}
					<div className="p-4 border-b border-base-200">
						<SearchBar
							placeholder="Search destinations, homestays..."
							onSearch={(query) => {
								onSearch?.(query);
								setMobileMenuOpen(false);
							}}
						/>
					</div>

					{/* Mobile Nav Links */}
					<ul className="menu p-4">
						{navLinks.map((link) => (
							<li key={link.href}>
								{link.implemented ? (
									<NavLink
										to={link.href}
										className={({ isActive }) =>
											`font-medium ${isActive ? 'text-primary' : ''}`
										}
										onClick={() => setMobileMenuOpen(false)}
									>
										<Icon name={link.icon} size="md" />
										{link.label}
									</NavLink>
								) : (
									<NotImplementedLink
										feature={link.label}
										className="font-medium"
									>
										<Icon name={link.icon} size="md" />
										{link.label}
									</NotImplementedLink>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</header>
	);
};
