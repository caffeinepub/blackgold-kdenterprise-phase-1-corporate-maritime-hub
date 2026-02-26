import React, { useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES, TOOLS_DATABASE } from '../../data/aiTools';

interface AIHubFiltersProps {
  searchTerm: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  totalCount: number;
  filteredCount: number;
}

export default function AIHubFilters({
  searchTerm,
  category,
  onSearchChange,
  onCategoryChange,
  totalCount,
  filteredCount,
}: AIHubFiltersProps) {
  // Compute per-category counts from the full database
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tool of TOOLS_DATABASE) {
      counts[tool.category] = (counts[tool.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search AI tools by name or description..."
            className="w-full rounded-xl border border-white/10 bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        {/* Category Filter */}
        <div className="relative sm:w-72">
          <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-slate-800/60 py-2.5 pl-10 pr-8 text-sm text-white outline-none transition-all focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
          >
            {CATEGORIES.map((cat) => {
              const count = cat === 'All Categories' ? TOOLS_DATABASE.length : (categoryCounts[cat] ?? 0);
              return (
                <option key={cat} value={cat} className="bg-slate-800 text-white">
                  {cat} ({count})
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            ▾
          </div>
        </div>

        {/* Count Badge */}
        <div className="shrink-0 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-center text-sm text-emerald-400">
          <span className="font-bold">{filteredCount}</span>
          <span className="text-emerald-500/70"> / {totalCount} tools</span>
        </div>
      </div>
    </div>
  );
}
