# Specification

## Summary
**Goal:** Add frontend-only Internet Identity authentication to the KD Trust page, with a login gate, header principal display, and guest mode support.

**Planned changes:**
- Add a login gate to `KDTrustPage.tsx` that shows a centered "Login with Internet Identity" button when the user is unauthenticated, using the existing `useInternetIdentity` hook
- After successful login, show the full KD Trust dashboard and AI Hub content
- Update `Layout.tsx` navigation header to display the authenticated user's truncated principal (first 8 + last 4 characters) and a Logout button when logged in; hide both when unauthenticated
- Allow unauthenticated users to browse the AI Hub and KD Trust dashboard in guest mode (no full block)
- Show a non-blocking banner/card on the KD Trust page prompting unauthenticated users to log in for personalized favorites
- Favorites continue to work via localStorage for unauthenticated users (existing `useKDTrustFavorites` hook)
- Show a visual indicator to authenticated users that their favorites are saved to their identity

**User-visible outcome:** Users visiting the KD Trust page can browse content as guests with a login prompt banner, or log in via Internet Identity to get a personalized experience with their principal shown in the header and a logout option available.
