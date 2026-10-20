# Golden Days storefront design

## Scope

The current milestone is a client/investor-facing frontend preview. Backend setup and delivery integrations are intentionally deferred to a later phase; preview interactions must not imply that data was saved or sent.

The public React application (`src/`) uses a warm editorial treatment selected by the project owner: cream, terracotta, generous typography, and existing home photography. The independently built `admin-dashboard/` and `server/` are outside this work. Their files, API contracts, authentication, and deployment remain unchanged.

## Visual system

- **Typography:** self-hosted Lora for headings and editorial quotations; DM Sans for body copy, controls, and navigation. Font files and their SIL Open Font Licenses live in `public/fonts/`. No third-party font requests are needed.
- **Desktop reading scale:** at 1024px and wider, the root scale is 112.5% (18px at the browser default), with 18px body copy, 19–20px page introductions, 17px service lists, and 16px navigation, form labels, and footer links. Captions and secondary metadata remain smaller at 14–15px. Keep existing mobile typography unchanged and check the full navigation at its 1280px breakpoint when tuning text size.
- **Palette:** warm cream backgrounds, deep brown foregrounds, a dark terracotta action color, and restrained oatmeal section backgrounds. Semantic CSS tokens live in `src/index.css`. The legacy `trust-blue` token maps to terracotta for compatibility with existing storefront markup.
- **Structure:** split home hero keeps readable text off people's faces. Border-separated care entries, offset photographic compositions, and a large family quotation replace repeated shadowed card bands. Secondary routes share `PageHero`. The shared footer lives once in `App.tsx`.
- **Imagery:** reuse the committed care-home, team, and room assets. Avoid introducing fabricated resident or staff portraits. Missing staff photographs use initials, not unrelated stock photographs.
- **Navigation:** all existing public destinations remain available. Active links are marked; the mobile menu supports Escape and returns focus to its trigger. A skip link targets `page-content`. Existing page titles and service copy are preserved.
- **Responsive behavior:** the navigation collapses below 1280px; primary layouts stack below 768px. Controls retain visible keyboard focus. Reduced-motion preferences disable the single hero reveal and smooth scrolling.

## Behavior and content boundaries

- The existing contact form is a frontend-only simulation, **not message delivery**. Keep that limitation visible; do not claim that an inquiry was received. Contact/tour actions lead to `/contact#contact-form`, and telephone/email links provide real alternatives. Connecting email or tour delivery is a separate backend task.
- Gallery photos continue to use `VITE_API_URL` (fallback `http://localhost:5000/api`) and the existing public photos API. Keep failure, loading, and empty states explicit. Do not manufacture records to conceal an unavailable API.
- Do not imply nonexistent video, brochure, chat, or family portal functionality works. Those features require their actual assets or destinations.
- Existing factual claims require owner review before publication: conflicting founding years (2010 and 2015), license `#123456`, staff identities/credentials versus the About page operator, review counts/ratings, and satisfaction statistics. Visual refinement is not verification of these claims. They were not replaced with invented facts.

## Local use

Run `npm run dev -- --host 0.0.0.0 --port 5173 --strictPort` for the storefront only. `npm run build` produces its static production bundle. Use `npx tsc -p tsconfig.app.json --noEmit` for frontend types. The root `npm run lint` also scans admin files and existing shadcn scaffolding, so distinguish pre-existing failures from changed-file lint.
