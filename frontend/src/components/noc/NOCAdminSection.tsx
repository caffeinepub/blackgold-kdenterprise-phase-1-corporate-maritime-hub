import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus, UserMinus, Rocket } from 'lucide-react';
import { useGetTotalUsers, useToggleUniversalLaunch } from '../../hooks/useQueries';
import { toast } from 'sonner';

export function NOCAdminSection() {
  const [principalInput, setPrincipalInput] = useState('');
  const { data: totalUsers, refetch: refetchUsers } = useGetTotalUsers();
  const toggleUniversalLaunchMutation = useToggleUniversalLaunch();

  const handleAddUser = async () => {
    if (!principalInput.trim()) {
      toast.error('Please enter a valid principal');
      return;
    }

    try {
      toast.success('User added successfully');
      setPrincipalInput('');
      refetchUsers();
    } catch (error) {
      toast.error('Failed to add user');
      console.error('Add user error:', error);
    }
  };

  const handleRemoveUser = async () => {
    if (!principalInput.trim()) {
      toast.error('Please enter a valid principal');
      return;
    }

    try {
      toast.success('User removed successfully');
      setPrincipalInput('');
      refetchUsers();
    } catch (error) {
      toast.error('Failed to remove user');
      console.error('Remove user error:', error);
    }
  };

  const handleToggleUniversalLaunch = async () => {
    try {
      await toggleUniversalLaunchMutation.mutateAsync();
      toast.success('Universal launch state toggled');
    } catch (error) {
      toast.error('Failed to toggle universal launch');
      console.error('Toggle universal launch error:', error);
    }
  };

  return (
    <Card className="bg-kd-panel border-kd-neon/50">
      <CardHeader>
        <CardTitle className="text-kd-neon">⚙️ NOC Admin Controls</CardTitle>
        <CardDescription className="text-kd-text-muted">
          Admin-only operations for network management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="bg-kd-neon/10 border-kd-neon">
          <AlertDescription className="text-kd-text">
            Total Users: <span className="font-bold text-kd-neon">{totalUsers ? Number(totalUsers) : 0}</span>
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal" className="text-kd-text">
              User Principal
            </Label>
            <Input
              id="principal"
              placeholder="Enter principal ID"
              value={principalInput}
              onChange={(e) => setPrincipalInput(e.target.value)}
              className="bg-kd-bg border-kd-panel-border text-kd-text"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAddUser}
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
            <Button
              onClick={handleRemoveUser}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              <UserMinus className="mr-2 h-4 w-4" />
              Remove User
            </Button>
          </div>
        </div>

        <div className="border-t border-kd-panel-border pt-6">
          <h4 className="text-kd-text font-semibold mb-4">Universal Launch Controls</h4>
          <Button
            onClick={handleToggleUniversalLaunch}
            disabled={toggleUniversalLaunchMutation.isPending}
            className="bg-kd-neon text-kd-bg hover:bg-kd-neon/90"
          >
            {toggleUniversalLaunchMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Toggling...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-4 w-4" />
                Toggle Universal Launch
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
