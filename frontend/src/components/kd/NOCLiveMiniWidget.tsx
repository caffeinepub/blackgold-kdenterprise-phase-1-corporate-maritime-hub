import React from 'react';
import { Activity, Cpu, Shield, Zap, Clock } from 'lucide-react';
import { useNOCLiveStatus, NOCStatusValue, NOCLiveStatus } from '../../hooks/useNOCLiveStatus';

const STATUS_COLORS: Record<NOCStatusValue, { bg: string; text: string; glow: string; dot: string }> = {
  ACTIVE: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    glow: 'noc-badge-glow-green',
    dot: 'bg-green-400',
  },
  IDLE: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    glow: 'noc-badge-glow-gray',
    dot: 'bg-gray-400',
  },
  INACTIVE: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    glow: 'noc-badge-glow-red',
    dot: 'bg-red-400',
  },
  READY: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    glow: 'noc-badge-glow-yellow',
    dot: 'bg-yellow-400',
  },
  'NOT READY': {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    glow: 'noc-badge-glow-orange',
    dot: 'bg-orange-400',
  },
};

interface MetricConfig {
  key: keyof NOCLiveStatus;
  label: string;
  icon: React.ReactNode;
}

const METRIC_CONFIGS: MetricConfig[] = [
  { key: 'omniMesh', label: 'Omni-Mesh', icon: <Activity className="h-3.5 w-3.5" /> },
  { key: 'aiSelfHealing', label: 'AI Self-Healing', icon: <Cpu className="h-3.5 w-3.5" /> },
  { key: 'blackHoleMode', label: 'Black Hole Mode', icon: <Shield className="h-3.5 w-3.5" /> },
  { key: 'predictiveFailover', label: 'Predictive Failover', icon: <Zap className="h-3.5 w-3.5" /> },
];

interface StatusBadgeProps {
  value: NOCStatusValue;
}

function StatusBadge({ value }: StatusBadgeProps) {
  const colors = STATUS_COLORS[value];
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold
        ${colors.bg} ${colors.text} ${colors.glow}
        noc-status-transition
      `}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors.dot} noc-dot-pulse`} />
      {value}
    </span>
  );
}

const FALLBACK_DISPLAY: NOCLiveStatus = {
  omniMesh: 'INACTIVE',
  aiSelfHealing: 'IDLE',
  blackHoleMode: 'INACTIVE',
  predictiveFailover: 'NOT READY',
};

export default function NOCLiveMiniWidget() {
  const { data: status, dataUpdatedAt, isError } = useNOCLiveStatus();

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : null;

  const displayStatus: NOCLiveStatus = status ?? FALLBACK_DISPLAY;

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-5 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Live System Status</h3>
            <p className="text-xs text-gray-500">NOC · Real-time · 5s refresh</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/30 px-2.5 py-1 text-xs text-emerald-400">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {METRIC_CONFIGS.map(({ key, label, icon }) => {
          const value = displayStatus[key];
          return (
            <div
              key={key}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2.5"
            >
              <div className="flex items-center gap-2 text-gray-400">
                {icon}
                <span className="text-xs font-medium">{label}</span>
              </div>
              <StatusBadge value={value} />
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        {isError ? (
          <span className="text-xs text-red-400">Connection error — showing last known state</span>
        ) : lastUpdated ? (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="h-3 w-3" />
            <span>Updated {lastUpdated}</span>
          </div>
        ) : (
          <span />
        )}
        <span className="text-xs text-gray-600">Polling every 5s</span>
      </div>
    </div>
  );
}
