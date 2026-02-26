import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Shield, Activity, Cpu, Globe, Zap, RefreshCw, AlertTriangle, CheckCircle, Server } from 'lucide-react';

type AlertSubtype = 'high_latency' | 'packet_loss' | 'cpu_spike' | 'memory_pressure' | 'none';

interface TrustNode {
  id: string;
  org: string;
  status: 'healthy' | 'alert' | 'degraded';
  alertSubtype: AlertSubtype;
  trustScore: number;
  latency: number;
  cpu: number;
  uptime: number;
  lastHeal: string;
  lastAnomaly: string;
}

interface OrgSummary {
  name: string;
  avgTrust: number;
  nodeCount: number;
  status: 'healthy' | 'degraded';
}

interface ChartPoint {
  time: string;
  uptime: number;
  anomaly: number;
}

const INITIAL_NODES: TrustNode[] = [
  { id: 'IC-Mainnet-1',   org: 'AlphaEdge', status: 'healthy', alertSubtype: 'none',         trustScore: 98, latency: 145, cpu: 32,  uptime: 99.9, lastHeal: '2min ago',  lastAnomaly: 'none' },
  { id: 'IC-Mumbai-Node', org: 'AlphaEdge', status: 'healthy', alertSubtype: 'none',         trustScore: 99, latency: 89,  cpu: 21,  uptime: 100,  lastHeal: '5min ago',  lastAnomaly: 'none' },
  { id: 'BoxAVM-AI',      org: 'BetaCore',  status: 'alert',   alertSubtype: 'high_latency', trustScore: 82, latency: 320, cpu: 78,  uptime: 95.2, lastHeal: '12min ago', lastAnomaly: 'High latency (320ms)' },
  { id: 'NetAI-Edge-01',  org: 'BetaCore',  status: 'healthy', alertSubtype: 'none',         trustScore: 96, latency: 110, cpu: 45,  uptime: 99.5, lastHeal: '8min ago',  lastAnomaly: 'none' },
  { id: 'WebAI-Node-03',  org: 'GammaNet', status: 'alert',   alertSubtype: 'cpu_spike',    trustScore: 76, latency: 421, cpu: 94,  uptime: 94.0, lastHeal: '45min ago', lastAnomaly: 'CPU spike (94%)' },
  { id: 'GammaNet-Core',  org: 'GammaNet', status: 'healthy', alertSubtype: 'none',         trustScore: 95, latency: 130, cpu: 67,  uptime: 99.3, lastHeal: '15min ago', lastAnomaly: 'none' },
];

function generateChartPoint(index: number): ChartPoint {
  return {
    time: `${index * 5}s`,
    uptime: 99 + Math.random() * 1,
    anomaly: Math.random() * 1.5,
  };
}

function computeGlobalTrust(nodes: TrustNode[]): number {
  if (nodes.length === 0) return 0;
  return nodes.reduce((sum, n) => sum + n.trustScore, 0) / nodes.length;
}

function computeOrgSummaries(nodes: TrustNode[]): OrgSummary[] {
  const orgs = ['AlphaEdge', 'BetaCore', 'GammaNet'];
  return orgs.map((org) => {
    const orgNodes = nodes.filter((n) => n.org === org);
    const avgTrust = orgNodes.length
      ? orgNodes.reduce((s, n) => s + n.trustScore, 0) / orgNodes.length
      : 0;
    const hasAlert = orgNodes.some((n) => n.status !== 'healthy');
    return {
      name: org,
      avgTrust,
      nodeCount: orgNodes.length,
      status: hasAlert ? 'degraded' : 'healthy',
    };
  });
}

/** Returns ⚠️ for high latency alerts, 🛑 for packet loss / other alerts, empty string for healthy */
function getAlertIcon(node: TrustNode): string {
  if (node.status !== 'alert') return '';
  return node.alertSubtype === 'high_latency' || node.latency > 300 ? '⚠️' : '🛑';
}

/** Returns Tailwind text-color class based on latency value */
function latencyColorClass(latency: number): string {
  if (latency > 300) return 'text-red-400';
  if (latency >= 100) return 'text-orange-400';
  return 'text-emerald-400';
}

