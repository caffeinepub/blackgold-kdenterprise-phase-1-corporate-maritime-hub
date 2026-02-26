// Global TypeScript typings for NOC Mini Widget
export {};

declare global {
  interface Window {
    NOC_MINI_WIDGET_CONFIG?: {
      ultraEnhanced?: boolean;
      ultraTvlTrails?: boolean;
      ultraNeonPulse?: boolean;
      ultraRadarRing?: boolean;
      enableChart?: boolean;
      chartMaxHistory?: number;
      tvlAnimationSpeed?: number;
    };
    updateNOCWidget?: (data: {
      tvl?: string;
      omniMesh?: string;
      aiSelfHealing?: string;
      blackHoleMode?: string;
      predictiveFailover?: string;
    }) => void;
  }
}
