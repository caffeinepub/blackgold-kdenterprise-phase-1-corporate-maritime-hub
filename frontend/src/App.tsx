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
import ShippingDashboardPage from './pages/ShippingDashboardPage';
import ShipmentDetailPage from './pages/ShipmentDetailPage';
import KDShipLandingPage from './pages/kdship/KDShipLandingPage';
import StudentDashboardPage from './pages/kdship/StudentDashboardPage';
import CourseBrowserPage from './pages/kdship/CourseBrowserPage';
import CourseDetailPage from './pages/kdship/CourseDetailPage';
import QuizPage from './pages/kdship/QuizPage';
import CertificatesPage from './pages/kdship/CertificatesPage';
import SubscriptionPage from './pages/kdship/SubscriptionPage';
import AdminDashboardPage from './pages/kdship/AdminDashboardPage';
import KDTrustPage from './pages/KDTrustPage';

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

const shippingDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shipping-dashboard',
  component: ShippingDashboardPage,
});

const shipmentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shipments/$shipmentId',
  component: ShipmentDetailPage,
});

// KD Ship Education Platform Routes
const kdShipLandingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-ship',
  component: KDShipLandingPage,
});

const kdShipDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-ship/dashboard',
  component: StudentDashboardPage,
});

const kdShipCoursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-ship/courses',
  component: CourseBrowserPage,
});

const kdShipCourseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-ship/courses/$courseId',
  component: CourseDetailPage,
});

const kdShipQuizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-ship/quiz/$quizId',
  component: QuizPage,
});

const kdShipCertificatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-ship/certificates',
  component: CertificatesPage,
});

const kdShipSubscriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-ship/subscription',
  component: SubscriptionPage,
});

const kdShipAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-ship/admin',
  component: AdminDashboardPage,
});

// KD Trust Route
const kdTrustRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/kd-trust',
  component: KDTrustPage,
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
  shippingDashboardRoute,
  shipmentDetailRoute,
  kdShipLandingRoute,
  kdShipDashboardRoute,
  kdShipCoursesRoute,
  kdShipCourseDetailRoute,
  kdShipQuizRoute,
  kdShipCertificatesRoute,
  kdShipSubscriptionRoute,
  kdShipAdminRoute,
  kdTrustRoute,
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
