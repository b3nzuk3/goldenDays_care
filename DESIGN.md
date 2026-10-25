# Golden Days storefront design

## Scope

The current milestone is a client/investor-facing frontend preview. Backend setup and delivery integrations are intentionally deferred to a later phase; preview interactions must not imply that data was saved or sent.

The public React application (`src/`) uses a warm editorial treatment selected by the project owner: cream, terracotta, generous typography, and existing home photography. The independently built `admin-dashboard/` and `server/` are outside this work. Their files, API contracts, authentication, and deployment remain unchanged.

## Visual system

- **Typography:** self-hosted Lora for headings and editorial quotations; DM Sans for body copy, controls, and navigation. Font files and their SIL Open Font Licenses live in `public/fonts/`. No third-party font requests are needed.
- **Desktop reading scale:** at 1024px and wider, the root scale is 112.5% (18px at the browser default), with 18px body copy, 19–20px page introductions, 17px service lists, and 16px navigation, form labels, and footer links. Captions and secondary metadata remain smaller at 14–15px. Keep existing mobile typography unchanged and check the full navigation at its 1280px breakpoint when tuning text size.
- **Palette:** warm cream backgrounds, deep brown foregrounds, a dark terracotta action color, and restrained oatmeal section backgrounds. Semantic CSS tokens live in `src/index.css`. The legacy `trust-blue` token maps to terracotta for compatibility with existing storefront markup.
- **Structure:** the testing homepage uses the owner-supplied community-room image as a full-width hero background extending behind the contact strip and navbar. A warm dark scrim supports the unchanged care message and links; the header becomes opaque on scroll and the mobile menu retains a solid cream surface. `src/pages/HomeHero.css` scopes this treatment to the homepage. The original animated `HeroMotion` scene sits on the right over the photograph, with a subtly translucent sky, warm orbit lines, and a soft offset shadow to integrate the sunrise artwork without a rectangular card. On phones it becomes a compact, right-aligned scene below the copy. Care services use the shared `ServiceCard` on the homepage and Services route: warm cream/oatmeal surfaces, fine borders, an asymmetric rounded corner, terracotta icons and checkmarks, and a separated contact action. Cards use three columns on desktop, two on tablets, and one on phones. Other sections retain offset photographic compositions and the large family quotation. Secondary routes share `PageHero`. The shared footer lives once in `App.tsx`.
- **Imagery:** reuse the committed care-home, team, and room assets. Avoid introducing fabricated resident or staff portraits. Missing staff photographs use initials, not unrelated stock photographs.
- **Brand:** the supplied SVG artwork is preserved in local derivatives. The compact navbar pairs the sun/house mark with the original wordmark to its right; the footer retains the stacked logo on a light backing. Tagline and telephone artwork are excluded.
- **Navigation:** all existing public destinations remain available. Active links are marked; the mobile menu supports Escape and returns focus to its trigger. A skip link targets `page-content`. Existing page titles and service copy are preserved.
- **Responsive behavior:** the navigation collapses below 1280px; primary layouts stack below 768px. The navbar uses compact vertical spacing and a smaller tour action. Controls retain visible keyboard focus. The existing sunrise reveal, gentle ambient motion, pointer parallax, and coordinated copy entrances are retained through `HeroMotion`. No pause control is added. Reduced-motion preferences show the completed scene and copy immediately, disable parallax and ambient animation, and disable smooth scrolling and header transitions.

## Behavior and content boundaries

- The existing contact form is a frontend-only simulation, **not message delivery**. Keep that limitation visible; do not claim that an inquiry was received. Contact/tour actions lead to `/contact#contact-form`, and telephone/email links provide real alternatives. Connecting email or tour delivery is a separate backend task.
- Gallery photos use the reviewed local catalog and WebP assets documented in `README.md`; no backend is required for the showcase. `VITE_GALLERY_BASE_URL` can opt into future media delivery without changing the catalog.
- Do not imply nonexistent video, brochure, chat, or family portal functionality works. Those features require their actual assets or destinations.
- Existing factual claims require owner review before publication: conflicting founding years (2010 and 2015), license `#123456`, staff identities/credentials versus the About page operator, review counts/ratings, and satisfaction statistics. Visual refinement is not verification of these claims. They were not replaced with invented facts.

## Local use

Run `npm run dev -- --host 0.0.0.0 --port 5173 --strictPort` for the storefront only. `npm run build` produces its static production bundle. Use `npx tsc -p tsconfig.app.json --noEmit` for frontend types. The root `npm run lint` also scans admin files and existing shadcn scaffolding, so distinguish pre-existing failures from changed-file lint.
