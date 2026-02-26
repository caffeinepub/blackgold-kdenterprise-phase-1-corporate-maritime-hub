import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import type { AIStatus, TreasuryStatus, OmniMeshStatus, DAOProposal } from '../../backend';

interface LiveOperationalDashboardV132Props {
  aiStatus?: AIStatus;
  treasuryStatus?: TreasuryStatus;
  omniMeshStatus?: OmniMeshStatus;
  daoProposals?: DAOProposal[];
  zkRoot?: string;
  cyclesBalance?: bigint;
  universalLaunchState?: boolean;
}

interface NodeState {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  subnet: string;
  status: 'active' | 'warning' | 'offline';
}

interface FlowLine {
  from: string;
  to: string;
  color: string;
}

export function LiveOperationalDashboardV132({
  aiStatus,
  treasuryStatus,
  omniMeshStatus,
  daoProposals,
  zkRoot,
  cyclesBalance,
  universalLaunchState,
}: LiveOperationalDashboardV132Props) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [simulatedTxRate, setSimulatedTxRate] = useState(1247);
  const [simulatedCycleUsage, setSimulatedCycleUsage] = useState(120);

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedTxRate((prev) => prev + Math.floor(Math.random() * 20 - 10));
      setSimulatedCycleUsage((prev) => Math.max(100, prev + Math.floor(Math.random() * 10 - 5)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nodes: NodeState[] = [
    { id: 'frontend', label: 'Frontend', x: 100, y: 110, color: '#3b82f6', subnet: 'NNS-Global', status: 'active' },
    { id: 'main', label: 'main.mo', x: 350, y: 90, color: '#10b981', subnet: 'SG-HFT', status: 'active' },
    { id: 'vault', label: 'vault.mo', x: 350, y: 180, color: '#10b981', subnet: 'SG-HFT', status: 'active' },
    { id: 'ai', label: 'ai.mo', x: 350, y: 270, color: aiStatus?.error ? '#f59e0b' : '#8b5cf6', subnet: 'SG-HFT', status: aiStatus?.error ? 'warning' : 'active' },
    { id: 'dao', label: 'dao.mo', x: 600, y: 90, color: '#a855f7', subnet: 'NYC-Enterprise', status: 'active' },
    { id: 'treasury', label: 'treasury.mo', x: 600, y: 180, color: '#3b82f6', subnet: 'NYC-Enterprise', status: 'active' },
    { id: 'zk', label: 'zk.mo', x: 600, y: 270, color: '#14b8a6', subnet: 'Tokyo-Failover', status: 'active' },
  ];

  const flows: FlowLine[] = [
    { from: 'frontend', to: 'main', color: '#3b82f6' },
    { from: 'main', to: 'vault', color: '#10b981' },
    { from: 'main', to: 'ai', color: '#8b5cf6' },
    { from: 'main', to: 'dao', color: '#a855f7' },
    { from: 'vault', to: 'treasury', color: '#3b82f6' },
    { from: 'ai', to: 'zk', color: '#14b8a6' },
  ];

  const getNodeTooltip = (nodeId: string): string => {
    switch (nodeId) {
      case 'frontend':
        return 'Frontend Layer: Login, dashboards, admin. Subnet: NNS-Global';
      case 'main':
        return 'Main Canister: RBAC & user management. Subnet: SG-HFT';
      case 'vault':
        return 'Vault Canister: Multi-strategy engine. Subnet: SG-HFT';
      case 'ai':
        return `AI Canister: Predictive trading & self-healing. Status: ${aiStatus?.status || 'unknown'}. Subnet: SG-HFT`;
      case 'dao':
        return `DAO Canister: Proposals & voting. Active proposals: ${daoProposals?.length || 0}. Subnet: NYC-Enterprise`;
      case 'treasury':
        return `Treasury Canister: Multi-chain fusion. TVL: $${treasuryStatus ? Number(treasuryStatus.totalValue).toLocaleString() : '0'}. Subnet: NYC-Enterprise`;
      case 'zk':
        return `ZK Canister: Solvency proof. Root: ${zkRoot?.substring(0, 10) || '0x0'}... Subnet: Tokyo-Failover`;
      default:
        return 'Unknown node';
    }
  };

  const getNodePosition = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <Card id="v132-live-dashboard" className="bg-kd-panel border-kd-panel-border shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-kd-neon flex items-center gap-2">
              <Activity className="h-6 w-6" />
              V13.2 Live Operational Dashboard
            </CardTitle>
            <CardDescription className="text-kd-text-muted mt-1">
              Real-time multi-subnet architecture with interactive flow visualization
            </CardDescription>
          </div>
          <Badge className="bg-kd-neon text-kd-bg px-3 py-1">
            <span className="inline-block w-2 h-2 bg-kd-bg rounded-full mr-2 animate-pulse" />
            LIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interactive Architecture Diagram */}
        <div className="bg-kd-bg rounded-lg p-6 border border-kd-panel-border">
          <h3 className="text-sm font-semibold text-kd-text mb-4">Multi-Subnet Architecture</h3>
          <svg viewBox="0 0 750 400" className="w-full h-auto">
            <defs>
              {/* Animated flow gradient */}
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" />
                <animate attributeName="x1" values="-100%;100%" dur="2s" repeatCount="indefinite" />
                <animate attributeName="x2" values="0%;200%" dur="2s" repeatCount="indefinite" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Flow lines with animation */}
            {flows.map((flow, idx) => {
              const from = getNodePosition(flow.from);
              const to = getNodePosition(flow.to);
              return (
                <g key={idx}>
                  <line
                    x1={from.x + 40}
                    y1={from.y + 20}
                    x2={to.x}
                    y2={to.y + 20}
                    stroke={flow.color}
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    className="noc-flow-line"
                  />
                  <line
                    x1={from.x + 40}
                    y1={from.y + 20}
                    x2={to.x}
                    y2={to.y + 20}
                    stroke="url(#flowGradient)"
                    strokeWidth="2"
                    style={{ color: flow.color }}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width="80"
                  height="40"
                  rx="6"
                  fill={node.color}
                  fillOpacity={hoveredNode === node.id ? '0.9' : '0.7'}
                  stroke={node.color}
                  strokeWidth="2"
                  filter={hoveredNode === node.id ? 'url(#glow)' : undefined}
                  className={`transition-all duration-200 ${node.status === 'active' ? 'noc-node-glow' : ''}`}
                />
                <text
                  x={node.x + 40}
                  y={node.y + 25}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                >
                  {node.label}
                </text>

                {/* Status indicator */}
                <circle
                  cx={node.x + 70}
                  cy={node.y + 10}
                  r="3"
                  fill={node.status === 'active' ? '#10b981' : node.status === 'warning' ? '#f59e0b' : '#ef4444'}
                  className={node.status === 'active' ? 'animate-pulse' : ''}
                />

                {/* Tooltip on hover */}
                {hoveredNode === node.id && (
                  <g>
                    <rect
                      x={node.x - 10}
                      y={node.y - 50}
                      width="200"
                      height="40"
                      rx="4"
                      fill="oklch(0.15 0.02 240)"
                      stroke="oklch(0.5 0.15 180)"
                      strokeWidth="1"
                    />
                    <text
                      x={node.x + 90}
                      y={node.y - 35}
                      textAnchor="middle"
                      fill="oklch(0.85 0.05 180)"
                      fontSize="9"
                    >
                      {getNodeTooltip(node.id).split('.')[0]}
                    </text>
                    <text
                      x={node.x + 90}
                      y={node.y - 23}
                      textAnchor="middle"
                      fill="oklch(0.65 0.05 180)"
                      fontSize="8"
                    >
                      {getNodeTooltip(node.id).split('.').slice(1).join('.')}
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* Subnet labels */}
            <text x="100" y="30" fill="oklch(0.65 0.05 180)" fontSize="10" fontWeight="600">
              NNS-Global
            </text>
            <text x="350" y="30" fill="oklch(0.65 0.05 180)" fontSize="10" fontWeight="600">
              SG-HFT
            </text>
            <text x="600" y="30" fill="oklch(0.65 0.05 180)" fontSize="10" fontWeight="600">
              NYC-Enterprise
            </text>
            <text x="600" y="360" fill="oklch(0.65 0.05 180)" fontSize="10" fontWeight="600">
              Tokyo-Failover
            </text>
          </svg>
        </div>

        {/* Live Metrics Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-kd-bg rounded-lg p-4 border border-kd-panel-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-kd-text-muted">Total Value Locked</span>
              {treasuryStatus ? (
                <Badge variant="outline" className="text-[9px] border-success text-success">
                  Real
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[9px] border-kd-neon/30 text-kd-text-muted">
                  Simulated
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-kd-neon">
              ${treasuryStatus ? Number(treasuryStatus.totalValue).toLocaleString() : '12,500,000'}
            </p>
          </div>

          <div className="bg-kd-bg rounded-lg p-4 border border-kd-panel-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-kd-text-muted">Transactions/sec</span>
              <Badge variant="outline" className="text-[9px] border-kd-neon/30 text-kd-text-muted">
                Simulated
              </Badge>
            </div>
            <p className="text-2xl font-bold text-kd-text">{simulatedTxRate}</p>
          </div>

          <div className="bg-kd-bg rounded-lg p-4 border border-kd-panel-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-kd-text-muted">Cycles Balance</span>
              {cyclesBalance ? (
                <Badge variant="outline" className="text-[9px] border-success text-success">
                  Real
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[9px] border-kd-neon/30 text-kd-text-muted">
                  Simulated
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-kd-text">
              {cyclesBalance ? `${Number(cyclesBalance) / 1e12}T` : `${simulatedCycleUsage}T`}
            </p>
          </div>

          <div className="bg-kd-bg rounded-lg p-4 border border-kd-panel-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-kd-text-muted">Active Nodes</span>
              {omniMeshStatus ? (
                <Badge variant="outline" className="text-[9px] border-success text-success">
                  Real
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[9px] border-kd-neon/30 text-kd-text-muted">
                  Simulated
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-kd-text">
              {omniMeshStatus ? Number(omniMeshStatus.nodes) : 7}
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-kd-bg rounded-lg p-4 border border-kd-panel-border">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${aiStatus?.error ? 'bg-warning/20' : 'bg-success/20'}`}>
                {aiStatus?.error ? (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
              </div>
              <div>
                <p className="text-xs text-kd-text-muted">AI Self-Healing</p>
                <p className="text-sm font-semibold text-kd-text">
                  {aiStatus?.status || 'Monitoring'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-kd-bg rounded-lg p-4 border border-kd-panel-border">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${omniMeshStatus?.active ? 'bg-success/20' : 'bg-warning/20'} noc-predictive-failover-pulse`}>
                <Zap className={`h-5 w-5 ${omniMeshStatus?.active ? 'text-success' : 'text-warning'}`} />
              </div>
              <div>
                <p className="text-xs text-kd-text-muted">Predictive Failover</p>
                <p className="text-sm font-semibold text-kd-text">
                  {omniMeshStatus?.active ? 'Ready' : 'Standby'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-kd-bg rounded-lg p-4 border border-kd-panel-border">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${universalLaunchState ? 'bg-destructive/20' : 'bg-muted/20'}`}>
                <Activity className={`h-5 w-5 ${universalLaunchState ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <p className="text-xs text-kd-text-muted">Black Hole Mode</p>
                <p className="text-sm font-semibold text-kd-text">
                  {universalLaunchState ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
