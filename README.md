# PantryPlan

PantryPlan is an English-language, privacy-first pantry and shopping list that runs in the browser. Data and item photos stay on the device unless the user exports a backup.

## Test build

- Landing page: https://vid567.github.io/pantryplan/
- App: https://vid567.github.io/pantryplan/pantryplan-app.html
- Guide: https://vid567.github.io/pantryplan/PantryPlan-GUIDE.html

## Core flow

1. Add or update pantry items manually or by voice.
2. Move low or missing items to the shopping list.
3. In the store, tap the pantry icon when an item is bought. This removes it from the shopping list and adds the purchased quantity to the pantry.
4. Export a JSON backup before moving to another device or clearing browser data.

## Browser support

The app is designed for current Chrome, Edge and Safari releases. Voice uses the browser's Web Speech API, follows Dutch (`nl-NL`) or English (`en-US`) device language, requests multiple recognition alternatives, and may need a network connection. Common product mishearings are corrected locally. The pantry, shopping list, photos and backups do not require an account.

## Validation

Run `node tests.mjs` to check the app script, backup validation and offline app-shell files.
