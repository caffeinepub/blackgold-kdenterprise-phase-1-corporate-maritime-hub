import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function KDPlatformLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="kd-platform-wrapper min-h-[calc(100vh-4rem)]">
      <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-kd-text md:text-6xl lg:text-7xl">
            KD Token Platform
          </h1>
          <p className="mb-8 text-lg text-kd-text-muted md:text-xl">
            Experience the future of digital assets with our comprehensive platform for managing and tracking KD tokens.
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/kd-platform/dashboard' })}
            className="bg-kd-neon text-kd-bg hover:bg-kd-neon/90 text-lg px-8 py-6 h-auto font-bold shadow-lg shadow-kd-neon/20"
          >
            Enter Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
