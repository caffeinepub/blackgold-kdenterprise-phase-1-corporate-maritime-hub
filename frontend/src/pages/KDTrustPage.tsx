import React, { useMemo } from 'react';
import { Shield, Brain, LogIn, Star, CheckCircle2 } from 'lucide-react';
import KDTrustDashboard from '../components/KDTrustDashboard';
import KDTrustAIHub from '../components/kd/KDTrustAIHub';
import AIHubFilters from '../components/kd/AIHubFilters';
import { TOOLS_DATABASE } from '../data/aiTools';
import { useKDTrustFavorites } from '../hooks/useKDTrustFavorites';
import { useKDTrustLastSearch } from '../hooks/useKDTrustLastSearch';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';

export default function KDTrustPage() {
  const { favorites, toggleFavorite } = useKDTrustFavorites();
  const { searchTerm, category, setSearchTerm, setCategory } = useKDTrustLastSearch();
  const { identity, login, loginStatus } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const filteredTools = useMemo(() => {
    return TOOLS_DATABASE.filter((tool) => {
      const matchesCategory = category === 'All Categories' || tool.category === category;
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch =
        !lowerSearch ||
        tool.name.toLowerCase().includes(lowerSearch) ||
        tool.description.toLowerCase().includes(lowerSearch);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="container mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/40">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">KD Trust Monitor</h1>
              <p className="text-sm text-gray-400">
                Real-time node telemetry · AI prediction layers · Self-healing automation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-400">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live · Updates every 3s
          </div>
        </div>

        {/* Auth Banner — only shown when not authenticated */}
        {!isAuthenticated && (
          <div className="mb-8 flex flex-col items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <Star className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Save your favourite AI tools across devices
                </p>
                <p className="text-xs text-gray-400">
                  Log in with Internet Identity to sync favourites to your identity. Browsing works without login.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="shrink-0 bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isLoggingIn ? 'Logging in…' : 'Login with Internet Identity'}
            </Button>
          </div>
        )}

        {/* Authenticated indicator */}
        {isAuthenticated && (
          <div className="mb-8 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 px-4 py-2.5 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>
              Favourites are saved to your Internet Identity and sync across devices.
            </span>
          </div>
        )}

        {/* Node Monitoring Dashboard */}
        <KDTrustDashboard />

        {/* Divider */}
        <div className="my-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 px-6 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">KD Trust AI Hub</h2>
              <p className="text-xs text-gray-400">162+ AI tools · Live search · Favorites</p>
            </div>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        </div>

        {/* AI Hub Section */}
        <div className="space-y-6">
          {/* Filters */}
          <AIHubFilters
            searchTerm={searchTerm}
            category={category}
            onSearchChange={setSearchTerm}
            onCategoryChange={setCategory}
            totalCount={TOOLS_DATABASE.length}
            filteredCount={filteredTools.length}
          />

          {/* Tools Grid + Profile Card */}
          <KDTrustAIHub
            filteredTools={filteredTools}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}
