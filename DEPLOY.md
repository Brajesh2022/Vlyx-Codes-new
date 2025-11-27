# Deployment Guide (Vercel)

This project has been migrated from Cloudflare Pages to Vercel. It uses Vercel Edge Functions for the backend logic (`/api/chat` and `/api/estimate`).

## 1. Prerequisites

- A [Vercel Account](https://vercel.com/signup).
- A [Gemini API Key](https://aistudio.google.com/app/apikey).
- (Optional) [Vercel CLI](https://vercel.com/docs/cli) installed (`npm i -g vercel`) for local development or manual deployment.

## 2. Deployment to Vercel

### Option A: GitHub Integration (Recommended)
1. Push this code to a GitHub repository.
2. Log in to your Vercel Dashboard.
3. Click **Add New...** -> **Project**.
4. Import your GitHub repository.
5. **Framework Preset:** Select "Other" (since it's a static site with functions). Vercel usually auto-detects this.
6. **Root Directory:** Leave as `./`.
7. **Environment Variables:**
   - **Important:** You MUST set the `GEMINI_API_KEY` for the AI features to work.
   - Click **Environment Variables**.
   - Key: `GEMINI_API_KEY`
   - Value: Paste your Gemini API Key.
8. Click **Deploy**.

### Option B: Vercel CLI
1. Run `vercel login` in your terminal.
2. Run `vercel` in the project root.
3. Follow the prompts.
4. When asked "Want to modify these settings?", answer **No** (defaults are fine).
5. **After deployment**, go to the Vercel Dashboard for your project, navigate to **Settings** -> **Environment Variables**, and add `GEMINI_API_KEY`.
6. You may need to redeploy (`vercel --prod`) for the variable to take effect.

## 3. Environment Variables

The application relies on the following environment variable:

- `GEMINI_API_KEY`: Required for the Chat (Luna) and Estimate features.

If this variable is missing, the "brain" error ("I'm having trouble connecting to my brain right now") will appear in the chat.

## 4. Local Development

To run locally with Vercel functions:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel dev`
3. If it's your first time, it will ask to link to a Vercel project.
4. Ensure your local environment has the API key. You can pull it from Vercel:
   ```bash
   vercel env pull .env.local
   ```
   Or create a `.env` file manually with `GEMINI_API_KEY=your_key_here`.

## 5. Migration Notes (Cloudflare -> Vercel)

- **Functions Directory:** Moved from `functions/` (Cloudflare) to `api/` (Vercel).
- **Configuration:** Added `vercel.json` to handle clean URLs and routing.
- **Runtime:** Functions are configured to run on the Vercel Edge Runtime.
