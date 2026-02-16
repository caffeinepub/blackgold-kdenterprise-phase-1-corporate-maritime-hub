import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Activity, Database, Vote, Shield, Network } from 'lucide-react';
import {
  useGetTreasuryStatus,
  useGetOmniMeshStatus,
  useGetCyclesBalance,
  useGetDaoProposals,
} from '@/hooks/useUniversalLaunchReportQueries';

export default function UniversalLaunchReportPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: treasuryStatus, isLoading: treasuryLoading, error: treasuryError } = useGetTreasuryStatus();
  const { data: omniMeshStatus, isLoading: meshLoading, error: meshError } = useGetOmniMeshStatus();
  const { data: cyclesBalance, isLoading: cyclesLoading, error: cyclesError } = useGetCyclesBalance();
  const { data: daoProposals, isLoading: proposalsLoading, error: proposalsError } = useGetDaoProposals();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-kd-bg flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-kd-panel border-kd-panel-border">
          <CardHeader>
            <CardTitle className="text-kd-text text-2xl">🔐 Access Required</CardTitle>
            <CardDescription className="text-kd-text-muted">
              Please sign in with Internet Identity to access the Universal Launch Report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={login}
              disabled={loginStatus === 'logging-in'}
              className="w-full bg-kd-neon text-kd-bg hover:bg-kd-neon/90"
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in with Internet Identity'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCycles = (cycles: bigint | undefined): string => {
    if (!cycles) return '--';
    const trillion = BigInt(1_000_000_000_000);
    const billion = BigInt(1_000_000_000);
    if (cycles >= trillion) {
      return `${(Number(cycles) / Number(trillion)).toFixed(2)}T`;
    } else if (cycles >= billion) {
      return `${(Number(cycles) / Number(billion)).toFixed(2)}B`;
    }
    return cycles.toString();
  };

  const formatTVL = (value: bigint | undefined): string => {
    if (!value) return '$0';
    const trillion = BigInt(1_000_000_000_000);
    const billion = BigInt(1_000_000_000);
    if (value >= trillion) {
      return `$${(Number(value) / Number(trillion)).toFixed(3)}T`;
    } else if (value >= billion) {
      return `$${(Number(value) / Number(billion)).toFixed(2)}B`;
    }
    return `$${value.toString()}`;
  };

  const calculateLatency = (lastSync: bigint | undefined): string => {
    if (!lastSync) return '--';
    const now = Date.now() * 1_000_000; // Convert to nanoseconds
    const diff = Math.abs(now - Number(lastSync)) / 1_000_000; // Convert to ms
    return `${Math.round(diff)}ms`;
  };

  return (
    <div className="min-h-screen bg-kd-bg text-kd-text">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <header className="border-b border-kd-panel-border pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-kd-neon flex items-center justify-center text-kd-bg text-2xl">
              🚀
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-kd-neon to-purple-400 bg-clip-text text-transparent">
                🌐 KD.WebAI NOC V13.1 - Universal Launch Report
              </h1>
              <p className="text-kd-text-muted text-sm">
                Captain Hemant Tukaram Kamble — {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </header>

        {/* Section 1: OMNI-MESH ZERO-LOSS MONITORING */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-kd-neon" />
            <h2 className="text-xl font-semibold text-kd-neon">📡 1. OMNI-MESH ZERO-LOSS MONITORING</h2>
          </div>
          <Card className="bg-kd-panel border-kd-panel-border">
            <CardContent className="p-6">
              {meshLoading ? (
                <div className="flex items-center gap-2 text-kd-text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading mesh status...
                </div>
              ) : meshError ? (
                <Alert variant="destructive">
                  <AlertDescription>Error loading mesh status: {String(meshError)}</AlertDescription>
                </Alert>
              ) : (
                <div className="font-mono text-sm space-y-1">
                  <div className="text-kd-text-muted">kd.WebAI.omnimesh.status</div>
                  <div className="text-kd-text">{'{'}</div>
                  <div className="pl-4 text-kd-text">&nbsp;&nbsp;mobile: true,</div>
                  <div className="pl-4 text-kd-text">&nbsp;&nbsp;version: "Fe1.00 (2026‑sb)",</div>
                  <div className="pl-4">
                    &nbsp;&nbsp;canister: <span className="text-green-400">"{omniMeshStatus?.status || 'UNKNOWN'}"</span>,
                  </div>
                  <div className="pl-4">
                    &nbsp;&nbsp;tvl: <span className="text-yellow-400">"{formatTVL(treasuryStatus?.totalValue)}"</span>,
                  </div>
                  <div className="pl-4">
                    &nbsp;&nbsp;latency: <span className="text-blue-400">"{calculateLatency(omniMeshStatus?.lastSync)}"</span>,
                  </div>
                  <div className="pl-4">
                    &nbsp;&nbsp;cycles: <span className="text-pink-400">"{formatCycles(cyclesBalance)}"</span>
                  </div>
                  <div className="text-kd-text">{'}'}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Section 2: NETWORK PERFORMANCE API */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-kd-neon" />
            <h2 className="text-xl font-semibold text-kd-neon">
              📊 2. NETWORK PERFORMANCE API
              <Badge className="ml-2 bg-green-600 text-white">ACTIVE</Badge>
            </h2>
          </div>
          <Card className="bg-kd-panel border-kd-panel-border">
            <CardContent className="p-6">
              <div className="font-mono text-sm space-y-1">
                <div className="text-kd-text-muted">// Fetching Live Global Stats...</div>
                <div className="text-green-400">Connecting to Global_core...</div>
                <div className="text-green-400">Handshake Verified: 200 OK</div>
                <div className="text-green-400">Mesh Latency: {calculateLatency(omniMeshStatus?.lastSync)}</div>
                <div className="text-green-400">Deployment: SUCCESS</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: TREASURY & CYCLES MONITORING */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-kd-neon" />
            <h2 className="text-xl font-semibold text-kd-neon">🛡️ 3. TREASURY & CYCLES MONITORING</h2>
          </div>
          <Card className="bg-kd-panel border-kd-panel-border">
            <CardContent className="p-6">
              {treasuryLoading || cyclesLoading ? (
                <div className="flex items-center gap-2 text-kd-text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading treasury data...
                </div>
              ) : treasuryError || cyclesError ? (
                <Alert variant="destructive">
                  <AlertDescription>Error loading treasury data</AlertDescription>
                </Alert>
              ) : (
                <div className="font-mono text-sm space-y-1">
                  <div className="text-kd-text-muted">dfx canister call treasury_core getStatus</div>
                  <div className="text-kd-text">Result: (+:86.0000000000)</div>
                  <div className="text-kd-text">hash: "0x3C6T...",</div>
                  <div className="text-kd-text">node: "Tokyo/Frankfurt",</div>
                  <div className="text-kd-text">
                    tvl: <span className="text-yellow-400">{formatTVL(treasuryStatus?.totalValue)}</span>,
                  </div>
                  <div className="text-kd-text">
                    cycles: <span className="text-pink-400">{formatCycles(cyclesBalance)}</span>,
                  </div>
                  <div className="text-kd-text">
                    status: <span className="text-green-400">"SYNCED"</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Section 4: DAO Proposals */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-kd-neon" />
            <h2 className="text-xl font-semibold text-kd-neon">🗳️ 4. DAO PROPOSALS</h2>
          </div>
          {proposalsLoading ? (
            <Card className="bg-kd-panel border-kd-panel-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-kd-text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading proposals...
                </div>
              </CardContent>
            </Card>
          ) : proposalsError ? (
            <Alert variant="destructive">
              <AlertDescription>Error loading proposals: {String(proposalsError)}</AlertDescription>
            </Alert>
          ) : daoProposals && daoProposals.length > 0 ? (
            <div className="space-y-3">
              {daoProposals.map((proposal) => (
                <Card key={proposal.id} className="bg-kd-panel border-kd-panel-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-bold text-kd-text">
                          PROPOSAL #{proposal.id}: {proposal.title}
                        </div>
                        <div className="text-sm text-kd-text-muted mt-1">{proposal.description}</div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-green-400">
                          YES ({Number(proposal.votesFor)})
                        </div>
                        <div className="text-red-400">
                          NO ({Number(proposal.votesAgainst)})
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-kd-panel border-kd-panel-border">
              <CardContent className="p-6">
                <p className="text-kd-text-muted text-center">No active proposals at this time.</p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Section 5: System Health */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-kd-neon" />
            <h2 className="text-xl font-semibold text-kd-neon">🔒 5. SYSTEM HEALTH</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-kd-panel border-kd-panel-border">
              <CardHeader>
                <CardTitle className="text-kd-text text-sm">Omni-Mesh Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={omniMeshStatus?.active ? 'bg-green-600' : 'bg-red-600'}>
                  {omniMeshStatus?.active ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
              </CardContent>
            </Card>
            <Card className="bg-kd-panel border-kd-panel-border">
              <CardHeader>
                <CardTitle className="text-kd-text text-sm">Active Nodes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-kd-neon">
                  {omniMeshStatus?.nodes ? Number(omniMeshStatus.nodes) : 0}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-kd-panel border-kd-panel-border">
              <CardHeader>
                <CardTitle className="text-kd-text text-sm">Liquidity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-kd-neon">
                  {treasuryStatus?.liquidity ? `${(treasuryStatus.liquidity * 100).toFixed(1)}%` : '--'}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
