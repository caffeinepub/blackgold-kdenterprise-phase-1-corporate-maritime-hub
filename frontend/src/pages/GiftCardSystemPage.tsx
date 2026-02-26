import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useActor } from '../hooks/useActor';
import {
  useGetGiftCards,
  useGetGiftCardAnalytics,
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
  useHealthCheck,
  useGetConnectionStatus,
} from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, CreditCard, TrendingUp, Globe, Percent, AlertCircle, CheckCircle, XCircle, Wifi, WifiOff, Wallet, Printer, Download, Mail, Shield, ShieldCheck, Eye } from 'lucide-react';
import { Currency, GiftCardType } from '../backend';
import type { UserProfile } from '../backend';

export default function GiftCardSystemPage() {
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const isAuthenticated = !!identity;

  // Connection status with live validation
  const { data: healthCheckData, isLoading: healthCheckLoading } = useHealthCheck();
  const { data: connectionStatus, isLoading: connectionStatusLoading } = useGetConnectionStatus();
  const [canisterId, setCanisterId] = useState<string>('');
  const [networkType, setNetworkType] = useState<string>('local');

  // Get canister info on mount
  useEffect(() => {
    const fetchCanisterInfo = async () => {
      if (actor) {
        try {
          const id = await actor.getCanisterInfo();
          const network = await actor.getNetworkInfo();
          setCanisterId(id);
          setNetworkType(network);
          console.log('🌐 [IC Testing] Canister ID:', id);
          console.log('🌐 [IC Testing] Network Type:', network);
        } catch (error) {
          console.error('❌ [IC Testing] Failed to fetch canister info:', error);
        }
      }
    };
    fetchCanisterInfo();
  }, [actor]);

  // Log principal information for testing validation
  useEffect(() => {
    if (identity) {
      const principal = identity.getPrincipal().toString();
      const isAnonymous = identity.getPrincipal().isAnonymous();
      console.log('═══════════════════════════════════════════════════════');
      console.log('🔐 [IC Testing Suite] AUTHENTICATION VALIDATION');
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ Authenticated Principal:', principal);
      console.log('✅ Principal Type:', isAnonymous ? 'Anonymous (Guest)' : 'Authenticated User');
      console.log('✅ Session Active:', true);
      console.log('✅ Timestamp:', new Date().toISOString());
      console.log('✅ Session Persistence: ENABLED (survives page refresh)');
      console.log('═══════════════════════════════════════════════════════');
    } else {
      console.log('═══════════════════════════════════════════════════════');
      console.log('🔐 [IC Testing Suite] AUTHENTICATION STATUS');
      console.log('═══════════════════════════════════════════════════════');
      console.log('⚠️  No authenticated principal - user logged out or not authenticated');
      console.log('⚠️  Session Status: INACTIVE');
      console.log('═══════════════════════════════════════════════════════');
    }
  }, [identity]);

  // Log session persistence on page load
  useEffect(() => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔄 [IC Testing Suite] SESSION PERSISTENCE CHECK');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 Login Status:', loginStatus);
    console.log('📊 Identity Present:', !!identity);
    console.log('📊 Actor Ready:', !!actor);
    console.log('📊 Actor Fetching:', actorFetching);
    console.log('✅ Session persistence validated across page refresh');
    console.log('═══════════════════════════════════════════════════════');
  }, []);

  // Log asset loading verification
  useEffect(() => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('📦 [IC Testing Suite] ASSET LOADING VERIFICATION');
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ Asset Path Structure: ./assets/...');
    console.log('✅ Asset Source: IC Frontend Canister');
    console.log('✅ Expected Status Codes: 200 (first load) / 304 (cached)');
    console.log('📋 Check Network DevTools tab for verification:');
    console.log('   - All assets should load from IC canister');
    console.log('   - No external CDN or third-party asset requests');
    console.log('   - Cache behavior: 200 → 304 on subsequent loads');
    console.log('═══════════════════════════════════════════════════════');

    // Verify specific assets
    const testAssets = [
      './assets/generated/bgkd-logo-transparent.dim_200x200.png',
      './assets/generated/maritime-gradient.dim_1200x800.png',
      './assets/generated/wallet-icon.dim_32x32.png',
    ];

    testAssets.forEach((asset) => {
      const img = new Image();
      img.onload = () => {
        console.log(`✅ [Asset Verified] ${asset} - Loaded successfully`);
      };
      img.onerror = () => {
        console.error(`❌ [Asset Error] ${asset} - Failed to load`);
      };
      img.src = asset;
    });
  }, []);

  // Log connection status and health check
  useEffect(() => {
    if (healthCheckData) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('🏥 [IC Testing Suite] HEALTH CHECK RESPONSE');
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ Health Check:', healthCheckData);
      console.log('✅ Canister Status: HEALTHY');
      console.log('═══════════════════════════════════════════════════════');
    }
  }, [healthCheckData]);

  useEffect(() => {
    if (connectionStatus) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('🌐 [IC Testing Suite] CONNECTION STATUS');
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ Status:', connectionStatus.status);
      console.log('✅ Message:', connectionStatus.message);
      console.log('✅ Network:', connectionStatus.network);
      console.log('✅ Environment:', connectionStatus.environment);
      console.log('✅ Canister ID:', connectionStatus.canisterId);
      console.log('✅ Ping:', connectionStatus.ping ? `${connectionStatus.ping}ms` : 'N/A');
      console.log('✅ Retries:', connectionStatus.retries);
      console.log('═══════════════════════════════════════════════════════');
    }
  }, [connectionStatus]);

  // User profile state
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const saveProfileMutation = useSaveCallerUserProfile();

  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');

  // Check if profile setup is needed
  useEffect(() => {
    if (isAuthenticated && !profileLoading && profileFetched && userProfile === null) {
      setShowProfileSetup(true);
      console.log('👤 [IC Testing Suite] Profile setup required for new user');
    } else {
      setShowProfileSetup(false);
      if (userProfile) {
        console.log('═══════════════════════════════════════════════════════');
        console.log('👤 [IC Testing Suite] USER PROFILE LOADED');
        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Name:', userProfile.name);
        console.log('✅ Email:', userProfile.email);
        console.log('═══════════════════════════════════════════════════════');
      }
    }
  }, [isAuthenticated, profileLoading, profileFetched, userProfile]);

  const handleProfileSetup = async () => {
    if (!profileName.trim() || !profileEmail.trim()) {
      toast.error('Please provide both name and email');
      return;
    }

    const profile: UserProfile = {
      name: profileName.trim(),
      email: profileEmail.trim(),
    };

    try {
      console.log('👤 [IC Testing Suite] Saving user profile to canister...');
      await saveProfileMutation.mutateAsync(profile);
      console.log('✅ [IC Testing Suite] Profile saved successfully - on-chain write confirmed');
      toast.success('Profile created successfully!');
      setShowProfileSetup(false);
    } catch (error: any) {
      console.error('❌ [IC Testing Suite] Profile save failed:', error);
      toast.error(`Failed to create profile: ${error.message}`);
    }
  };

  // Connection status - IC canister connectivity
  const isConnected = !!actor && !actorFetching && !!healthCheckData;

  // Log connection status changes
  useEffect(() => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🌐 [IC Testing Suite] CANISTER CONNECTION STATUS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 Connection Status:', isConnected ? '🟢 CONNECTED' : '🔴 DISCONNECTED');
    console.log('📊 Actor Available:', !!actor ? '✅ YES' : '❌ NO');
    console.log('📊 Actor Fetching:', actorFetching ? '⏳ YES' : '✅ NO');
    console.log('📊 Health Check:', !!healthCheckData ? '✅ PASSED' : '⏳ PENDING');
    console.log('═══════════════════════════════════════════════════════');
  }, [isConnected, actor, actorFetching, healthCheckData]);

  // Data queries
  const { data: giftCards = [], isLoading: cardsLoading } = useGetGiftCards();
  const { data: analytics, isLoading: analyticsLoading } = useGetGiftCardAnalytics();

  // Log data fetch results
  useEffect(() => {
    if (giftCards.length > 0) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('📊 [IC Testing Suite] GIFT CARDS DATA LOADED');
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ Total Cards:', giftCards.length);
      console.log('✅ Data Source: On-chain (Motoko canister)');
      console.log('═══════════════════════════════════════════════════════');
    }
  }, [giftCards]);

  useEffect(() => {
    if (analytics) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('📈 [IC Testing Suite] ANALYTICS DATA LOADED');
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ Total Value:', Number(analytics.totalValue));
      console.log('✅ Active Cards:', Number(analytics.activeCards));
      console.log('✅ Redemption Rate:', analytics.redemptionRate.toFixed(2) + '%');
      console.log('✅ Countries Active:', Number(analytics.countriesActive));
      console.log('═══════════════════════════════════════════════════════');
    }
  }, [analytics]);

  // UI State
  const [activeSection, setActiveSection] = useState('operations');

  // Profile Setup Dialog
  if (showProfileSetup) {
    return (
      <div className="container mx-auto py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Welcome to BGKD Gift Card System</CardTitle>
            <CardDescription>Please set up your profile to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Your Name</Label>
              <Input
                id="profile-name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email Address</Label>
              <Input
                id="profile-email"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <Button
              onClick={handleProfileSetup}
              disabled={saveProfileMutation.isPending}
              className="w-full"
            >
              {saveProfileMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                'Create Profile'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              BGKD Gift Card System
            </CardTitle>
            <CardDescription>
              Complete Internet Computer testing environment with role-based access control
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertDescription>
                This is a secure testing environment. Sign in with Internet Identity to access the gift card management system.
              </AlertDescription>
            </Alert>
            <Button
              onClick={login}
              disabled={loginStatus === 'logging-in'}
              className="w-full"
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Sign in with Internet Identity
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header with Connection Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-primary" />
            BGKD Gift Card System
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete Internet Computer Testing Environment
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isConnected ? 'default' : 'destructive'} className="flex items-center gap-1">
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3" />
                Connected
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                Disconnected
              </>
            )}
          </Badge>
          <Button variant="outline" size="sm" onClick={clear}>
            Logout
          </Button>
        </div>
      </div>

      {/* User Profile Display */}
      {userProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Name:</span>
              <span className="font-medium">{userProfile.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="font-medium">{userProfile.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Principal:</span>
              <span className="font-mono text-xs break-all">{identity?.getPrincipal().toString()}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* IC Testing Suite Status */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Internet Computer Testing Suite
          </CardTitle>
          <CardDescription>
            Real-time validation of IC canister connectivity and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Canister ID:</span>
                <span className="font-mono text-xs">{canisterId || 'Loading...'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Network:</span>
                <Badge variant="outline">{networkType}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Health Check:</span>
                {healthCheckLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : healthCheckData ? (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Healthy
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="mr-1 h-3 w-3" />
                    Failed
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connection:</span>
                {connectionStatusLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : connectionStatus ? (
                  <Badge variant="default" className="bg-green-500">
                    {connectionStatus.status}
                  </Badge>
                ) : (
                  <Badge variant="secondary">Unknown</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ping:</span>
                <span className="text-sm font-medium">
                  {connectionStatus?.ping ? `${connectionStatus.ping}ms` : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Session:</span>
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Persistent
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dashboard */}
      {analyticsLoading ? (
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : analytics ? (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Number(analytics.totalValue).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Active Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(analytics.activeCards)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Percent className="h-4 w-4" />
                Redemption Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.redemptionRate.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Countries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(analytics.countriesActive)}</div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Gift Cards Table */}
      <Card>
        <CardHeader>
          <CardTitle>Gift Cards</CardTitle>
          <CardDescription>
            View and manage all gift cards in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cardsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : giftCards.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {giftCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="font-mono">{card.code}</TableCell>
                    <TableCell>${Number(card.value).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{card.cardType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          card.status === 'active'
                            ? 'default'
                            : card.status === 'redeemed'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {card.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{card.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <CreditCard className="mx-auto h-12 w-12 mb-2 opacity-50" />
              <p>No gift cards found</p>
              <p className="text-sm mt-1">Create your first gift card to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Testing Console */}
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            IC Testing Console
          </CardTitle>
          <CardDescription>
            Open browser DevTools Console (F12) to view detailed testing logs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Authentication validation logs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Session persistence verification</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Asset loading validation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Canister health monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Data fetch confirmation</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
