import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import FleetPage from './pages/FleetPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import CryptoTokensPage from './pages/CryptoTokensPage';
import GiftCardSystemPage from './pages/GiftCardSystemPage';
import KDPlatformLandingPage from './pages/KDPlatformLandingPage';
import KDDashboardPage from './pages/KDDashboardPage';
import NOCPage from './pages/NOCPage';
import UniversalLaunchReportPage from './pages/UniversalLaunchReportPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const fleetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fleet',
  component: FleetPage,
});

const careersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/careers',
  component: CareersPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const cryptoTokensRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/crypto-tokens',
  component: CryptoTokensPage,
});

const giftCardSystemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gift-card-system',
  component: GiftCardSystemPage,
});

const kdPlatformRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-platform',
  component: KDPlatformLandingPage,
});

const kdDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-platform/dashboard',
  component: KDDashboardPage,
});

const nocRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-platform/noc',
  component: NOCPage,
});

const universalLaunchReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-platform/universal-launch-report',
  component: UniversalLaunchReportPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  aboutRoute,
  fleetRoute,
  careersRoute,
  contactRoute,
  cryptoTokensRoute,
  giftCardSystemRoute,
  kdPlatformRoute,
  kdDashboardRoute,
  nocRoute,
  universalLaunchReportRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
