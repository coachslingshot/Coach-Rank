# Coach Rank - Netlify Deployment Guide

## Quick Start (5 Minutes)

### Prerequisites
- GitHub account
- Netlify account (free at netlify.com)
- Supabase project set up
- Stripe account configured

---

## Step 1: Push Code to GitHub

### Option A: Using GitHub Desktop (Easiest)
1. Download GitHub Desktop from https://desktop.github.com/
2. Open GitHub Desktop
3. File → Add Local Repository
4. Choose folder: `c:\Users\marcw\.gemini\antigravity\playground\cobalt-oort`
5. Click "Create repository" (if not already a repo)
6. Add summary: "Initial commit - Coach Rank app"
7. Click "Commit to main"
8. Click "Publish repository"
9. Choose name: `coach-rank` 
10. Uncheck "Keep this code private" (or keep private if preferred)
11. Click "Publish repository"

### Option B: Using Git Command Line
```bash
cd c:\Users\marcw\.gemini\antigravity\playground\cobalt-oort

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Coach Rank application"

# Create GitHub repo and push (follow GitHub's instructions)
# Or use: gh repo create coach-rank --public --source=. --push
```

---

## Step 2: Set Up Supabase

1. **Go to** https://supabase.com
2. **Create new project**
   - Organization: Create or select
   - Name: `coach-rank`
   - Database Password: (save this!)
   - Region: Choose closest to your users

3. **Wait for project creation** (~2 minutes)

4. **Run database setup**
   - Click "SQL Editor" in left menu
   - Click "New query"
   - Copy contents of `supabase/schema.sql`
   - Paste and click "Run"
   - Success! ✅

5. **Load sample data**
   - Create another new query
   - Copy contents of `supabase/seed.sql`
   - Paste and click "Run"
   - You now have 50 coaches in the database! ✅

