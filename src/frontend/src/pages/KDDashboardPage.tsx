import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useGetTotalUsers, useIsCallerAdmin } from '@/hooks/useQueries';
import AdminAddUserCard from '../components/kd/AdminAddUserCard';

export default function KDDashboardPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;

  const { data: totalUsers, isLoading: usersLoading } = useGetTotalUsers(isAuthenticated);
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-kd-bg flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-kd-panel border-kd-panel-border">
          <CardHeader>
            <CardTitle className="text-kd-text text-2xl">🔐 Access Required</CardTitle>
            <CardDescription className="text-kd-text-muted">
              Please sign in with Internet Identity to access the KD Platform dashboard.
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

  return (
    <div className="min-h-screen bg-kd-bg text-kd-text">
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-kd-neon">KD Platform Dashboard</h1>
            <p className="text-kd-text-muted mt-2">Welcome to your command center</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/kd-platform' })}
            className="border-kd-panel-border text-kd-text hover:bg-kd-panel"
          >
            Back to Landing
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-kd-panel border-kd-panel-border">
            <CardHeader>
              <CardTitle className="text-kd-text">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="flex items-center gap-2 text-kd-text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                <p className="text-4xl font-bold text-kd-neon">
                  {totalUsers ? Number(totalUsers) : 0}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-kd-panel border-kd-panel-border">
            <CardHeader>
              <CardTitle className="text-kd-text">KD Token Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-kd-text-muted font-mono break-all">
                Placeholder for contract address
              </p>
            </CardContent>
          </Card>

          <Card className="bg-kd-panel border-kd-panel-border">
            <CardHeader>
              <CardTitle className="text-kd-text">Network Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-kd-neon font-semibold">Online</p>
            </CardContent>
          </Card>
        </div>

        {!adminLoading && isAdmin && <AdminAddUserCard />}
      </div>
    </div>
  );
}
