import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTotalUsers, useIsCallerAdmin } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Users, Loader2, LogIn, ShieldAlert } from 'lucide-react';
import AdminAddUserCard from '@/components/kd/AdminAddUserCard';

export default function KDDashboardPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: totalUsers, isLoading: usersLoading, error: usersError } = useTotalUsers(isAuthenticated);

  // Show sign-in prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="kd-platform-wrapper min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="kd-card border-kd-panel-border bg-kd-panel max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl text-kd-text flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-kd-neon" />
              Authentication Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-kd-panel-border bg-kd-bg">
              <AlertDescription className="text-kd-text-muted">
                Please sign in with Internet Identity to access the KD Dashboard and view platform metrics.
              </AlertDescription>
            </Alert>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-kd-neon hover:bg-kd-neon/90 text-kd-bg font-semibold"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in with Internet Identity
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show authorization error if backend call fails
  const showAuthError = usersError && usersError.message.includes('Unauthorized');

  if (showAuthError) {
    return (
      <div className="kd-platform-wrapper min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="kd-card border-kd-panel-border bg-kd-panel max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl text-kd-text flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-destructive" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertDescription className="text-kd-text-muted">
                You do not have permission to access this dashboard. Please contact an administrator for access.
              </AlertDescription>
            </Alert>
            <Button
              onClick={login}
              variant="outline"
              className="w-full border-kd-panel-border text-kd-text hover:bg-kd-panel"
            >
              Try signing in again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="kd-platform-wrapper min-h-[calc(100vh-4rem)]">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-kd-text">Welcome to KD Dashboard</h1>
          <p className="text-kd-text-muted">Monitor your platform metrics and user activity</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="kd-card border-kd-panel-border bg-kd-panel">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-kd-text">Total Users</CardTitle>
              <Users className="h-4 w-4 text-kd-neon" />
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-kd-neon" />
                  <span className="text-2xl font-bold text-kd-text-muted">Loading...</span>
                </div>
              ) : usersError ? (
                <p className="text-2xl font-bold text-destructive">Error loading data</p>
              ) : (
                <div className="text-3xl font-bold text-kd-text">
                  {totalUsers !== undefined ? Number(totalUsers).toLocaleString() : '0'}
                </div>
              )}
              <p className="mt-1 text-xs text-kd-text-muted">Registered platform users</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Section - Only visible to admins */}
        {!isAdminLoading && isAdmin && (
          <div className="mt-8">
            <AdminAddUserCard />
          </div>
        )}

        <div className="mt-8 rounded-lg border border-kd-panel-border bg-kd-panel p-6">
          <h2 className="mb-4 text-xl font-semibold text-kd-text">KD Token Contract</h2>
          <div className="rounded-md bg-kd-bg p-4">
            <code className="text-sm text-kd-neon font-mono">0xYourContractAddressHere</code>
          </div>
          <p className="mt-3 text-xs text-kd-text-muted">
            This is a placeholder for the KD token smart contract address
          </p>
        </div>
      </div>
    </div>
  );
}
