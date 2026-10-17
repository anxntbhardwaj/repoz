<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the expedition cover and its pointer/touch snowfield in separate browser-safe components; this isolates animation cleanup and leaves booking/planner logic unchanged.
- Render original day/night brand assets through a clipped, aspect-ratio-stable Logo wrapper; their transparent canvas margins must not determine visible logo size.
- Size the expedition cover from its content with reserved header and footer space, and keep dialog grid children min-width-zero so narrow screens cannot crop booking controls.
- Keep official media in CDN asset pointers and select expedition cover sources with a responsive picture element; this avoids loading both phone and desktop backgrounds.
- Keep the About section and its swipeable guide gallery in a browser-safe component using Embla; this preserves accessible manual controls and isolates gallery state from booking logic.

- Match traveller preferences deterministically in the browser against the supplied catalogue; preserve original stop days and leave price/availability confirmation to the team to avoid fabricated plans.
- Keep the reviews carousel and scroll celebration in a separate browser-safe component using Embla; isolate gesture and animation state from booking.
- Centralize social prompt timing and alternation in a browser-safe module so recurring prompts can be tested independently.
- Render only the active trip-detail section and retain the last tour during dialog exit; this prevents stacked content and blank closing animations.
- Use Embla Auto Scroll for continuous reviews and a requestAnimationFrame-driven DestinationStrip for the destination strip; CSS keyframes were frozen by OS reduced-motion settings on laptops.
- Keep drafted route data explicitly marked suggested through catalogue and planner views; this distinguishes proposals from owner-supplied itineraries.
- Give each main site section (tours, about, gallery, reviews, contact) its own route reusing the homepage section component, with per-page head via src/lib/seo.ts and router-derived sitemap decisions; Google sitelinks need crawlable real pages, not hash anchors.
- Each catalogue trip has a crawlable /tours/$id page (TouristTrip JSON-LD) listed in the sitemap from TOURS; public/llms.txt and robots.txt must stay in sync with the catalogue and official contact details.
