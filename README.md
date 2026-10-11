# ChefMaster Africa — enhanced website + backend starter

This project contains:
- Responsive frontend with recipe search and categories
- Detailed recipe instructions and ingredient checklists
- Interactive Cook Mode with step navigation and timers
- “What can I cook?” ingredient finder
- Favorites stored in the current browser
- Cloudflare Pages Functions API for reading/adding/deleting recipes
- Cloudflare D1 SQL schema
- A simple recipe-administration form protected by a server-side API key

## Honest status / limitations
The frontend works in demo mode using the sample recipes included in `index.html`. A real shared database only works after you configure Cloudflare Pages Functions and D1. This starter does not implement end-user accounts or personal saved favorites across devices. Favorites are browser-local. The admin API uses a single secret key; it is suitable only as a simple owner-only starter, not a multi-user role system. Do not share the admin key. Add stronger access controls before a public commercial launch.

## Android + Cloudflare: recommended deployment path
Because this project includes backend Functions, **do not use the simple ZIP drag-and-drop deployment for the full-stack version**. Use a Git-connected Cloudflare Pages project, or deploy with Wrangler from a development environment. On Android, GitHub web upload is possible, but may be fiddly.

### A. Upload files to GitHub using Android browser
1. Sign in at https://github.com and create a new repository named `chefmaster-africa`.
2. Open the repository, choose **Add file → Upload files**.
3. Upload `index.html`, `wrangler.toml`, the `functions` folder and `migrations` folder. GitHub's web uploader may require uploading files in batches; ensure folder paths are preserved. The easiest reliable method is uploading the ZIP to a repository only if GitHub supports extracting it in your workflow; GitHub does not automatically unpack ZIPs into a repository.
4. Commit the files.

### B. Connect Cloudflare Pages to Git
1. Open https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Connect GitHub and select the `chefmaster-africa` repository.
3. Choose no framework / static HTML. Build command: leave blank. Build output directory: `.`.
4. Deploy. The Pages Functions under `functions/` are included with a Git-connected Pages project.

### C. Create the D1 database
1. In Cloudflare Dashboard, open **Storage & databases → D1 SQL Database** (dashboard labels may vary).
2. Create a database named `chefmaster-africa-db`.
3. Open the database's SQL console and run the contents of `migrations/0001_create_recipes.sql`.
4. Copy the database ID from the database details.
5. In Pages project settings, add a D1 database binding named exactly `DB` pointing to that database. This binding name must match the code.
6. Add a secret environment variable named `ADMIN_API_KEY` with a long, unique random value. Do not put this key in `index.html` or commit it to GitHub.
7. Redeploy the Pages project after changing bindings/secrets.

`wrangler.toml` is included as a reference for Wrangler deployments. Replace `REPLACE_WITH_YOUR_D1_DATABASE_ID` with your actual D1 database ID if using Wrangler. Dashboard bindings can be configured without using Wrangler locally.

### D. Test
- Open your `*.pages.dev` website.
- The public API endpoint should be `/api/recipes`.
- Open the **Admin** menu on the website, enter the secret API key, and add a test recipe.
- Refresh the page; the recipe should remain because it is stored in D1.
- Never paste the admin key into chat or share it.

## Features in the frontend
- African and international starter recipes
- Search and category filters
- Recipe details and step-by-step instructions
- Ingredient checkboxes
- Cooking timers
- Favorites in local browser storage
- Ingredient-based recipe matching
- Admin recipe creation form

## Editing recipes
Seed recipes are defined in the `seed` array in `index.html`. If the D1 API has records, those are used by the frontend; otherwise it uses the sample recipes. Review and test all recipes before public use.

## Free-tier note
Cloudflare offers free tiers for many services, but usage limits and product availability can change. Hosting a static site may be free; check the current Cloudflare plan and D1 limits before relying on it for production.
