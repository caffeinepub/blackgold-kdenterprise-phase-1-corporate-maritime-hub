NOC Mini Status Widget - Ultra-Enhanced Pack
Version: 3.0.0
=============================================

OVERVIEW
--------
The NOC Mini Status Widget is a floating, glassmorphism-styled status indicator
for the KD.WebAI Network Operations Center. The Ultra-Enhanced Pack adds three
powerful visual effects: TVL gradient trails, ultra neon pulses, and spectral
radar rings.

FINAL SNIPPET - ULTRA-ENHANCED PACK (COPY/PASTE READY)
-------------------------------------------------------
Copy and paste this minimal snippet into your HTML page for instant deployment
of the Ultra-Enhanced Pack with all effects enabled:

<!-- NOC Mini Widget CSS -->
<link rel="stylesheet" href="noc-mini-widget.css">

<!-- NOC Mini Widget HTML -->
<div id="noc-mini-widget" class="noc-widget-container">
  <div class="noc-widget-collapsed">
    <div class="noc-widget-pulse"></div>
    <span class="noc-widget-title">NOC</span>
    <span class="noc-widget-status-dot"></span>
  </div>
  
  <div class="noc-widget-expanded">
    <div class="noc-widget-header">
      <h3 class="noc-widget-heading">KD.WebAI NOC</h3>
      <span class="noc-widget-version">v13.2</span>
    </div>
    
    <div class="noc-widget-metrics">
      <div class="noc-metric-item noc-metric-tvl-row">
        <span class="noc-metric-label">TVL</span>
        <span class="noc-metric-value" id="noc-tvl">N/A</span>
      </div>
      
      <div class="noc-metric-item">
        <span class="noc-metric-label">Omni-Mesh</span>
        <span class="noc-metric-value noc-status-badge" id="noc-omni-mesh">N/A</span>
      </div>
      
      <div class="noc-metric-item">
        <span class="noc-metric-label">AI Self-Healing</span>
        <span class="noc-metric-value noc-status-badge" id="noc-ai-healing">N/A</span>
      </div>
      
      <div class="noc-metric-item">
        <span class="noc-metric-label">Black Hole Mode</span>
        <span class="noc-metric-value noc-status-badge" id="noc-black-hole">N/A</span>
      </div>
      
      <div class="noc-metric-item">
        <span class="noc-metric-label">Predictive Failover</span>
        <span class="noc-metric-value noc-status-badge" id="noc-failover">N/A</span>
      </div>
    </div>
    
    <div class="noc-chart-container" id="noc-chart-container">
      <canvas id="noc-chart-canvas" width="280" height="80"></canvas>
    </div>
    
    <div class="noc-widget-footer">
      <span class="noc-widget-timestamp" id="noc-timestamp">--:--:--</span>
    </div>
  </div>
</div>

<!-- NOC Mini Widget Configuration -->
<script>
  window.NOC_MINI_WIDGET_CONFIG = {
    ultraEnhanced: true,
    ultraTvlTrails: true,
    ultraNeonPulse: true,
    ultraRadarRing: true,
    enableChart: true,
    chartMaxHistory: 20,
    tvlAnimationSpeed: 0.1
  };
</script>

<!-- NOC Mini Widget JavaScript -->
<script src="noc-mini-widget.js"></script>

That's it! The widget will appear in the top-right corner of your page.

OPTIONAL: UPDATE WIDGET WITH YOUR DATA
--------------------------------------
To update the widget with live data, call window.updateNOCWidget() after the
widget has loaded. This is completely optional - the widget will display N/A
values until you provide data.

Example update loop (place after the widget script):

<script>
  // Example: Update widget every 5 seconds with your data
  setInterval(() => {
    window.updateNOCWidget({
      tvl: "$1.25T",
      omniMesh: "ACTIVE",
      aiSelfHealing: "READY",
      blackHoleMode: "INACTIVE",
      predictiveFailover: "STANDBY"
    });
  }, 5000);
</script>

ULTRA-ENHANCED PACK FEATURES
-----------------------------
The Ultra-Enhanced Pack (v3.0.0) introduces three advanced visual effects:

1. TVL GRADIENT TRAILS
   - Smooth motion trails with afterglow effect during TVL value changes
   - Gradient opacity fading from current to previous values
   - Animated glow on the current value indicator
   - Automatically rendered in the TVL metric row

