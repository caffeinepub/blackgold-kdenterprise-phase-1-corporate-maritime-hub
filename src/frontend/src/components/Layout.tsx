import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Anchor, ChevronDown, Heart } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NavItem =
  | { label: string; path: string }
  | { label: string; submenu: Array<{ label: string; path: string }> };

export default function Layout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    {
      label: 'Company',
      submenu: [
        { label: 'About', path: '/about' },
        { label: 'Bgkd Crypto Tokens', path: '/crypto-tokens' },
        { label: 'Gift Card System', path: '/gift-card-system' },
      ],
    },
    { label: 'Fleet', path: '/fleet' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
    { label: 'KD Platform', path: '/kd-platform' },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  const isCompanyActive = currentPath === '/about' || currentPath === '/crypto-tokens' || currentPath === '/gift-card-system';
  const isKDPlatformActive = currentPath === '/kd-platform' || currentPath === '/kd-platform/dashboard';

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-maritime-border bg-maritime-header/95 backdrop-blur supports-[backdrop-filter]:bg-maritime-header/80">
        <div className="container flex h-16 items-center justify-between">
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Anchor className="h-7 w-7 text-maritime-gold" />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-maritime-gold">
                Blackgold Kdenterprise
              </span>
              <span className="text-xs text-maritime-blue-light">Since 1995</span>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              if ('submenu' in item && item.submenu) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={isCompanyActive ? 'default' : 'ghost'}
                        className={
                          isCompanyActive
                            ? 'bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90'
                            : 'text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold'
                        }
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-maritime-navy border-maritime-border">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem.path}
                          onClick={() => handleNavigation(subItem.path)}
                          className={
                            currentPath === subItem.path
                              ? 'bg-maritime-gold text-maritime-navy cursor-pointer'
                              : 'text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold cursor-pointer'
                          }
                        >
                          {subItem.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              if ('path' in item) {
                return (
                  <Button
                    key={item.path}
                    variant={currentPath === item.path || (item.path === '/kd-platform' && isKDPlatformActive) ? 'default' : 'ghost'}
                    onClick={() => handleNavigation(item.path)}
                    className={
                      currentPath === item.path || (item.path === '/kd-platform' && isKDPlatformActive)
                        ? 'bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90'
                        : 'text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold'
                    }
                  >
                    {item.label}
                  </Button>
                );
              }
              return null;
            })}
          </nav>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-maritime-gold">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-maritime-navy">
              <nav className="flex flex-col gap-2 pt-8">
                {navItems.map((item) => {
                  if ('submenu' in item && item.submenu) {
                    return (
                      <div key={item.label} className="flex flex-col gap-1">
                        <div className="px-3 py-2 text-sm font-semibold text-maritime-gold">
                          {item.label}
                        </div>
                        {item.submenu.map((subItem) => (
                          <Button
                            key={subItem.path}
                            variant={currentPath === subItem.path ? 'default' : 'ghost'}
                            onClick={() => handleNavigation(subItem.path)}
                            className={
                              currentPath === subItem.path
                                ? 'justify-start bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90 ml-4'
                                : 'justify-start text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold ml-4'
                            }
                          >
                            {subItem.label}
                          </Button>
                        ))}
                      </div>
                    );
                  }
                  if ('path' in item) {
                    return (
                      <Button
                        key={item.path}
                        variant={currentPath === item.path || (item.path === '/kd-platform' && isKDPlatformActive) ? 'default' : 'ghost'}
                        onClick={() => handleNavigation(item.path)}
                        className={
                          currentPath === item.path || (item.path === '/kd-platform' && isKDPlatformActive)
                            ? 'justify-start bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90'
                            : 'justify-start text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold'
                        }
                      >
                        {item.label}
                      </Button>
                    );
                  }
                  return null;
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-maritime-border bg-maritime-footer py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Anchor className="h-6 w-6 text-maritime-gold" />
                <span className="font-bold text-maritime-gold">Blackgold Kdenterprise</span>
              </div>
              <p className="mt-2 text-sm text-maritime-blue-light">
                Navigating the Future of Maritime
              </p>
              <div className="mt-4 flex gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-maritime-gold/30 bg-maritime-gold/10 px-3 py-1.5">
                  <i className="fas fa-shield-alt text-maritime-gold"></i>
                  <span className="text-xs font-semibold text-maritime-gold">Bank-Safe</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-maritime-gold/30 bg-maritime-gold/10 px-3 py-1.5">
                  <i className="fas fa-shield-check text-maritime-gold"></i>
                  <span className="text-xs font-semibold text-maritime-gold">Regulator-Ready</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-maritime-gold">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavigation('/')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation('/services')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  Services
                </button>
                <button
                  onClick={() => handleNavigation('/about')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavigation('/crypto-tokens')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  Bgkd Crypto Tokens
                </button>
                <button
                  onClick={() => handleNavigation('/gift-card-system')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  Gift Card System
                </button>
                <button
                  onClick={() => handleNavigation('/fleet')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  Fleet
                </button>
                <button
                  onClick={() => handleNavigation('/careers')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  Careers
                </button>
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  Contact
                </button>
                <button
                  onClick={() => handleNavigation('/kd-platform')}
                  className="text-left text-sm text-maritime-blue-light transition-colors hover:text-maritime-gold"
                >
                  KD Platform
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-maritime-gold">Contact Us</h3>
              <div className="space-y-3 text-sm text-maritime-blue-light">
                <div>
                  <p className="font-medium text-maritime-gold">Address:</p>
                  <p>651 N Broad St #206</p>
                  <p>Middletown, DE 19709, USA</p>
                </div>
                <div>
                  <p className="font-medium text-maritime-gold">Phone:</p>
                  <p>+1 646 631-8561</p>
                </div>
                <div>
                  <p className="mb-2 font-medium text-maritime-gold">Official Email Contacts:</p>
                  <div className="space-y-1.5">
                    <a
                      href="mailto:admin@kdpay.sbs"
                      className="flex items-center gap-2 transition-colors hover:text-maritime-gold"
                    >
                      <i className="fas fa-envelope text-maritime-gold"></i>
                      <span>admin@kdpay.sbs</span>
                    </a>
                    <a
                      href="mailto:info@kdpay.sbs"
                      className="flex items-center gap-2 transition-colors hover:text-maritime-gold"
                    >
                      <i className="fas fa-envelope text-maritime-gold"></i>
                      <span>info@kdpay.sbs</span>
                    </a>
                    <a
                      href="mailto:support@kdpay.sbs"
                      className="flex items-center gap-2 transition-colors hover:text-maritime-gold"
                    >
                      <i className="fas fa-envelope text-maritime-gold"></i>
                      <span>support@kdpay.sbs</span>
                    </a>
                  </div>
                  <p className="mt-3 text-xs italic">Legacy: info@kdent.org</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-maritime-gold/30 bg-maritime-gold/5 p-4">
            <p className="text-center text-xs text-maritime-blue-light">
              <strong className="text-maritime-gold">Enterprise-Safe Disclaimer:</strong> Emails
              are used for official communication only. No sensitive financial credentials should be
              shared via email.
            </p>
          </div>

          <div className="mt-8 border-t border-maritime-border pt-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-maritime-blue-light md:text-left">
                © {new Date().getFullYear()} AIScreen / KDPay. Built with <Heart className="inline h-4 w-4 text-maritime-gold" /> using{' '}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'blackgold-kdenterprise')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-maritime-gold transition-colors hover:text-maritime-gold/80"
                >
                  caffeine.ai
                </a>
              </p>
              <p className="text-center text-xs text-maritime-blue-light/70 md:text-right">
                Blackgold Kdenterprise - Maritime Excellence Since 1995
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
