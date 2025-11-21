# Deployment Guide

This project uses Cloudflare Pages with Functions to secure the Gemini API integration.

## 1. Prerequisites

- A [Cloudflare Account](https://dash.cloudflare.com/sign-up).
- A [Gemini API Key](https://aistudio.google.com/app/apikey).

## 2. Deployment to Cloudflare Pages

You can deploy this project in two ways: via Git integration (recommended) or Direct Upload.

### Option A: Git Integration (Recommended)
1. Push this code to a GitHub/GitLab repository.
2. Log in to the Cloudflare Dashboard.
3. Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
4. Select your repository.
5. **Build Settings:**
   - **Framework Preset:** None (Static HTML)
   - **Build Command:** (Leave empty)
   - **Build Output Directory:** `.` (or leave empty if root)
   - **Root Directory:** `/` (default)

### Option B: Direct Upload
1. Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Upload Assets**.
2. Drag and drop your project folder.

## 3. Setting Environment Variables (CRITICAL)

Your functions will fail without the API key. You must set this in the Cloudflare dashboard.

1. After your project is initialized (or after the first failed deployment), go to your Pages project settings.
2. Navigate to **Settings** -> **Environment Variables**.
3. Add a new variable:
   - **Variable name:** `GEMINI_API_KEY`
   - **Value:** Paste your Gemini API Key here.
   - **Encrypt:** Yes (Recommended)
4. **Redeploy** your project for the changes to take effect (Go to **Deployments** -> **Create New Deployment**).

## 4. Local Development

To run this locally with Cloudflare features, use Wrangler:

```bash
npx wrangler pages dev . --binding GEMINI_API_KEY="your-api-key"
```

This will simulate the Cloudflare Functions environment on your local machine.
