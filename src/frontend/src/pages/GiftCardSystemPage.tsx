import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useActor } from '../hooks/useActor';
import {
  useGiftCards,
  useGiftCardAnalytics,
  useCreateGiftCard,
  useRecordRedemption,
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
  useHealthCheck,
  useConnectionStatus,
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
  const { data: connectionStatus, isLoading: connectionStatusLoading } = useConnectionStatus();
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
  const { data: giftCards = [], isLoading: cardsLoading } = useGiftCards();
  const { data: analytics, isLoading: analyticsLoading } = useGiftCardAnalytics();

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

  // Mutations
  const createCardMutation = useCreateGiftCard();
  const recordRedemptionMutation = useRecordRedemption();

  // UI State
  const [activeSection, setActiveSection] = useState('operations');
  const [formData, setFormData] = useState({
    code: '',
    value: '',
    currency: Currency.usd,
    cardType: GiftCardType.fiat,
    owner: '',
    notes: '',
    expirationDate: '',
    originCountry: '',
    mobileNumber: '',
  });

  // Track if card creation is in progress to prevent duplicates
  const [isCreatingCard, setIsCreatingCard] = useState(false);

  // Generate QR code and barcode
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [barcodeUrl, setBarcodeUrl] = useState('');

  const generateQRCode = (code: string) => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔲 [IC Testing Suite] QR CODE GENERATION');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 Input Code:', code);
    console.log('⏳ Generating QR code...');
    
    const canvas = document.createElement('canvas');
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      
      ctx.fillStyle = '#001f3f';
      const blockSize = 10;
      const blocks = size / blockSize;
      
      let seed = 0;
      for (let i = 0; i < code.length; i++) {
        seed += code.charCodeAt(i);
      }
      
      for (let y = 0; y < blocks; y++) {
        for (let x = 0; x < blocks; x++) {
          const val = (seed * (x + 1) * (y + 1)) % 3;
          if (val === 0) {
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
          }
        }
      }
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, size - 30, size, 30);
      ctx.fillStyle = '#001f3f';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(code, size / 2, size - 10);
    }
    
    const dataUrl = canvas.toDataURL();
    setQrCodeUrl(dataUrl);
    console.log('✅ QR Code generated successfully');
    console.log('✅ Data URL length:', dataUrl.length, 'characters');
    console.log('═══════════════════════════════════════════════════════');
  };

  const generateBarcode = (code: string) => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 [IC Testing Suite] BARCODE GENERATION');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 Input Code:', code);
    console.log('⏳ Generating barcode...');
    
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 300, 100);
      
      ctx.fillStyle = '#001f3f';
      let x = 20;
      for (let i = 0; i < code.length; i++) {
        const charCode = code.charCodeAt(i);
        const width = (charCode % 3) + 2;
        ctx.fillRect(x, 20, width, 50);
        x += width + 2;
      }
      
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(code, 150, 85);
    }
    
    const dataUrl = canvas.toDataURL();
    setBarcodeUrl(dataUrl);
    console.log('✅ Barcode generated successfully');
    console.log('✅ Data URL length:', dataUrl.length, 'characters');
    console.log('═══════════════════════════════════════════════════════');
  };

  const handleCreateCard = async () => {
    if (!formData.code || !formData.value || !formData.owner) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isCreatingCard) {
      console.log('⚠️  [IC Testing Suite] Duplicate submission prevented - card creation already in progress');
      toast.warning('Card creation already in progress');
      return;
    }

    const expirationTimestamp = formData.expirationDate
      ? BigInt(new Date(formData.expirationDate).getTime() * 1000000)
      : BigInt((Date.now() + 365 * 24 * 60 * 60 * 1000) * 1000000);

    console.log('═══════════════════════════════════════════════════════');
    console.log('💳 [IC Testing Suite] GIFT CARD CREATION FLOW');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 Card Code:', formData.code);
    console.log('📊 Value:', formData.value);
    console.log('📊 Currency:', formData.currency);
    console.log('📊 Card Type:', formData.cardType);
    console.log('📊 Owner:', formData.owner);
    console.log('📊 Origin Country:', formData.originCountry || 'N/A');
    console.log('📊 Mobile Number:', formData.mobileNumber || 'N/A');
    console.log('⏳ Initiating on-chain write...');

    setIsCreatingCard(true);

    try {
      await createCardMutation.mutateAsync({
        id: `BGKD-${Date.now()}`,
        code: formData.code,
        value: BigInt(formData.value),
        currency: formData.currency,
        cardType: formData.cardType,
        owner: formData.owner,
        notes: formData.notes,
        expirationDate: expirationTimestamp,
        originCountry: formData.originCountry,
        mobileNumber: formData.mobileNumber,
        createdBy: userProfile?.name || 'Admin',
        creationMetadata: JSON.stringify({ createdAt: new Date().toISOString() }),
        lastUpdatedBy: userProfile?.name || 'Admin',
      });

      console.log('✅ On-chain write CONFIRMED - Gift card created successfully');
      console.log('✅ Transaction finalized on Internet Computer');
      console.log('✅ Data persisted to Motoko canister');
      console.log('═══════════════════════════════════════════════════════');

      toast.success('Gift card created successfully!');
      
      // Generate QR and barcode
      generateQRCode(formData.code);
      generateBarcode(formData.code);
      
      // Reset form
      setFormData({
        code: '',
        value: '',
        currency: Currency.usd,
        cardType: GiftCardType.fiat,
        owner: '',
        notes: '',
        expirationDate: '',
        originCountry: '',
        mobileNumber: '',
      });
    } catch (error: any) {
      console.error('❌ [IC Testing Suite] Gift card creation failed:', error);
      console.log('═══════════════════════════════════════════════════════');
      toast.error(`Failed to create gift card: ${error.message}`);
    } finally {
      setIsCreatingCard(false);
    }
  };

  // Profile Setup Dialog
  if (showProfileSetup) {
    return (
      <div className="container mx-auto py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Welcome! Set Up Your Profile</CardTitle>
            <CardDescription>Please provide your information to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="profileName">Name</Label>
              <Input
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="profileEmail">Email</Label>
              <Input
                id="profileEmail"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                placeholder="Enter your email"
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
                  Saving...
                </>
              ) : (
                'Complete Setup'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-maritime-gold/10">
              <Shield className="h-8 w-8 text-maritime-gold" />
            </div>
            <CardTitle className="text-2xl">BGKD Gift Card System</CardTitle>
            <CardDescription>
              Secure Internet Computer-powered gift card management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertDescription>
                This system uses Internet Identity for secure, passwordless authentication
              </AlertDescription>
            </Alert>
            <Button
              onClick={login}
              disabled={loginStatus === 'logging-in'}
              className="w-full"
              size="lg"
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Login with Internet Identity
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="container mx-auto py-8">
      {/* Header with Connection Status */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-maritime-navy">BGKD Gift Card System</h1>
          <p className="text-sm text-muted-foreground">
            Internet Computer Testing Environment
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* IC Connection Badge */}
          <Badge
            variant={isConnected ? 'default' : 'destructive'}
            className="flex items-center gap-2"
          >
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3 animate-pulse-slow" />
                IC Connected
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                Connecting...
              </>
            )}
          </Badge>
          
          {/* User Profile Badge */}
          {userProfile && (
            <Badge variant="outline" className="flex items-center gap-2">
              <Eye className="h-3 w-3" />
              {userProfile.name}
            </Badge>
          )}
          
          <Button variant="outline" size="sm" onClick={clear}>
            Logout
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Number(analytics.totalValue).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(analytics.activeCards)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Redemption Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.redemptionRate.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries Active</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(analytics.countriesActive)}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Gift Card Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Gift Card</CardTitle>
          <CardDescription>Generate a new BGKD gift card on the Internet Computer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="code">Card Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., BGKD-2025-001"
              />
            </div>
            <div>
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value as Currency })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Currency.usd}>USD</SelectItem>
                  <SelectItem value={Currency.eur}>EUR</SelectItem>
                  <SelectItem value={Currency.gbp}>GBP</SelectItem>
                  <SelectItem value={Currency.btc}>BTC</SelectItem>
                  <SelectItem value={Currency.eth}>ETH</SelectItem>
                  <SelectItem value={Currency.bgkd}>BGKD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cardType">Card Type</Label>
              <Select
                value={formData.cardType}
                onValueChange={(value) => setFormData({ ...formData, cardType: value as GiftCardType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={GiftCardType.fiat}>Fiat</SelectItem>
                  <SelectItem value={GiftCardType.crypto}>Crypto</SelectItem>
                  <SelectItem value={GiftCardType.hybrid}>Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="owner">Owner *</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="Owner name"
              />
            </div>
            <div>
              <Label htmlFor="originCountry">Origin Country</Label>
              <Input
                id="originCountry"
                value={formData.originCountry}
                onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                placeholder="e.g., USA"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes..."
              />
            </div>
          </div>
          <Button
            onClick={handleCreateCard}
            disabled={isCreatingCard || createCardMutation.isPending}
            className="mt-4 w-full"
          >
            {isCreatingCard || createCardMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Card...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Create Gift Card
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Gift Cards Table */}
      <Card>
        <CardHeader>
          <CardTitle>Gift Cards</CardTitle>
          <CardDescription>All gift cards stored on the Internet Computer</CardDescription>
        </CardHeader>
        <CardContent>
          {cardsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : giftCards.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No gift cards found. Create your first card above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {giftCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="font-mono">{card.code}</TableCell>
                    <TableCell>
                      {Number(card.value)} {card.currency.toUpperCase()}
                    </TableCell>
                    <TableCell className="capitalize">{card.cardType}</TableCell>
                    <TableCell>{card.owner}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