2. ULTRA NEON PULSE
   - Stronger, brighter neon-style pulses for status badges
   - Enhanced outer glow rings with multiple shadow layers
   - Slight scale animation for emphasis
   - Applied to READY and ACTIVE states
   - More intense than standard Animated Pack pulses

3. SPECTRAL RADAR RING
   - Animated radar/ring effect for Black Hole Mode ENGAGED
   - Rotating sweep beam with gradient fade
   - Concentric ring patterns
   - Pulsing center indicator
   - Outer glow ring animation
   - Appears to the right of the Black Hole Mode indicator

CONFIGURATION OPTIONS
---------------------
All configuration is optional. Set window.NOC_MINI_WIDGET_CONFIG before loading
the widget script:

{
  // Ultra-Enhanced Pack (default: false)
  ultraEnhanced: true,           // Enable all ultra-enhanced effects
  
  // Individual Ultra-Enhanced toggles (default: true when ultraEnhanced is true)
  ultraTvlTrails: true,          // Enable TVL gradient trails
  ultraNeonPulse: true,          // Enable stronger neon pulses
  ultraRadarRing: true,          // Enable Black Hole radar ring
  
  // Standard Animated Pack options
  enableChart: true,             // Enable hover chart (default: true)
  chartMaxHistory: 20,           // Chart data points (default: 20)
  tvlAnimationSpeed: 0.1,        // TVL interpolation speed (default: 0.1)
  chartUpdateInterval: 2000      // Chart refresh rate in ms (default: 2000)
}

GLOBAL FUNCTIONS
----------------
window.updateNOCWidget(data)
  Updates the widget with new metric values.
  
  Parameters:
    data (object): Metric values to update
      - tvl (string|number): Total Value Locked (e.g., "$1.25T", 1250000000000)
      - omniMesh (string): Omni-Mesh status (e.g., "ACTIVE", "IDLE")
      - aiSelfHealing (string): AI Self-Healing status (e.g., "READY", "SCANNING")
      - blackHoleMode (string): Black Hole Mode status (e.g., "ENGAGED", "INACTIVE")
      - predictiveFailover (string): Predictive Failover status (e.g., "STANDBY", "OPTIMIZING")
      - cycles (number): Optional cycles value for chart
  
  Example:
    window.updateNOCWidget({
      tvl: "$1.25T",
      omniMesh: "ACTIVE",
      aiSelfHealing: "READY",
      blackHoleMode: "ENGAGED",
      predictiveFailover: "STANDBY"
    });

window.resetNOCWidget()
  Resets the widget to its initial state with N/A values.
  
  Example:
    window.resetNOCWidget();

METRIC DESCRIPTIONS
-------------------
TVL (Total Value Locked)
  - Displays total value with smooth count-up animation
  - Supports T (trillion), B (billion), M (million), K (thousand) suffixes
  - Ultra-Enhanced: Shows gradient motion trails during updates
  - Hover to display sparkline chart (when expanded)

Omni-Mesh
  - Network mesh status indicator
  - States: ACTIVE (green pulse), IDLE (gray), OPERATIONAL (green)
  - Ultra-Enhanced: ACTIVE state shows ultra neon pulse with outer glow

AI Self-Healing
  - AI system status indicator
  - States: READY (yellow pulse), SCANNING (orange), IDLE (gray)
  - Ultra-Enhanced: READY state shows ultra neon pulse with outer glow

Black Hole Mode
  - Critical system mode indicator
  - States: ENGAGED (red glow), INACTIVE (gray), STANDBY (blue)
  - ENGAGED state has special pulsing glow effect
  - Ultra-Enhanced: ENGAGED state shows animated spectral radar ring

Predictive Failover
  - Failover system status indicator
  - States: STANDBY (blue), OPTIMIZING (purple), ACTIVE (green)

