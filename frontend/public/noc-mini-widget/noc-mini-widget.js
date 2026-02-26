/**
 * NOC Mini Status Widget - Ultra-Enhanced Pack
 * Glass-card floating widget with live metrics, smooth animations, and ultra-enhanced visual effects
 * Version: 3.0.0 (Ultra-Enhanced Pack)
 */

(function() {
  'use strict';

  // Configuration (can be overridden via window.NOC_MINI_WIDGET_CONFIG)
  const defaultConfig = {
    enableChart: true,
    chartMaxHistory: 20,
    tvlAnimationSpeed: 0.1,
    chartUpdateInterval: 2000,
    // Ultra-Enhanced Pack options
    ultraEnhanced: false,
    ultraTvlTrails: true,
    ultraNeonPulse: true,
    ultraRadarRing: true
  };

  let config = { ...defaultConfig };

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Widget state
  let widgetState = {
    tvl: 'N/A',
    tvlNumeric: null,
    tvlTarget: null,
    tvlCurrent: null,
    omniMesh: 'N/A',
    aiSelfHealing: 'N/A',
    blackHoleMode: 'N/A',
    predictiveFailover: 'N/A',
    cycles: null,
    lastUpdate: null
  };

  // Chart state
  let chartState = {
    tvlHistory: [],
    cyclesHistory: [],
    lastChartUpdate: 0
  };

  // Ultra-Enhanced state
  let ultraState = {
    tvlTrailHistory: [],
    radarAngle: 0,
    radarCanvas: null,
    radarCtx: null
  };

  let isExpanded = false;
  let timestampInterval = null;
  let animationFrameId = null;
  let chartVisible = false;

  // Initialize widget
  function initWidget() {
    const container = document.getElementById('noc-mini-widget');
    if (!container) {
      console.error('NOC Widget: Container element not found');
      return;
    }

    // Load configuration if provided
    if (window.NOC_MINI_WIDGET_CONFIG) {
      config = { ...defaultConfig, ...window.NOC_MINI_WIDGET_CONFIG };
    }

    // Disable ultra-enhanced effects if reduced motion is preferred
    if (prefersReducedMotion) {
      config.ultraEnhanced = false;
    }

    // Add click handler for expand/collapse
    container.addEventListener('click', toggleWidget);

    // Add hover handlers for chart
    if (config.enableChart) {
      const tvlRow = container.querySelector('.noc-metric-tvl-row');
      if (tvlRow) {
        tvlRow.addEventListener('mouseenter', showChart);
        tvlRow.addEventListener('mouseleave', hideChart);
      }
    }

    // Initialize ultra-enhanced features
    if (config.ultraEnhanced && !prefersReducedMotion) {
      initUltraEnhanced();
    }

    // Start timestamp update
    startTimestampUpdate();

    // Start animation loop
    startAnimationLoop();

    // Render initial state
    renderWidget();

    console.log('NOC Mini Widget (Ultra-Enhanced Pack) initialized');
  }

  // Initialize ultra-enhanced features
  function initUltraEnhanced() {
    // Create TVL trail canvas if enabled
    if (config.ultraTvlTrails) {
      const tvlRow = document.querySelector('.noc-metric-tvl-row');
      if (tvlRow && !document.getElementById('noc-tvl-trail-canvas')) {
        const trailCanvas = document.createElement('canvas');
        trailCanvas.id = 'noc-tvl-trail-canvas';
        trailCanvas.className = 'noc-tvl-trail-canvas';
        trailCanvas.width = 280;
        trailCanvas.height = 40;
        tvlRow.appendChild(trailCanvas);
      }
    }

    // Create radar ring canvas if enabled
    if (config.ultraRadarRing) {
      const blackHoleRow = document.querySelector('.noc-metric-item:has(#noc-black-hole)');
      if (blackHoleRow && !document.getElementById('noc-radar-canvas')) {
        const radarCanvas = document.createElement('canvas');
        radarCanvas.id = 'noc-radar-canvas';
        radarCanvas.className = 'noc-radar-canvas';
        radarCanvas.width = 60;
        radarCanvas.height = 60;
        ultraState.radarCanvas = radarCanvas;
        ultraState.radarCtx = radarCanvas.getContext('2d');
        blackHoleRow.appendChild(radarCanvas);
      }
    }

    // Apply ultra-enhanced CSS classes
    const container = document.getElementById('noc-mini-widget');
    if (container) {
      container.classList.add('ultra-enhanced');
    }
  }

  // Toggle widget expanded/collapsed state
  function toggleWidget() {
    isExpanded = !isExpanded;
    const container = document.getElementById('noc-mini-widget');
    
    if (container) {
      if (isExpanded) {
        container.classList.add('expanded');
      } else {
        container.classList.remove('expanded');
        hideChart();
      }
    }
  }

  // Show chart
  function showChart() {
    if (!config.enableChart || !isExpanded) return;
    
    chartVisible = true;
    const chartContainer = document.getElementById('noc-chart-container');
    if (chartContainer) {
      chartContainer.classList.remove('hidden');
      chartContainer.classList.add('visible');
      renderChart();
    }
  }

  // Hide chart
  function hideChart() {
    chartVisible = false;
    const chartContainer = document.getElementById('noc-chart-container');
    if (chartContainer) {
      chartContainer.classList.remove('visible');
      chartContainer.classList.add('hidden');
    }
  }

  // Update widget with new data
  function updateWidget(data) {
    if (!data || typeof data !== 'object') {
      console.warn('NOC Widget: Invalid data provided to updateWidget');
      return;
    }

    // Update TVL with animation support
    if (data.tvl !== undefined) {
      const numericValue = parseNumericValue(data.tvl);
      if (numericValue !== null) {
        widgetState.tvlTarget = numericValue;
        if (widgetState.tvlCurrent === null) {
          widgetState.tvlCurrent = numericValue;
        }
        widgetState.tvlNumeric = numericValue;
        
        // Add to history for chart
        if (config.enableChart) {
          addToHistory(chartState.tvlHistory, numericValue, config.chartMaxHistory);
        }

        // Add to trail history for ultra-enhanced
        if (config.ultraEnhanced && config.ultraTvlTrails && !prefersReducedMotion) {
          addToHistory(ultraState.tvlTrailHistory, numericValue, 10);
        }
      } else {
        widgetState.tvl = 'N/A';
        widgetState.tvlNumeric = null;
        widgetState.tvlTarget = null;
        widgetState.tvlCurrent = null;
      }
    }

    // Update cycles (optional, for chart)
    if (data.cycles !== undefined) {
      const cyclesValue = parseNumericValue(data.cycles);
      if (cyclesValue !== null && config.enableChart) {
        widgetState.cycles = cyclesValue;
        addToHistory(chartState.cyclesHistory, cyclesValue, config.chartMaxHistory);
      }
    }

    // Update status metrics
    if (data.omniMesh !== undefined) {
      widgetState.omniMesh = String(data.omniMesh);
    }
    if (data.aiSelfHealing !== undefined) {
      widgetState.aiSelfHealing = String(data.aiSelfHealing);
    }
    if (data.blackHoleMode !== undefined) {
      widgetState.blackHoleMode = String(data.blackHoleMode);
    }
    if (data.predictiveFailover !== undefined) {
      widgetState.predictiveFailover = String(data.predictiveFailover);
    }

    widgetState.lastUpdate = Date.now();

    // Render updated state
    renderWidget();
  }

  // Parse numeric value from various formats
  function parseNumericValue(value) {
    if (value === null || value === undefined || value === 'N/A') {
      return null;
    }

    // If already a number
    if (typeof value === 'number' && !isNaN(value)) {
      return value;
    }

    // If string, try to parse
    if (typeof value === 'string') {
      // Remove currency symbols and whitespace
      const cleaned = value.replace(/[$,\s]/g, '');
      
      // Handle suffixes (T, B, M, K)
      const match = cleaned.match(/^([\d.]+)([TBMK])?$/i);
      if (match) {
        const num = parseFloat(match[1]);
        const suffix = match[2] ? match[2].toUpperCase() : '';
        
        if (isNaN(num)) return null;
        
        switch (suffix) {
          case 'T': return num * 1e12;
          case 'B': return num * 1e9;
          case 'M': return num * 1e6;
          case 'K': return num * 1e3;
          default: return num;
        }
      }
      
      // Try direct parse
      const num = parseFloat(cleaned);
      return isNaN(num) ? null : num;
    }

    return null;
  }

  // Add value to history array
  function addToHistory(history, value, maxLength) {
    history.push(value);
    if (history.length > maxLength) {
      history.shift();
    }
  }

  // Format TVL value
  function formatTVL(value) {
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }

    if (value >= 1e12) {
      return '$' + (value / 1e12).toFixed(3) + 'T';
    } else if (value >= 1e9) {
      return '$' + (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
      return '$' + (value / 1e6).toFixed(2) + 'M';
    } else if (value >= 1e3) {
      return '$' + (value / 1e3).toFixed(2) + 'K';
    } else {
      return '$' + value.toLocaleString();
    }
  }

  // Get status badge class
  function getStatusClass(status) {
    const statusLower = String(status).toLowerCase();
    
    if (statusLower === 'active' || statusLower === 'operational') {
      return 'status-active';
    } else if (statusLower === 'inactive' || statusLower === 'offline') {
      return 'status-inactive';
    } else if (statusLower === 'idle') {
      return 'status-idle';
    } else if (statusLower === 'ready') {
      return 'status-ready';
    } else if (statusLower === 'scanning' || statusLower === 'repairing') {
      return 'status-scanning';
    } else if (statusLower === 'standby' || statusLower === 'optimizing' || statusLower === 'rebalancing') {
      return 'status-standby';
    } else if (statusLower === 'engaged') {
      return 'status-engaged';
    }
    
    return '';
  }

  // Animation loop for smooth TVL interpolation and ultra-enhanced effects
  function startAnimationLoop() {
    function animate() {
      // Interpolate TVL if target is set
      if (widgetState.tvlTarget !== null && widgetState.tvlCurrent !== null) {
        const diff = widgetState.tvlTarget - widgetState.tvlCurrent;
        if (Math.abs(diff) > 0.01) {
          widgetState.tvlCurrent += diff * config.tvlAnimationSpeed;
          
          // Update display
          const tvlEl = document.getElementById('noc-tvl');
          if (tvlEl) {
            tvlEl.textContent = formatTVL(widgetState.tvlCurrent);
          }
        } else {
          widgetState.tvlCurrent = widgetState.tvlTarget;
        }
      }

      // Update chart if visible
      if (chartVisible && config.enableChart) {
        const now = Date.now();
        if (now - chartState.lastChartUpdate > config.chartUpdateInterval) {
          renderChart();
          chartState.lastChartUpdate = now;
        }
      }

      // Ultra-enhanced effects (only when expanded and not reduced motion)
      if (isExpanded && config.ultraEnhanced && !prefersReducedMotion) {
        // Render TVL trail
        if (config.ultraTvlTrails) {
          renderTVLTrail();
        }

        // Render radar ring for Black Hole ENGAGED
        if (config.ultraRadarRing && widgetState.blackHoleMode.toLowerCase() === 'engaged') {
          renderRadarRing();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
  }

  // Stop animation loop
  function stopAnimationLoop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // Render TVL trail effect
  function renderTVLTrail() {
    const canvas = document.getElementById('noc-tvl-trail-canvas');
    if (!canvas || ultraState.tvlTrailHistory.length < 2) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear with fade effect
    ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
    ctx.fillRect(0, 0, width, height);

    const data = ultraState.tvlTrailHistory;
    const dataLength = data.length;

    // Calculate min/max for scaling
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    // Draw gradient trail
    for (let i = 1; i < dataLength; i++) {
      const x1 = ((i - 1) / (dataLength - 1)) * width;
      const y1 = height / 2 - ((data[i - 1] - min) / range - 0.5) * (height * 0.6);
      const x2 = (i / (dataLength - 1)) * width;
      const y2 = height / 2 - ((data[i] - min) / range - 0.5) * (height * 0.6);

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      const alpha = (i / dataLength) * 0.8;
      gradient.addColorStop(0, `rgba(100, 255, 218, ${alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(100, 255, 218, ${alpha})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Add glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(100, 255, 218, 0.6)';
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw current value glow
    if (dataLength > 0) {
      const lastX = width - 10;
      const lastY = height / 2 - ((data[dataLength - 1] - min) / range - 0.5) * (height * 0.6);
      
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#64ffda';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#64ffda';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Render radar ring effect for Black Hole Mode
  function renderRadarRing() {
    if (!ultraState.radarCanvas || !ultraState.radarCtx) return;

    const ctx = ultraState.radarCtx;
    const width = ultraState.radarCanvas.width;
    const height = ultraState.radarCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 5;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw concentric rings
    for (let i = 1; i <= 3; i++) {
      const radius = (maxRadius / 3) * i;
      const alpha = 0.3 - (i * 0.08);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw rotating sweep
    ultraState.radarAngle += 0.05;
    if (ultraState.radarAngle > Math.PI * 2) {
      ultraState.radarAngle = 0;
    }

    // Create gradient for sweep
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.6)');
    gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.3)');
    gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(ultraState.radarAngle);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, maxRadius, 0, Math.PI / 3);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.restore();

    // Draw center pulse
    const pulseRadius = 3 + Math.sin(Date.now() / 200) * 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ef4444';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw outer glow ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Render widget with current state
  function renderWidget() {
    const tvlEl = document.getElementById('noc-tvl');
    const omniMeshEl = document.getElementById('noc-omni-mesh');
    const aiHealingEl = document.getElementById('noc-ai-healing');
    const blackHoleEl = document.getElementById('noc-black-hole');
    const failoverEl = document.getElementById('noc-failover');

    // TVL is updated by animation loop
    if (tvlEl && widgetState.tvlCurrent === null) {
      tvlEl.textContent = widgetState.tvl;
    }

    // Omni-Mesh
    if (omniMeshEl) {
      omniMeshEl.textContent = widgetState.omniMesh;
      let statusClass = getStatusClass(widgetState.omniMesh);
      let className = 'noc-metric-value noc-status-badge ' + statusClass;
      
      // Add ultra-enhanced neon pulse class
      if (config.ultraEnhanced && config.ultraNeonPulse && !prefersReducedMotion) {
        if (widgetState.omniMesh.toLowerCase() === 'active') {
          className += ' ultra-neon-pulse';
        }
      }
      
      omniMeshEl.className = className;
    }

    // AI Self-Healing
    if (aiHealingEl) {
      aiHealingEl.textContent = widgetState.aiSelfHealing;
      let statusClass = getStatusClass(widgetState.aiSelfHealing);
      let className = 'noc-metric-value noc-status-badge ' + statusClass;
      
      // Add ultra-enhanced neon pulse class
      if (config.ultraEnhanced && config.ultraNeonPulse && !prefersReducedMotion) {
        if (widgetState.aiSelfHealing.toLowerCase() === 'ready') {
          className += ' ultra-neon-pulse';
        }
      }
      
      aiHealingEl.className = className;
    }

    // Black Hole Mode (with special ENGAGED glow and radar)
    if (blackHoleEl) {
      blackHoleEl.textContent = widgetState.blackHoleMode;
      let statusClass = getStatusClass(widgetState.blackHoleMode);
      let className = 'noc-metric-value noc-status-badge ' + statusClass;
      
      // Add special class for ENGAGED state
      if (widgetState.blackHoleMode.toLowerCase() === 'engaged') {
        className += ' black-hole-engaged';
        
        // Show radar canvas
        if (config.ultraEnhanced && config.ultraRadarRing && !prefersReducedMotion && ultraState.radarCanvas) {
          ultraState.radarCanvas.style.display = 'block';
        }
      } else {
        // Hide radar canvas
        if (ultraState.radarCanvas) {
          ultraState.radarCanvas.style.display = 'none';
        }
      }
      
      blackHoleEl.className = className;
    }

    // Predictive Failover
    if (failoverEl) {
      failoverEl.textContent = widgetState.predictiveFailover;
      const statusClass = getStatusClass(widgetState.predictiveFailover);
      failoverEl.className = 'noc-metric-value noc-status-badge ' + statusClass;
    }
  }

  // Render mini sparkline chart
  function renderChart() {
    const canvas = document.getElementById('noc-chart-canvas');
    if (!canvas || chartState.tvlHistory.length < 2) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 4;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Get data
    const data = chartState.tvlHistory;
    const dataLength = data.length;

    // Calculate min/max for scaling
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    // Draw sparkline
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(100, 255, 218, 0.8)';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    for (let i = 0; i < dataLength; i++) {
      const x = padding + (i / (dataLength - 1)) * (width - padding * 2);
      const y = height - padding - ((data[i] - min) / range) * (height - padding * 2);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(100, 255, 218, 0.3)');
    gradient.addColorStop(1, 'rgba(100, 255, 218, 0)');

    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw current value dot
    if (dataLength > 0) {
      const lastX = width - padding;
      const lastY = height - padding - ((data[dataLength - 1] - min) / range) * (height - padding * 2);
      
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#64ffda';
      ctx.fill();
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // Update timestamp display
  function updateTimestamp() {
    const timestampEl = document.getElementById('noc-timestamp');
    if (timestampEl) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      timestampEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  // Start timestamp update interval
  function startTimestampUpdate() {
    updateTimestamp();
    timestampInterval = setInterval(updateTimestamp, 1000);
  }

  // Stop timestamp update interval
  function stopTimestampUpdate() {
    if (timestampInterval) {
      clearInterval(timestampInterval);
      timestampInterval = null;
    }
  }

  // Expose global update function
  window.updateNOCWidget = function(data) {
    updateWidget(data);
  };

  // Expose global reset function
  window.resetNOCWidget = function() {
    widgetState = {
      tvl: 'N/A',
      tvlNumeric: null,
      tvlTarget: null,
      tvlCurrent: null,
      omniMesh: 'N/A',
      aiSelfHealing: 'N/A',
      blackHoleMode: 'N/A',
      predictiveFailover: 'N/A',
      cycles: null,
      lastUpdate: null
    };
    chartState = {
      tvlHistory: [],
      cyclesHistory: [],
      lastChartUpdate: 0
    };
    ultraState = {
      tvlTrailHistory: [],
      radarAngle: 0,
      radarCanvas: ultraState.radarCanvas,
      radarCtx: ultraState.radarCtx
    };
    renderWidget();
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    stopTimestampUpdate();
    stopAnimationLoop();
  });

})();
