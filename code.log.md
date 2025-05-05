# Kenmare BioQuest – Code Log

This changelog and dev journal records all development steps, decisions, issues, and resolutions.
Use it to track work, assist future maintainers, and avoid repeating mistakes.

---

## 2025-05-06

**Goal**: Re-establish clean baseline after layout bugs

**Steps Taken**:

- Restored map height to fixed 400px in JavaScript
- Reapplied original card grid layout via JS

**Issue**:

- Mobile-specific styles were inconsistently applied
- Development workflow introduced confusion between different app folders

**Solution**:

- Rolled back to verified working version using manual backup
- Planning clean project structure and GitHub integration

✅ Outcome: Site now loads with correct map and grid on desktop. Mobile layout planning deferred.

---

## Next Planned Entry

**Goal**: Set up clean GitHub repo from offline working folder (`kenmare-bioquest-starter`)

- Remove cloud + old local Git repos
- Create new Git repo in current project folder
- Push to new GitHub remote: `Telepathetica/Kenmare-BioQuest`
- Enable push/pull from Visual Studio Code UI
- Add nightly zip backup habit

## Code Log – Kenmare BioQuest

### ✅ 2025-05-06 – Mobile Mode Toggle + 2-Column Layout

- Implemented a floating mobile toggle button to switch layout mode
- Confirmed JavaScript toggle logic is working and correctly toggles the `mobile-mode` class
- Added CSS rules for `.mobile-mode` that:
  - Switch the card layout to 2 columns (`repeat(2, 1fr)`)
  - Adjust card container width to 95% and center it with `margin: 0 auto`
- Replaced inline `gridTemplateColumns` setting with `.species-card-container` class for easier styling control
- Code tested with alert and console logs to confirm button interaction and visual updates
- Committed and pushed to GitHub as checkpoint

---

### ✅ 2025-05-05 – GitHub Setup and Code Workflow

- Created clean GitHub repository: `kenmare-bioquest`
- Connected local working directory (`kenmare-bioquest-starter`) as active repository
- Verified Git operations in VS Code with visual interface (no terminal)
- Pushed initial working MVP with species data, map, and filters
- Confirmed GitHub Pages hosting is working for live preview

---

### ✅ 2025-05-05 – Species Icon Styling and Zoom Controls

- Adjusted species marker sizes dynamically in JavaScript based on screen size and species type
  - Larger icons on mobile (`40x40`, `32x32` for mammals)
  - Smaller defaults for desktop
- Added styling to `.custom-marker img` for improved visibility:
  - White background
  - Subtle border
  - Circular shape
- Scaled up Leaflet zoom controls for mobile using CSS `transform: scale(1.5)`
- Adjusted `transform-origin` and added margin to keep zoom controls visible and spaced
- Confirmed all visual changes display properly on mobile

---

### ✅ 2025-05-05 – Species Icon Styling and Zoom Controls

- Improved font sizing logic to better separate styles for `.card`, `h3`, `p`, and `span` elements
- Ensured that heading and paragraph font sizes scale independently, especially on mobile
- Increased badge/tag text size using `!important` and adjusted line height and padding
- Made time and season badge containers horizontal with scroll fallback to keep them on one line where possible
- Adjusted card padding and width to maximize use of available space while maintaining readability
- Applied spacing tweaks above/below headings and around paragraphs to reduce visual clutter on mobile
- Confirmed consistent alignment between map area and card width on mobile layout
