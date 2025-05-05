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
