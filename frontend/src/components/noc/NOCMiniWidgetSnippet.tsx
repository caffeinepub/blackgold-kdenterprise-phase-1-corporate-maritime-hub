import { useEffect } from 'react';
import { useNOCMiniWidgetLiveUpdates } from '../../hooks/useNOCMiniWidgetLiveUpdates';

/**
 * NOC Mini Widget Snippet Component
 * Embeds the ultra-enhanced NOC mini widget with live data updates
 */
export function NOCMiniWidgetSnippet() {
  // Hook up live data updates
  useNOCMiniWidgetLiveUpdates();

  useEffect(() => {
    // Set widget configuration before loading the script
    window.NOC_MINI_WIDGET_CONFIG = {
      ultraEnhanced: true,
      ultraTvlTrails: true,
      ultraNeonPulse: true,
      ultraRadarRing: true,
      enableChart: true,
      chartMaxHistory: 20,
      tvlAnimationSpeed: 0.1,
    };

    // Check if assets are already loaded (prevent duplicates)
    const styleId = 'noc-mini-widget-style';
    const scriptId = 'noc-mini-widget-script';

    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = '/noc-mini-widget/noc-mini-widget.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '/noc-mini-widget/noc-mini-widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup is intentionally omitted to prevent removing assets
    // when component unmounts/remounts during navigation
  }, []);

  return (
    <div id="noc-mini-widget" className="noc-mini-widget">
      <div className="noc-mini-widget-header">
        <div className="noc-mini-widget-title">NOC Mini</div>
        <div className="noc-mini-widget-toggle">▼</div>
      </div>
      <div className="noc-mini-widget-body">
        <canvas id="noc-tvl-trail-canvas" className="noc-tvl-trail-canvas"></canvas>
        <div className="noc-mini-widget-metric">
          <span className="noc-mini-widget-label">TVL:</span>
          <span id="noc-tvl" className="noc-mini-widget-value">
            N/A
          </span>
        </div>
        <div className="noc-mini-widget-metric">
          <span className="noc-mini-widget-label">Omni-Mesh:</span>
          <span id="noc-omni-mesh" className="noc-mini-widget-value">
            N/A
          </span>
        </div>
        <div className="noc-mini-widget-metric">
          <span className="noc-mini-widget-label">AI Self-Healing:</span>
          <span id="noc-ai-healing" className="noc-mini-widget-value">
            N/A
          </span>
        </div>
        <div className="noc-mini-widget-metric">
          <span className="noc-mini-widget-label">Black Hole Mode:</span>
          <span id="noc-black-hole" className="noc-mini-widget-value">
            N/A
          </span>
        </div>
        <div className="noc-mini-widget-metric">
          <span className="noc-mini-widget-label">Predictive Failover:</span>
          <span id="noc-failover" className="noc-mini-widget-value">
            N/A
          </span>
        </div>
        <div className="noc-mini-widget-chart-container">
          <canvas id="noc-chart-canvas" className="noc-mini-widget-chart"></canvas>
          <canvas id="noc-radar-ring-canvas" className="noc-radar-ring-canvas"></canvas>
        </div>
        <div id="noc-timestamp" className="noc-mini-widget-timestamp">
          Last updated: Never
        </div>
      </div>
    </div>
  );
}
