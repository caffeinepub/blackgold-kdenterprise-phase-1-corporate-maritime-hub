# Specification

## Summary
**Goal:** Add an authenticated Universal Launch Report tab/page in the KD Platform that matches KD/NOC styling and shows live canister metrics refreshed every 10 seconds.

**Planned changes:**
- Create a new authenticated Universal Launch Report React page/component in the KD Platform area, styled with existing kd-* Tailwind tokens and English-only UI text.
- Add a TanStack Router route for the report in `frontend/src/App.tsx` and add a navigation entry in `frontend/src/pages/KDDashboardPage.tsx` to open it.
- Implement live metric fetching on the report page via existing React Query + actor flow: treasury status/TVL (`getTreasuryStatus`), Omni-Mesh status (`getOmniMeshStatus`), cycles balance (new query), and DAO proposals (`getDaoProposals`), with polling every 10 seconds plus loading/error states.
- Add a new RBAC-gated public query method `getCyclesBalance` to the existing single Motoko actor in `backend/main.mo` (no migration changes).
- Update frontend canister/type bindings so `getCyclesBalance` is available in TypeScript and callable through the existing typed actor bindings.

**User-visible outcome:** Authenticated users can navigate to a new “Universal Launch Report” tab in the KD Platform dashboard and view continuously refreshing (10s) treasury/TVL, Omni-Mesh status, cycles balance, and a live list of DAO proposals with resilient loading/error handling.