STATUS COLORS & ANIMATIONS
---------------------------
Standard Animated Pack:
  - ACTIVE/OPERATIONAL: Green (#10b981) with subtle pulse
  - READY: Yellow (#fbbf24) with subtle pulse
  - ENGAGED: Red (#ef4444) with special glow
  - SCANNING: Orange (#fb923c)
  - STANDBY/OPTIMIZING: Blue/Purple (#3b82f6, #9b59b6)
  - IDLE/INACTIVE: Gray (#94a3b8)

Ultra-Enhanced Pack Additions:
  - ACTIVE: Ultra neon pulse with 3-layer shadow and scale animation
  - READY: Ultra neon pulse with 3-layer shadow and scale animation
  - ENGAGED: Spectral radar ring with rotating sweep and concentric circles

All status badges transition smoothly over 1 second when values change.

BEHAVIOR
--------
- Widget starts in collapsed state (small pill in top-right corner)
- Click anywhere on the widget to expand/collapse
- Expanded state shows all five metrics
- Hover over TVL row (when expanded) to display sparkline chart
- Chart shows historical TVL values with gradient fill
- Timestamp updates every second
- Ultra-Enhanced effects only run when widget is expanded
- All animations respect prefers-reduced-motion preference

ACCESSIBILITY
-------------
- Respects prefers-reduced-motion: reduce media query
- All ultra-enhanced animations disabled when reduced motion is preferred
- Semantic HTML structure
- Color-coded status indicators with text labels
- Keyboard accessible (click events work with Enter/Space)

BROWSER SUPPORT
---------------
- Modern browsers with ES6+ support
- Canvas API required for chart and ultra-enhanced effects
- Backdrop-filter support recommended for glassmorphism
- Falls back gracefully on older browsers

PERFORMANCE
-----------
- Uses requestAnimationFrame for smooth 60fps animations
- Canvas rendering optimized for minimal redraws
- Ultra-enhanced effects only active when widget is expanded
- Automatic cleanup on page unload
- Reduced motion mode disables all animations

INTEGRATION EXAMPLES
--------------------
Basic Integration (Animated Pack):
  <script>
    setInterval(() => {
      window.updateNOCWidget({
        tvl: "$1.25T",
        omniMesh: "ACTIVE",
        aiSelfHealing: "READY",
        blackHoleMode: "INACTIVE",
        predictiveFailover: "STANDBY"
      });
    }, 5000);
  </script>

Ultra-Enhanced Integration:
  <script>
    window.NOC_MINI_WIDGET_CONFIG = {
      ultraEnhanced: true,
      ultraTvlTrails: true,
      ultraNeonPulse: true,
      ultraRadarRing: true
    };
  </script>
  <script src="noc-mini-widget.js"></script>
  <script>
    // Simulate live data with effects
    setInterval(() => {
      const tvl = 1.20 + Math.random() * 0.30;
      window.updateNOCWidget({
        tvl: `$${tvl.toFixed(3)}T`,
        omniMesh: Math.random() > 0.5 ? "ACTIVE" : "IDLE",
        aiSelfHealing: Math.random() > 0.5 ? "READY" : "SCANNING",
        blackHoleMode: Math.random() > 0.9 ? "ENGAGED" : "INACTIVE",
        predictiveFailover: Math.random() > 0.5 ? "STANDBY" : "OPTIMIZING"
      });
    }, 2000);
  </script>

TROUBLESHOOTING
---------------
Q: Ultra-enhanced effects not showing?
A: Ensure ultraEnhanced: true is set before loading the script, widget is
   expanded, and prefers-reduced-motion is not active.

Q: TVL trails not visible?
A: Check that TVL values are changing and widget is expanded. Trails require
   multiple data points to render.

Q: Radar ring not appearing?
A: Radar ring only shows when blackHoleMode is "ENGAGED" (case-insensitive).

Q: Widget not updating?
A: Check browser console for errors. Ensure window.updateNOCWidget() is called
   with valid data object.

Q: Chart not showing?
A: Hover over TVL row when widget is expanded. Chart requires at least 2 data
   points in history.

Q: Performance issues?
A: Disable ultra-enhanced effects or reduce update frequency. Consider using
   standard Animated Pack instead.

CHANGELOG
---------
v3.0.0 (Ultra-Enhanced Pack)
  - Added TVL gradient trails effect
  - Added ultra neon pulse effect for ACTIVE/READY states
  - Added spectral radar ring effect for Black Hole Mode ENGAGED
  - Enhanced configuration system with individual effect toggles
  - Improved performance with conditional rendering
  - Added reduced-motion support for all ultra effects

v2.0.0 (Animated Pack)
  - Added smooth TVL count-up animation
  - Added sparkline chart on hover
  - Added status badge pulse animations
  - Added timestamp display
  - Improved glassmorphism styling

v1.0.0 (Initial Release)
  - Basic widget with collapse/expand functionality
  - Five metric display
  - Glassmorphism design
  - Responsive layout

SUPPORT
-------
For issues, questions, or feature requests, please refer to the embed-example.html
file for a complete working demonstration of all features.

LICENSE
-------
Proprietary - KD.WebAI Network Operations Center
All rights reserved.
