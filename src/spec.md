# Specification

## Summary
**Goal:** Integrate the KD.WebAI NOC v13.0 “Singularity Protocol” features into the existing ICP-native KD Platform (single Motoko canister + React app), exposing new canister methods and a new NOC dashboard route.

**Planned changes:**
- Add an ICP-native NOC domain to the existing Motoko single-actor canister (backend/main.mo) with candid-exposed methods for AI status, DAO proposals + voting, treasury status, ZK solvency proof generation + current root, omni-mesh status, and a universal launch state toggle.
- Persist NOC state in stable, upgrade-safe storage (AI/Treasury status, DAO proposals + votes, ZK root + last proof time, omni-mesh status, universal launch/black-hole flags) and add a conditional migration module only if needed to preserve existing state across upgrades.
- Implement principal-based RBAC and a user registry (admin principal via init; register; admin-only addUser/removeUser; getUserCount; getUser; isAdmin) without breaking existing dashboard AccessControl/Users flows.
- Add a new React route (e.g., `/kd-platform/noc`) that renders a NOC dashboard page with sections/cards for AI Status, Treasury Metrics (including TVL string), DAO Proposals (list + vote buttons), ZK Root + “Generate Solvency Proof”, Omni-mesh status, and a Universal Launch overlay trigger (English text only).
- Add React Query hooks in `frontend/src/hooks/useQueries.ts` for NOC data/actions using the existing actor flow: getAIStatus, getTreasuryStatus, getDaoProposals, voteOnProposal (invalidate proposals), getZkCurrentRoot, generateZkSolvencyProof (refetch root), getOmniMeshStatus, startUniversalLaunch (or equivalent).
- Add an admin-only “NOC Admin” section on the NOC page (rendered only when backend isAdmin is true) to add/remove users by Principal and toggle universal launch/black-hole mode state.
- Port NOC UI components into the existing React+Tailwind app as components (ComplianceShield, InstitutionalConsole, UniversalLaunchOverlay), replacing any REST fetches or undefined actor helpers with the existing actor + React Query hooks.
- Add a navigation entry (desktop and mobile) to reach the NOC route while keeping existing KD Platform routes intact.
- Update project documentation/config to reflect ICP-native (dfx-based) deployment and verification via `dfx canister call`, without requiring Vercel/Node proxy routes.

**User-visible outcome:** Users can navigate to a new NOC dashboard within the KD Platform to view AI/treasury/DAO/ZK/omni-mesh status, vote on proposals, generate ZK solvency proofs, and trigger universal launch; admins can manage users by Principal and access admin-only launch controls.
