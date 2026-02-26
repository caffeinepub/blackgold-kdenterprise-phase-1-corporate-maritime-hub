import React from 'react';
import { ExternalLink, Star, MapPin, Monitor, Clock, Target, Layers } from 'lucide-react';
import { AITool } from '../../data/aiTools';

interface KDTrustAIHubProps {
  filteredTools: AITool[];
  favorites: string[];
  onToggleFavorite: (toolName: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Research': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Image': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Copywriting': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'Writing': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'Website': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Video': 'bg-red-500/20 text-red-300 border-red-500/30',
  'Meeting': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'SEO': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Chatbot': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'Presentation': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'Automation': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Prompts': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'UI/UX': 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
  'Design': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'Logo Generator': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Audio': 'bg-lime-500/20 text-lime-300 border-lime-500/30',
  'Productivity': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  'Social Media': 'bg-pink-600/20 text-pink-300 border-pink-600/30',
  'Email': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
  'Spreadsheets': 'bg-green-600/20 text-green-300 border-green-600/30',
  'Knowledge Management': 'bg-purple-600/20 text-purple-300 border-purple-600/30',
  'Meeting Notes / Video': 'bg-orange-600/20 text-orange-300 border-orange-600/30',
  'Data Visualization': 'bg-cyan-600/20 text-cyan-300 border-cyan-600/30',
  'Workflow Automation': 'bg-teal-600/20 text-teal-300 border-teal-600/30',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
}

export default function KDTrustAIHub({ filteredTools, favorites, onToggleFavorite }: KDTrustAIHubProps) {
  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-sm shadow-lg shadow-emerald-900/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          {/* Avatar */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-black text-white shadow-lg shadow-emerald-900/40">
            HK
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h3 className="mb-1 text-xl font-bold text-white">Hemant Kamble</h3>
            <div className="mb-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Monitor className="h-3.5 w-3.5 text-emerald-400" />
                <span>ChatGPT Free (Android)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-3.5 w-3.5 text-emerald-400" />
                <span>~72 weeks account age</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 sm:col-span-2">
                <Target className="h-3.5 w-3.5 text-emerald-400" />
                <span>AI tools, KD Trust integration, Internet Computer power key</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Layers className="h-3.5 w-3.5 text-emerald-400" />
                <span>Full-stack, stepwise, modular</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-400">
                KD Trust Member
              </span>
              <span className="rounded-full border border-teal-500/30 bg-teal-950/40 px-3 py-1 text-xs font-medium text-teal-400">
                KD Platform
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-950/40 px-3 py-1 text-xs font-medium text-blue-400">
                Internet Computer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
          <div className="mb-3 text-4xl">🔍</div>
          <p className="text-lg font-semibold text-white">No tools found</p>
          <p className="mt-1 text-sm text-gray-400">Try adjusting your search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => {
            const isFavorite = favorites.includes(tool.name);
            const categoryColor = getCategoryColor(tool.category);

            return (
              <div
                key={`${tool.name}-${tool.category}`}
                onDoubleClick={() => onToggleFavorite(tool.name)}
                title="Double-click to toggle favorite"
                className={`group relative flex flex-col rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer ${
                  isFavorite
                    ? 'border-amber-500/60 bg-amber-950/20 shadow-amber-900/20 hover:shadow-amber-900/30'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                }`}
              >
                {/* Favorite Star */}
                {isFavorite && (
                  <div className="absolute right-3 top-3">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </div>
                )}

                {/* Tool Name Link */}
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mb-2 flex items-start gap-1.5 pr-6 text-sm font-bold text-white transition-colors hover:text-emerald-400"
                >
                  {tool.name}
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-70" />
                </a>

                {/* Description */}
                <p className="mb-3 flex-1 text-xs leading-relaxed text-gray-400">
                  {tool.description}
                </p>

                {/* Category Badge */}
                <div className="mt-auto">
                  <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${categoryColor}`}>
                    {tool.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Favorites hint */}
      <p className="text-center text-xs text-gray-600">
        💡 Double-click any tool card to add/remove from favorites
      </p>
    </div>
  );
}
