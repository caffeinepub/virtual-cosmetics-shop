# Specification

## Summary
**Goal:** Fix image loading failures in the shop interface so all 50 cosmetic items display correctly.

**Planned changes:**
- Debug and fix the image loading mechanism in CosmeticItem component
- Verify all 50 cosmetic item images exist in frontend/public/assets/generated directory
- Ensure the slug mapping function correctly converts item names to image filenames
- Fix any broken image path references causing "Failed to load" errors

**User-visible outcome:** All cosmetic items in the shop display their proper images without any "Failed to load" errors, and the fallback icon only appears for genuinely missing images.
