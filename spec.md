# Specification

## Summary
**Goal:** Add backend-persisted favorites for KD Trust and a live NOC mini-widget with polled status updates to the KD Trust page.

**Planned changes:**
- Add a stable `HashMap<Principal, [Text]>` variable in the Motoko backend actor to store per-user favorites, surviving canister upgrades
- Implement `getFavorites` query method returning the caller's stored favorite tool names (or `[]` if none)
- Implement `setFavorites` update method that overwrites the caller's stored favorites with a provided `[Text]` list
- Update the `useKDTrustFavorites` frontend hook to load/save favorites from the backend for authenticated users; merge and clear localStorage favorites on login; fall back to localStorage for unauthenticated users
- Add a NOC mini-widget to `KDTrustPage.tsx` displaying live status for Omni-Mesh, AI Self-Healing, Black Hole Mode, and Predictive Failover, polled every 5 seconds from the backend actor
- Each NOC status badge uses CSS keyframe animations to glow and pulse, color-coded: ACTIVE=green, IDLE=gray, INACTIVE=red, READY=yellow, NOT READY=orange, with smooth CSS transitions on status changes

**User-visible outcome:** Authenticated users see their KD Trust favorites persisted across sessions and devices via the backend. The KD Trust page also shows a live NOC widget with animated, color-coded status badges that refresh every 5 seconds.
