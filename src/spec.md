# Specification

## Summary
**Goal:** Make the KD Platform dashboard work reliably on fresh ICP deployments by seeding an initial user in the Motoko canister, adding an admin-only “add user” workflow, and gating dashboard data behind Internet Identity with clear English prompts.

**Planned changes:**
- Backend (Motoko canister): add idempotent initialization seeding so `getTotalUsers()` returns >= 1 after first setup, without duplicating or modifying existing users.
- Backend (Motoko canister): add an admin-only method to create a user record (name + email) and update the stored total user count.
- Frontend (KD dashboard): add an admin-only “Admin” section with name/email inputs and an “Add user” action that calls the canister method and refreshes the “Total Users” card via refetch/invalidation.
- Frontend (KD dashboard): add an auth/authorization guard that prompts users (in English) to sign in with Internet Identity when they are not allowed to load protected dashboard data.

**User-visible outcome:** On a new deployment the dashboard no longer shows 0 users by default; admins can sign in with Internet Identity and add users from the dashboard, and non-authenticated/non-admin users see a clear English sign-in prompt instead of errors.