6. **Get your credentials**
   - Click "Settings" (gear icon) → "API"
   - Copy these values:
     ```
     Project URL: https://xxxxx.supabase.co
     anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

---

## Step 3: Set Up Stripe

1. **Go to** https://stripe.com
2. **Create account** or sign in
3. **Switch to Test Mode** (toggle in top right)

4. **Create Premium Subscription Product**
   - Products → Click "Add product"
   - Name: `Coach Rank Premium`
   - Description: `Monthly premium subscription`
   - Price: `$19.00`
   - Billing: `Recurring` → `Monthly`
   - Click "Save product"
   - **Copy Price ID**: `price_xxxxx` (you'll need this)

5. **Create Custom Report Product**
   - Products → Click "Add product"
   - Name: `Custom Coach Report`
   - Description: `One-time custom report`
   - Price: `$497.00`
   - Billing: `One time`
   - Click "Save product"
   - **Copy Price ID**: `price_xxxxx` (you'll need this)

6. **Get API Keys**
   - Developers → API keys
   - **Copy these**:
     ```
     Publishable key: pk_test_xxxxx
     Secret key: sk_test_xxxxx (click "Reveal")
     ```

7. **Set up Webhook** (we'll complete this after Netlify deployment)
   - Developers → Webhooks → "Add endpoint"
   - Endpoint URL: `(we'll add this after deployment)`
   - Events: Select:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Click "Add endpoint"
   - **Copy Signing secret**: `whsec_xxxxx`

---

## Step 4: Deploy to Netlify

1. **Go to** https://app.netlify.com/
2. **Sign up/Login** (use GitHub for easy connection)

3. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Click "Deploy with GitHub"
   - Authorize Netlify (if first time)
   - Search and select your `coach-rank` repository
   - Click on it

4. **Configure Build Settings**
   - Site name: `coach-rank` (or choose your own)
   - Branch: `main`
   - Build command: `npm run build` ✅ (auto-detected)
   - Publish directory: `.next` ✅ (auto-detected)
   - Click "Show advanced" → "New variable" to add environment variables:

5. **Add Environment Variables** (Click "Add variable" for each)
   
   **Supabase Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   **Stripe Variables:**
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_xxxxx
   STRIPE_SECRET_KEY = sk_test_xxxxx
   STRIPE_WEBHOOK_SECRET = whsec_xxxxx
   STRIPE_PREMIUM_PRICE_ID = price_xxxxx (from subscription product)
   STRIPE_CUSTOM_REPORT_PRICE_ID = price_xxxxx (from custom report product)
   ```

   **App Variables:**
   ```
   NEXT_PUBLIC_APP_URL = (leave empty for now, we'll add after deployment)
   ```

6. **Deploy!**
   - Click "Deploy site"
   - Wait 2-3 minutes for build
   - Watch the deploy log for any errors

7. **Get your site URL**
   - After successful deploy, you'll see: `https://xxxxx.netlify.app`
   - Click "Site settings" → "Change site name" to customize
   - New URL: `https://coach-rank.netlify.app` (or your choice)

---

## Step 5: Update Configuration

### Update Stripe Webhook URL
1. Go back to Stripe Dashboard
2. Developers → Webhooks → Click your endpoint
3. Click "Update details"
4. Endpoint URL: `https://coach-rank.netlify.app/api/webhooks/stripe`
5. Save

### Update Netlify Environment Variable
1. Back in Netlify: Site settings → Environment variables
2. Find `NEXT_PUBLIC_APP_URL`
3. Edit value to: `https://coach-rank.netlify.app`
4. Save
5. Click "Deploys" → "Trigger deploy" → "Clear cache and deploy"

### Update Supabase URLs (for authentication redirects)
1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Site URL: `https://coach-rank.netlify.app`
4. Redirect URLs: Add:
   - `https://coach-rank.netlify.app/auth/callback`
   - `https://coach-rank.netlify.app/**`
5. Save

---

## Step 6: Test Your Live Site! 🚀

Visit `https://coach-rank.netlify.app` and test:

### Basic Features
- [ ] Homepage loads with top 25 coaches
- [ ] Search bar works
- [ ] Click on a coach to view profile
- [ ] Charts and radar visualization display
- [ ] All 50 coaches visible on /coaches page

### Authentication
- [ ] Click "Sign up" - create account
- [ ] Check email for confirmation
- [ ] Confirm email and log in
- [ ] Dashboard redirects work

### Premium Features
- [ ] Premium content shows paywall
- [ ] Click "Go Premium" button
- [ ] Stripe checkout page loads
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Expiry: any future date (e.g., 12/34)
- [ ] CVC: any 3 digits (e.g., 123)
- [ ] ZIP: any 5 digits (e.g., 12345)
- [ ] Complete payment
- [ ] Redirects back to site
- [ ] Premium content unlocked

### Player Survey
- [ ] Go to /survey
- [ ] Select a coach
- [ ] Submit rating
- [ ] Success confirmation shows

---

## Step 7: Going Live (Production)

When ready for real users:

### Switch Stripe to Live Mode
1. Stripe Dashboard → Toggle "Test mode" OFF
2. Create products again in live mode (same prices)
3. Get live API keys (Developers → API keys)
4. Update Netlify environment variables with live keys:
   - `pk_live_xxxxx` instead of `pk_test_xxxxx`
   - `sk_live_xxxxx` instead of `sk_test_xxxxx`
5. Update webhook URL in live mode
6. Redeploy site

### Custom Domain (Optional)
1. Buy domain (e.g., from Namecheap, GoDaddy)
2. Netlify: Site settings → Domain management → Add custom domain
3. Follow DNS configuration instructions
4. Update all URLs in environment variables
5. Update Stripe webhook URL
6. Update Supabase redirect URLs

---

## Continuous Deployment

**Every time you push to GitHub, Netlify automatically:**
- Pulls latest code
- Runs `npm install`
- Runs `npm run build`
- Deploys new version
- Takes ~2-3 minutes

To update your site:
1. Make changes locally
2. Commit: `git commit -am "Your changes"`
3. Push: `git push`
4. Netlify auto-deploys!

---

## Monitoring & Logs

### View Deployment Logs
- Netlify Dashboard → Deploys → Click any deploy → View deploy log

### View Function Logs (API Routes)
- Netlify Dashboard → Functions → Click function → View logs

### Troubleshooting
- **Build fails**: Check deploy log for errors
- **API routes 404**: Verify environment variables are set
- **Stripe checkout fails**: Verify webhook secret is correct
- **Database errors**: Check Supabase logs, verify RLS policies

---

## Cost Breakdown

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Netlify | Starter | $0 (or $19 for more features) |
| Supabase | Free tier | $0 (or $25 for Pro) |
| Stripe | Pay-per-use | 2.9% + $0.30 per transaction |
| GitHub | Free | $0 |
| **Total** | | **$0-44/month** |

**Free tier limits:**
- Netlify: 100GB bandwidth, 300 build minutes
- Supabase: 500MB database, 2GB bandwidth

---

## 🎉 You're Live!

Your Coach Rank application is now:
- ✅ Deployed to production
- ✅ Accessible worldwide at your Netlify URL
- ✅ Automatically building on every code push
- ✅ Processing real payments (when in live mode)
- ✅ Storing data in Supabase
- ✅ Ready for users!

**Next steps:**
- Share your URL with users
- Monitor analytics
- Collect feedback
- Add more coaches to database
- Build custom features

---

## Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs

**Your Coach Rank app is ready to rank coaches! 🏈**