/** Returns Tailwind text-color class based on CPU percentage: green <70%, yellow 70–90%, red >90% */
function cpuColorClass(cpu: number): string {
  if (cpu > 90) return 'text-red-400';
  if (cpu >= 70) return 'text-orange-400';
  return 'text-emerald-400';
}

/** Spinner component using CSS keyframe animation */
function RemediationSpinner() {
  return (
    <span
      className="inline-block"
      style={{ animation: 'kd-spin 1s linear infinite', display: 'inline-block' }}
    >
      ⏳
    </span>
  );
}

export default function KDTrustDashboard() {
  const [nodes, setNodes] = useState<TrustNode[]>(INITIAL_NODES);
  const [chartData, setChartData] = useState<ChartPoint[]>(() =>
    Array.from({ length: 20 }, (_, i) => generateChartPoint(i))
  );
  const [healCount, setHealCount] = useState(3);
  const chartIndexRef = useRef(20);

  // Simulate real-time telemetry updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => {
          if (node.status === 'alert') return node; // keep alert until healed
          if (Math.random() < 0.08) {
            const anomalyTypes: { label: string; subtype: AlertSubtype; latencyBoost: number; cpuBoost: number }[] = [
              { label: 'High latency', subtype: 'high_latency', latencyBoost: 250, cpuBoost: 15 },
              { label: 'Packet loss detected', subtype: 'packet_loss', latencyBoost: 80, cpuBoost: 10 },
              { label: 'CPU spike', subtype: 'cpu_spike', latencyBoost: 120, cpuBoost: 45 },
              { label: 'Memory pressure', subtype: 'memory_pressure', latencyBoost: 60, cpuBoost: 20 },
            ];
            const chosen = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
            const newLatency = Math.round(node.latency + chosen.latencyBoost + Math.floor(Math.random() * 100));
            const newCpu = Math.min(99, Math.round(node.cpu + chosen.cpuBoost + Math.floor(Math.random() * 15)));
            return {
              ...node,
              status: 'alert' as const,
              alertSubtype: chosen.subtype,
              trustScore: Math.max(70, node.trustScore - Math.floor(Math.random() * 18)),
              latency: newLatency,
              cpu: newCpu,
              uptime: Math.max(90, node.uptime - Math.random() * 2),
              lastHeal: new Date().toLocaleTimeString(),
              lastAnomaly: `${chosen.label} (${newLatency}ms)`,
            };
          }
          return {
            ...node,
            status: 'healthy' as const,
            alertSubtype: 'none' as AlertSubtype,
            trustScore: Math.min(100, node.trustScore + Math.random() * 2),
            latency: Math.max(50, Math.round(node.latency - Math.random() * 10)),
            cpu: Math.max(10, Math.round(node.cpu - Math.random() * 3)),
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Update chart every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      chartIndexRef.current += 1;
      setChartData((prev) => {
        const next = [...prev.slice(1), generateChartPoint(chartIndexRef.current)];
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const selfHealNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              status: 'healthy' as const,
              alertSubtype: 'none' as AlertSubtype,
              trustScore: 100,
              latency: 85,
              cpu: 25,
              uptime: 100,
              lastHeal: 'Just now',
              lastAnomaly: 'none',
            }
          : node
      )
    );
    setHealCount((c) => c + 1);
  };

  const simulateNodeFailure = () => {
    const healthyNodes = nodes.filter((n) => n.status === 'healthy');
    if (healthyNodes.length === 0) return;
    const target = healthyNodes[Math.floor(Math.random() * healthyNodes.length)];
    const anomalyTypes: { label: string; subtype: AlertSubtype; latencyBoost: number; cpuBoost: number }[] = [
      { label: 'High latency (420ms)', subtype: 'high_latency', latencyBoost: 280, cpuBoost: 15 },
      { label: 'Packet loss detected', subtype: 'packet_loss', latencyBoost: 80, cpuBoost: 10 },
      { label: 'CPU spike (95%)', subtype: 'cpu_spike', latencyBoost: 120, cpuBoost: 55 },
      { label: 'Memory pressure', subtype: 'memory_pressure', latencyBoost: 60, cpuBoost: 20 },
    ];
    const chosen = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
    const newLatency = Math.round(target.latency + chosen.latencyBoost);
    const newCpu = Math.min(99, Math.round(target.cpu + chosen.cpuBoost));
    setNodes((prev) =>
      prev.map((n) =>
        n.id === target.id
          ? {
              ...n,
              status: 'alert' as const,
              alertSubtype: chosen.subtype,
              trustScore: Math.max(70, n.trustScore - 18),
              latency: newLatency,
              cpu: newCpu,
              uptime: Math.max(90, n.uptime - 2),
              lastAnomaly: `${chosen.label}`,
            }
          : n
      )
    );
    setHealCount((c) => c + 1);
  };

  const globalTrust = computeGlobalTrust(nodes);
  const orgSummaries = computeOrgSummaries(nodes);
  const alertNodes = nodes.filter((n) => n.status !== 'healthy');

  return (
    <>
      {/* Keyframe for spinner animation */}
      <style>{`
        @keyframes kd-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="space-y-6">
        {/* Alert Banner */}
        {alertNodes.length > 0 && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
              <div className="flex-1 space-y-1">
                {alertNodes.map((n) => (
                  <div key={n.id} className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-lg leading-none">{getAlertIcon(n)}</span>
                    <span className="font-semibold text-red-300">{n.id}</span>
                    <span className="text-red-400/80">— {n.lastAnomaly}</span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-600/80 px-2 py-0.5 text-xs font-semibold text-white">
                      Auto-remediating <RemediationSpinner />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Global Trust Score */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-400">
              <Globe className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium">Global Trust Score</span>
            </div>
            <div className="mb-1 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-4xl font-black text-transparent">
              {globalTrust.toFixed(1)}%
            </div>
            <div className="mb-3 text-xs text-gray-500">aggregated from {nodes.length} nodes</div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg transition-all duration-1000"
                style={{ width: `${globalTrust}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>📈 +2.1% (24h)</span>
              <span>🔮 predicted: {(globalTrust + 0.8).toFixed(1)}%</span>
            </div>
          </div>

          {/* ML Prediction */}
          <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-400">
              <Cpu className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium">ML Prediction (BoxAVM)</span>
            </div>
            <div className="flex gap-6">
              <div>
                <div className="text-3xl font-bold text-white">{(globalTrust + 0.8).toFixed(1)}</div>
                <div className="text-xs text-gray-500">next hour forecast</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.4%</div>
                <div className="text-xs text-gray-500">confidence</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              ⏱ NetAI engine · 12ms latency
            </div>
          </div>

          {/* Self-Healing */}
          <div className="rounded-2xl border border-orange-500/30 bg-orange-950/20 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2 text-gray-400">
              <Zap className="h-5 w-5 text-orange-400" />
              <span className="text-sm font-medium">Self-Healing</span>
            </div>
            <div className="text-4xl font-bold text-white">{healCount}</div>
            <div className="mb-3 text-xs text-gray-500">auto-remediations (last 24h)</div>
            {alertNodes.length > 0 ? (
              <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-400">
                {alertNodes.length} active alert{alertNodes.length > 1 ? 's' : ''}
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                All systems nominal
              </span>
            )}
          </div>
        </div>

        {/* Node Cards Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <Server className="h-5 w-5 text-emerald-400" />
              Node Telemetry
              <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-xs font-normal text-gray-400">
                {nodes.length} nodes
              </span>
            </h3>
            <button
              onClick={simulateNodeFailure}
              className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-950/30 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-950/50 hover:text-red-300"
            >
              <Zap className="h-4 w-4" />
              Simulate Node Failure
            </button>
          </div>

          {/* items-stretch ensures all cards in a row share the same height */}
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nodes.map((node) => {
              const alertIcon = getAlertIcon(node);
              // Round latency to nearest integer for clean display
              const latencyMs = Math.round(node.latency);
              const latencyClass = latencyColorClass(node.latency);
              // Round CPU to nearest integer for clean display
              const cpuPct = Math.round(node.cpu);
              const cpuClass = cpuColorClass(node.cpu);

              return (
                <div
                  key={node.id}
                  className={`flex flex-col rounded-2xl border-2 p-5 shadow-lg transition-all duration-500 hover:scale-[1.01] ${
                    node.status === 'healthy'
                      ? 'border-emerald-500/40 bg-emerald-950/20 shadow-emerald-900/20'
                      : node.status === 'alert'
                        ? 'animate-pulse border-red-500/50 bg-red-950/25 shadow-red-900/30'
                        : 'border-yellow-500/40 bg-yellow-950/20 shadow-yellow-900/20'
                  }`}
                >
                  {/* Card Header */}
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-1.5">
                      {alertIcon && (
                        <span className="text-base leading-none" title={node.lastAnomaly}>
                          {alertIcon}
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-white">{node.id}</h4>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        node.status === 'healthy'
                          ? 'bg-emerald-600/30 text-emerald-400'
                          : node.status === 'alert'
                            ? 'bg-red-600/30 text-red-400'
                            : 'bg-yellow-600/30 text-yellow-400'
                      }`}
                    >
                      {node.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="mb-1 text-xs text-gray-500">{node.org}</div>

                  {/* Metrics — flex-1 so the card body fills available height */}
                  <div className="mb-4 flex-1 space-y-2">
                    {/* Trust Score */}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Trust Score</span>
                      <span className="text-lg font-bold text-white">{node.trustScore.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-700 ${
                          node.trustScore >= 90
                            ? 'bg-emerald-500'
                            : node.trustScore >= 75
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${node.trustScore}%` }}
                      />
                    </div>

                    {/* Latency — shown for ALL nodes, integer ms, color-coded */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Latency</span>
                      <span className={`font-semibold ${latencyClass}`}>
                        {latencyMs}ms
                        {latencyMs > 300 && <span className="ml-1 opacity-70">⚠️</span>}
                      </span>
                    </div>

                    {/* CPU — integer %, color-coded green/yellow/red */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">CPU</span>
                      <span className={`font-semibold ${cpuClass}`}>
                        {cpuPct}%
                        {cpuPct > 90 && <span className="ml-1 opacity-70">🔴</span>}
                        {cpuPct >= 70 && cpuPct <= 90 && <span className="ml-1 opacity-70">🟡</span>}
                      </span>
                    </div>

                    {/* Uptime */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Uptime</span>
                      <span className="font-semibold text-gray-300">{node.uptime.toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Auto-remediation indicator — fixed height placeholder keeps layout stable */}
                  <div className="mb-3 min-h-[2rem]">
                    {node.status === 'alert' && (
                      <div className="flex items-center gap-1.5 rounded-lg bg-orange-950/40 px-3 py-1.5 text-xs font-semibold text-orange-400">
                        <RemediationSpinner />
                        <span>Auto-remediating…</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => selfHealNode(node.id)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-bold text-white shadow transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Self-Heal
                    </button>
                    <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400">
                      {node.status === 'healthy' ? (
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Activity className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>

                  <div className="mt-3 border-t border-white/10 pt-2 text-xs text-gray-500">
                    Last heal: {node.lastHeal}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Org Summary */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
            <Shield className="h-5 w-5 text-purple-400" />
            Organisation Summary
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {orgSummaries.map((org) => (
              <div
                key={org.name}
                className={`rounded-2xl border p-4 backdrop-blur-sm ${
                  org.status === 'healthy'
                    ? 'border-emerald-500/30 bg-emerald-950/15'
                    : 'border-yellow-500/30 bg-yellow-950/15'
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-white">{org.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      org.status === 'healthy'
                        ? 'bg-emerald-600/30 text-emerald-400'
                        : 'bg-yellow-600/30 text-yellow-400'
                    }`}
                  >
                    {org.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-2xl font-black text-white">{org.avgTrust.toFixed(1)}%</div>
                <div className="text-xs text-gray-500">{org.nodeCount} node{org.nodeCount !== 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Chart */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <Activity className="h-5 w-5 text-teal-400" />
              Live Telemetry
            </h3>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live · Updates every 3s
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 10 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} domain={[98, 100.5]} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
              <Line type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} dot={false} name="Uptime %" />
              <Line type="monotone" dataKey="anomaly" stroke="#f97316" strokeWidth={1.5} dot={false} name="Anomaly Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
