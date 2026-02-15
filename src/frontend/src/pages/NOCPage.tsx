import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Activity, DollarSign, Vote, Shield, Network, Rocket, AlertCircle } from 'lucide-react';
import {
  useGetAIStatus,
  useGetTreasuryStatus,
  useGetDaoProposals,
  useVoteOnProposal,
  useGetZkCurrentRoot,
  useGenerateZkSolvencyProof,
  useGetOmniMeshStatus,
  useGetUniversalLaunchState,
  useIsCallerAdmin,
} from '../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NOCAdminSection } from '../components/noc/NOCAdminSection';
import { UniversalLaunchOverlay } from '../components/noc/UniversalLaunchOverlay';
import { ComplianceShield } from '../components/noc/ComplianceShield';
import { InstitutionalConsole } from '../components/noc/InstitutionalConsole';

export default function NOCPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;

  const { data: aiStatus, isLoading: aiLoading } = useGetAIStatus();
  const { data: treasuryStatus, isLoading: treasuryLoading } = useGetTreasuryStatus();
  const { data: daoProposals, isLoading: proposalsLoading } = useGetDaoProposals();
  const { data: zkRoot, isLoading: zkLoading } = useGetZkCurrentRoot();
  const { data: omniMeshStatus, isLoading: omniLoading } = useGetOmniMeshStatus();
  const { data: universalLaunchState, isLoading: launchLoading } = useGetUniversalLaunchState();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  const voteOnProposalMutation = useVoteOnProposal();
  const generateZkProofMutation = useGenerateZkSolvencyProof();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-kd-bg flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-kd-panel border-kd-panel-border">
          <CardHeader>
            <CardTitle className="text-kd-text text-2xl">🔐 NOC Access Required</CardTitle>
            <CardDescription className="text-kd-text-muted">
              Please sign in with Internet Identity to access the KD Platform Network Operations Center.
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

  const handleVote = async (proposalId: string, support: boolean) => {
    try {
      await voteOnProposalMutation.mutateAsync({ proposalId, support });
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  const handleGenerateZkProof = async () => {
    try {
      await generateZkProofMutation.mutateAsync();
    } catch (error) {
      console.error('ZK proof generation failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-kd-bg text-kd-text">
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-kd-neon">KD.WebAI NOC v13.0</h1>
            <p className="text-kd-text-muted mt-2">Network Operations Center - Singularity Protocol</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/kd-platform/dashboard' })}
            className="border-kd-panel-border text-kd-text hover:bg-kd-panel"
          >
            Back to Dashboard
          </Button>
        </div>

        {universalLaunchState && <UniversalLaunchOverlay />}

        <ComplianceShield />

        <InstitutionalConsole />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-kd-panel border-kd-panel-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kd-text">
                <Activity className="h-5 w-5 text-kd-neon" />
                AI Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiLoading ? (
                <div className="flex items-center gap-2 text-kd-text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : aiStatus ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-kd-text-muted">Status:</span>
                    <Badge className="bg-kd-neon text-kd-bg">{aiStatus.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-kd-text-muted">Task:</span>
                    <span className="text-kd-text text-sm">{aiStatus.currentTask}</span>
                  </div>
                  {aiStatus.error && (
                    <Alert className="bg-destructive/10 border-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{aiStatus.error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              ) : (
                <p className="text-kd-text-muted">No data available</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-kd-panel border-kd-panel-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kd-text">
                <DollarSign className="h-5 w-5 text-kd-neon" />
                Treasury Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {treasuryLoading ? (
                <div className="flex items-center gap-2 text-kd-text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : treasuryStatus ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-kd-text-muted">Total Value:</span>
                    <span className="text-kd-neon font-bold">${Number(treasuryStatus.totalValue).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-kd-text-muted">Liquidity:</span>
                    <span className="text-kd-text">{treasuryStatus.liquidity.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-kd-text-muted">Reserves:</span>
                    <span className="text-kd-text">${Number(treasuryStatus.reserves).toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <p className="text-kd-text-muted">No data available</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-kd-panel border-kd-panel-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-kd-text">
                <Network className="h-5 w-5 text-kd-neon" />
                Omni-Mesh Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {omniLoading ? (
                <div className="flex items-center gap-2 text-kd-text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : omniMeshStatus ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-kd-text-muted">Status:</span>
                    <Badge className={omniMeshStatus.active ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}>
                      {omniMeshStatus.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-kd-text-muted">Nodes:</span>
                    <span className="text-kd-text">{Number(omniMeshStatus.nodes)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-kd-text-muted">Active:</span>
                    <span className="text-kd-text">{omniMeshStatus.active ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-kd-text-muted">No data available</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-kd-panel border-kd-panel-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-kd-text">
              <Vote className="h-5 w-5 text-kd-neon" />
              DAO Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {proposalsLoading ? (
              <div className="flex items-center gap-2 text-kd-text-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading proposals...
              </div>
            ) : daoProposals && daoProposals.length > 0 ? (
              <div className="space-y-4">
                {daoProposals.map((proposal) => (
                  <div key={proposal.id} className="border border-kd-panel-border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-kd-text">{proposal.title}</h4>
                        <p className="text-sm text-kd-text-muted mt-1">{proposal.description}</p>
                      </div>
                      <Badge className="bg-kd-neon text-kd-bg">{proposal.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-kd-text-muted">
                        For: <span className="text-success font-semibold">{Number(proposal.votesFor)}</span>
                      </span>
                      <span className="text-kd-text-muted">
                        Against: <span className="text-destructive font-semibold">{Number(proposal.votesAgainst)}</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleVote(proposal.id, true)}
                        disabled={voteOnProposalMutation.isPending}
                        className="bg-success hover:bg-success/90 text-success-foreground"
                      >
                        Vote For
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVote(proposal.id, false)}
                        disabled={voteOnProposalMutation.isPending}
                        className="border-destructive text-destructive hover:bg-destructive/10"
                      >
                        Vote Against
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-kd-text-muted">No active proposals</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-kd-panel border-kd-panel-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-kd-text">
              <Shield className="h-5 w-5 text-kd-neon" />
              ZK Solvency Proof
            </CardTitle>
          </CardHeader>
          <CardContent>
            {zkLoading ? (
              <div className="flex items-center gap-2 text-kd-text-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-kd-text-muted text-sm">Current Root:</span>
                  <p className="font-mono text-xs text-kd-text mt-1 break-all bg-kd-bg p-2 rounded">
                    {zkRoot || 'No root available'}
                  </p>
                </div>
                <Button
                  onClick={handleGenerateZkProof}
                  disabled={generateZkProofMutation.isPending}
                  className="bg-kd-neon text-kd-bg hover:bg-kd-neon/90"
                >
                  {generateZkProofMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Solvency Proof'
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {!adminLoading && isAdmin && <NOCAdminSection />}
      </div>
    </div>
  );
}
