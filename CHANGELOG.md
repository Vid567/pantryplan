# Changelog

## 1.5.0-beta.1 - 2026-07-28

### Added

- Installable web app manifest and offline app-shell cache.
- Versioned backup format with export date and schema version.
- Validation for imported backups.
- A control for removing an item's photo.
- Clearer microphone error messages.

### Fixed

- An item at zero stock no longer adds another shopping quantity on every minus tap.
- Failed browser storage writes now restore the last successfully saved state.
- Legacy `pantrypal` data is normalized and migrated to the current storage key.
- The shopping-list bin is explicitly labelled as “bought — move to pantry”.

### Known limitations

- Voice recognition is English (`en-US`) only and may require a network connection depending on the browser.
- Photos are stored locally and remain subject to the browser's storage limit.
