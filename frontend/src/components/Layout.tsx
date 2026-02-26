import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Anchor, ChevronDown, Heart, GraduationCap, Shield, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NOCMiniWidgetSnippet } from './noc/NOCMiniWidgetSnippet';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

type NavItem =
  | { label: string; path: string }
  | { label: string; submenu: Array<{ label: string; path: string }> };

function truncatePrincipal(principal: string): string {
  if (principal.length <= 14) return principal;
  return `${principal.slice(0, 8)}…${principal.slice(-4)}`;
}

export default function Layout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isKDShipPage = currentPath.startsWith('/kd-ship');
  const isKDTrustPage = currentPath.startsWith('/kd-trust');

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
    { label: 'Shipping', path: '/shipping-dashboard' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
    { label: 'KD Platform', path: '/kd-platform' },
    { label: 'KD Ship', path: '/kd-ship' },
    { label: 'KD Trust', path: '/kd-trust' },
  ];

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
      }
    }
  };

  const isCompanyActive = currentPath === '/about' || currentPath === '/crypto-tokens' || currentPath === '/gift-card-system';
  const isKDPlatformActive = currentPath === '/kd-platform' || currentPath === '/kd-platform/dashboard' || currentPath === '/kd-platform/noc';
  const isNOCPage = currentPath === '/kd-platform/noc';

  const principalText = identity ? truncatePrincipal(identity.getPrincipal().toString()) : '';

  return (
    <div className="flex min-h-screen flex-col">
      <header className={`sticky top-0 z-50 w-full border-b ${isKDShipPage ? 'border-kdship-border bg-kdship-navy/95' : isKDTrustPage ? 'border-emerald-900/40 bg-slate-900/95' : 'border-maritime-border bg-maritime-header/95'} backdrop-blur supports-[backdrop-filter]:bg-maritime-header/80`}>
        <div className="container flex h-16 items-center justify-between">
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            {isKDShipPage ? (
              <>
                <GraduationCap className="h-7 w-7 text-kdship-teal" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold leading-tight text-kdship-teal">
                    KD Ship
                  </span>
                  <span className="text-xs text-kdship-text-muted">Maritime Education</span>
                </div>
              </>
            ) : isKDTrustPage ? (
              <>
                <Shield className="h-7 w-7 text-emerald-400" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold leading-tight text-emerald-400">
                    KD Trust
                  </span>
                  <span className="text-xs text-gray-500">Trust Monitoring</span>
                </div>
              </>
            ) : (
              <>
                <Anchor className="h-7 w-7 text-maritime-gold" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold leading-tight text-maritime-gold">
                    Blackgold Kdenterprise
                  </span>
                  <span className="text-xs text-maritime-blue-light">Since 1995</span>
                </div>
              </>
            )}
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
                            : isKDShipPage
                              ? 'text-kdship-text-muted hover:bg-kdship-teal/10 hover:text-kdship-teal'
                              : isKDTrustPage
                                ? 'text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-400'
                                : 'text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold'
                        }
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={isKDShipPage ? 'bg-kdship-navy border-kdship-border' : isKDTrustPage ? 'bg-slate-900 border-emerald-900/40' : 'bg-maritime-header border-maritime-border'}>
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem.path}
                          onClick={() => handleNavigation(subItem.path)}
                          className={isKDShipPage ? 'cursor-pointer text-kdship-text-muted hover:bg-kdship-teal/10 hover:text-kdship-teal' : isKDTrustPage ? 'cursor-pointer text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-400' : 'cursor-pointer text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold'}
                        >
                          {subItem.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              const isActive =
                'path' in item && item.path === '/'
                  ? currentPath === '/'
                  : 'path' in item && item.path === '/kd-platform'
                    ? isKDPlatformActive
                    : 'path' in item && item.path === '/kd-ship'
                      ? isKDShipPage
                      : 'path' in item && item.path === '/kd-trust'
                        ? isKDTrustPage
                        : 'path' in item && currentPath === item.path;

              return (
                <Button
                  key={'path' in item ? item.path : item.label}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => 'path' in item && handleNavigation(item.path)}
                  className={
                    isActive
                      ? isKDShipPage
                        ? 'bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90'
                        : isKDTrustPage
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                          : 'bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90'
                      : isKDShipPage
                        ? 'text-kdship-text-muted hover:bg-kdship-teal/10 hover:text-kdship-teal'
                        : isKDTrustPage
                          ? 'text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-400'
                          : 'text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold'
                  }
                >
                  {item.label}
                </Button>
              );
            })}

            {/* KD Ship auth button */}
            {isKDShipPage && (
              <Button
                variant={isAuthenticated ? 'outline' : 'default'}
                onClick={handleAuth}
                disabled={loginStatus === 'logging-in'}
                className={isAuthenticated ? 'ml-2 border-kdship-border text-kdship-text-muted hover:bg-kdship-teal/10' : 'ml-2 bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90'}
              >
                {loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            )}

            {/* KD Trust auth section */}
            {isKDTrustPage && isAuthenticated && (
              <div className="ml-2 flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 text-xs text-emerald-400">
                  <User className="h-3 w-3" />
                  <span className="font-mono">{principalText}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuth}
                  disabled={loginStatus === 'logging-in'}
                  className="text-gray-400 hover:bg-red-900/20 hover:text-red-400"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </nav>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className={`h-6 w-6 ${isKDShipPage ? 'text-kdship-teal' : isKDTrustPage ? 'text-emerald-400' : 'text-maritime-gold'}`} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={isKDShipPage ? 'bg-kdship-navy border-kdship-border' : isKDTrustPage ? 'bg-slate-900 border-emerald-900/40' : 'bg-maritime-header border-maritime-border'}>
              <nav className="flex flex-col gap-2 pt-8">
                {navItems.map((item) => {
                  if ('submenu' in item && item.submenu) {
                    return (
                      <div key={item.label} className="flex flex-col gap-1">
                        <div className={`px-4 py-2 text-sm font-semibold ${isKDShipPage ? 'text-kdship-teal' : isKDTrustPage ? 'text-emerald-400' : 'text-maritime-gold'}`}>
                          {item.label}
                        </div>
                        {item.submenu.map((subItem) => (
                          <Button
                            key={subItem.path}
                            variant="ghost"
                            onClick={() => handleNavigation(subItem.path)}
                            className={isKDShipPage ? 'justify-start pl-8 text-kdship-text-muted hover:bg-kdship-teal/10 hover:text-kdship-teal' : isKDTrustPage ? 'justify-start pl-8 text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-400' : 'justify-start pl-8 text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold'}
                          >
                            {subItem.label}
                          </Button>
                        ))}
                      </div>
                    );
                  }

                  const isActive =
                    'path' in item && item.path === '/'
                      ? currentPath === '/'
                      : 'path' in item && item.path === '/kd-platform'
                        ? isKDPlatformActive
                        : 'path' in item && item.path === '/kd-ship'
                          ? isKDShipPage
                          : 'path' in item && item.path === '/kd-trust'
                            ? isKDTrustPage
                            : 'path' in item && currentPath === item.path;

                  return (
                    <Button
                      key={'path' in item ? item.path : item.label}
                      variant={isActive ? 'default' : 'ghost'}
                      onClick={() => 'path' in item && handleNavigation(item.path)}
                      className={
                        isActive
                          ? isKDShipPage
                            ? 'justify-start bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90'
                            : isKDTrustPage
                              ? 'justify-start bg-emerald-600 text-white hover:bg-emerald-500'
                              : 'justify-start bg-maritime-gold text-maritime-navy hover:bg-maritime-gold/90'
                          : isKDShipPage
                            ? 'justify-start text-kdship-text-muted hover:bg-kdship-teal/10 hover:text-kdship-teal'
                            : isKDTrustPage
                              ? 'justify-start text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-400'
                              : 'justify-start text-maritime-blue-light hover:bg-maritime-blue/10 hover:text-maritime-gold'
                      }
                    >
                      {item.label}
                    </Button>
                  );
                })}

                {/* KD Ship mobile auth */}
                {isKDShipPage && (
                  <Button
                    variant={isAuthenticated ? 'outline' : 'default'}
                    onClick={handleAuth}
                    disabled={loginStatus === 'logging-in'}
                    className={isAuthenticated ? 'mt-4 border-kdship-border text-kdship-text-muted hover:bg-kdship-teal/10' : 'mt-4 bg-kdship-teal text-kdship-navy hover:bg-kdship-teal/90'}
                  >
                    {loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
                  </Button>
                )}

                {/* KD Trust mobile auth section */}
                {isKDTrustPage && isAuthenticated && (
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-400">
                      <User className="h-3 w-3 shrink-0" />
                      <span className="truncate font-mono">{principalText}</span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={handleAuth}
                      disabled={loginStatus === 'logging-in'}
                      className="justify-start text-gray-400 hover:bg-red-900/20 hover:text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {!isNOCPage && !isKDShipPage && !isKDTrustPage && <NOCMiniWidgetSnippet />}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className={`border-t ${isKDShipPage ? 'border-kdship-border bg-kdship-navy' : isKDTrustPage ? 'border-emerald-900/30 bg-slate-900' : 'border-maritime-border bg-maritime-header'} py-8`}>
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className={`flex items-center gap-2 text-sm ${isKDShipPage ? 'text-kdship-text-muted' : isKDTrustPage ? 'text-gray-500' : 'text-maritime-blue-light'}`}>
              <span>© {new Date().getFullYear()} {isKDShipPage ? 'KD Ship Maritime Education' : isKDTrustPage ? 'KD Trust Monitoring' : 'Blackgold Kdenterprise'}. All rights reserved.</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${isKDShipPage ? 'text-kdship-text-muted' : isKDTrustPage ? 'text-gray-500' : 'text-maritime-blue-light'}`}>
              <span>Built with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'unknown-app'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold underline underline-offset-2 ${isKDShipPage ? 'text-kdship-teal hover:text-kdship-teal/80' : isKDTrustPage ? 'text-emerald-400 hover:text-emerald-300' : 'text-maritime-gold hover:text-maritime-gold/80'}`}
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
