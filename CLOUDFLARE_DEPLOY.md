# Cloudflare Pages Deployment Manual: GraySync

This document outlines the steps to deploy the GraySync web application to Cloudflare Pages.

---

## 1. Step-by-Step Deployment Guide

### Step 1: Push Project Code to GitHub

- Make sure all modifications are committed and pushed to your remote repository:

  ```bash
  git add .
  git commit -m "chore: prepare for production release on cloudflare pages"
  git push origin main
  ```

### Step 2: Open Cloudflare Dashboard

- Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
- Navigate to the **Workers & Pages** section on the left sidebar.

### Step 3: Create a Cloudflare Pages Application

- Click the **Create** button, then select the **Pages** tab.
- Click **Connect to Git** to link your GitHub account.

### Step 4: Import the Repository

- Select the repository containing your GraySync project and click **Begin setup**.

### Step 5: Configure Build Parameters

Configure the build settings exactly as follows:

- **Project Name**: `graysync` (or your preferred subdomain)
- **Production Branch**: `main`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Root Directory**: `/`

### Step 6: Deploy

- Click **Save and Deploy**. Cloudflare Pages will spin up a build container, install dependencies, compile the Vite production assets, and publish your site to a `*.pages.dev` domain.

---

## 2. Environment Variables

- No custom build-time or runtime environment variables are required.

---

## 3. Troubleshooting Guide

### Issue: Single Page Application Routes Return 404 on Refresh

- **Cause**: Cloudflare Pages by default tries to resolve sub-directories directly on the server, which fails on SPAs using history-state navigation.
- **Solution**: The `public/_redirects` file is included in this repository. It defines `/* /index.html 200` to redirect all sub-routes to index.html safely. Ensure it is copied to the root of your deployment (Vite automatically handles this from the `public` folder).

### Issue: Dependency Caching or Legacy Node version mismatch

- **Solution**: Ensure your build configuration is running Node.js 18+ (you can set the environment variable `NODE_VERSION` to `20` in the Pages build settings if needed).

---

## 4. Rollback Instructions

If a deployment introduces issues, you can roll back instantly:

1. In the Cloudflare Dashboard, go to **Workers & Pages** > **GraySync** > **Deployments**.
2. Find the last known working deployment in the history list.
3. Click the three dots next to it and select **Rollback to this deployment**.
4. Confirm the rollback. The Edge routing shifts instantly to the selected build.
