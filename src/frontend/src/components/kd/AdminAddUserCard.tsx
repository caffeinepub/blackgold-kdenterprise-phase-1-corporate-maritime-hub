import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAddUser } from '@/hooks/useQueries';
import { UserPlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminAddUserCard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const addUserMutation = useAddUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      return;
    }

    try {
      await addUserMutation.mutateAsync({ name: name.trim(), email: email.trim() });
      setShowSuccess(true);
      setName('');
      setEmail('');
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <Card className="kd-card border-kd-panel-border bg-kd-panel">
      <CardHeader>
        <CardTitle className="text-xl text-kd-text flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-kd-neon" />
          Admin: Add User
        </CardTitle>
        <CardDescription className="text-kd-text-muted">
          Add a new user to the KD Platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-kd-text">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={addUserMutation.isPending}
              className="bg-kd-bg border-kd-panel-border text-kd-text placeholder:text-kd-text-muted focus:border-kd-neon"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-kd-text">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={addUserMutation.isPending}
              className="bg-kd-bg border-kd-panel-border text-kd-text placeholder:text-kd-text-muted focus:border-kd-neon"
            />
          </div>

          {showSuccess && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-500">
                User added successfully! Total users count has been updated.
              </AlertDescription>
            </Alert>
          )}

          {addUserMutation.isError && (
            <Alert className="border-destructive/50 bg-destructive/10">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                Failed to add user. {addUserMutation.error?.message || 'Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={addUserMutation.isPending || !name.trim() || !email.trim()}
            className="w-full bg-kd-neon hover:bg-kd-neon/90 text-kd-bg font-semibold"
          >
            {addUserMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding User...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
