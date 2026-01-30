# Coach Rank - Production Deployment Guide

## ⚠️ Important: Pre-Deployment Requirements

### 1. Install Node.js
This system does not currently have Node.js installed. You must install it before building:

1. Download Node.js 18+ from [nodejs.org](https://nodejs.org/)
2. Install and verify:
   ```bash
   node --version  # Should show v18.x.x or higher
   npm --version   # Should show v9.x.x or higher
   ```

---

## Production Build Steps

### Step 1: Install Dependencies

```bash
cd cobalt-oort
npm install
```

This will install all dependencies listed in `package.json`:
- **Production**: React, Next.js, Supabase, Stripe, Recharts, etc.
- **Development**: TypeScript, Tailwind CSS, ESLint, etc.

### Step 2: Configure Environment Variables

Create `.env.local` file (for local testing) and production environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual credentials:

#### Supabase Setup
1. Create project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Run database scripts:
   - Execute `supabase/schema.sql` in SQL Editor
   - Execute `supabase/seed.sql` for sample data (50 coaches)

#### Stripe Setup
1. Create account at [stripe.com](https://stripe.com)
2. Create products:
   - Premium Subscription: $19/month recurring
   - Custom Report: $497 one-time payment
3. Get API keys from Developers → API keys:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```
4. Set up webhook:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook secret:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
5. Copy product price IDs:
   ```
   STRIPE_PREMIUM_PRICE_ID=price_...
   STRIPE_CUSTOM_REPORT_PRICE_ID=price_...
   ```

#### App Configuration
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Step 3: Build for Production

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Process Tailwind CSS
- Optimize images
- Bundle and minify code
- Generate `.next` directory with production build
- Create static and server-rendered pages

**Expected output:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB          120 kB
├ ○ /api/coaches                         0 B             0 B
├ ○ /coaches                             8.1 kB          125 kB
├ ○ /coaches/[id]                        12.3 kB         130 kB
├ ○ /subscribe                           6.5 kB          122 kB
└ ... more routes
```

### Step 4: Test Production Build Locally

```bash
npm run start
```

Open http://localhost:3000 and verify:
- Homepage loads with coaches
- Search functionality works
- Coach profiles display correctly
- Charts render properly
- Authentication works
- Premium gates function

### Step 5: Type Check & Lint

```bash
npm run type-check  # Check TypeScript
npm run lint        # Check code quality
```

Fix any errors before deploying.

---

## Netlify Deployment

### Option A: Automatic Deployment (Recommended)

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub/GitLab repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
     - `NEXT_PUBLIC_APP_URL` (use your Netlify URL)
     - `STRIPE_PREMIUM_PRICE_ID`
     - `STRIPE_CUSTOM_REPORT_PRICE_ID`

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy
   - Every git push will trigger a new deployment

### Option B: Manual Deployment

1. **Build locally** (after completing steps 1-3 above)

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Login to Netlify**
   ```bash
   netlify login
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

5. **Set environment variables via CLI**
   ```bash
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_value"
   # Repeat for all variables
   ```

---

## Post-Deployment Checklist

### 1. Update Stripe Webhook URL
- Go to Stripe Dashboard → Developers → Webhooks
- Update endpoint URL to: `https://yourdomain.com/api/webhooks/stripe`
- Test webhook with sample events

### 2. Update Supabase Redirect URLs
- Go to Supabase Dashboard → Authentication → URL Configuration
- Add production URL to "Site URL" and "Redirect URLs"

### 3. Test Production Features
- [ ] Homepage loads with all coaches
- [ ] Search and filters work
- [ ] Coach profile pages display correctly
- [ ] Charts and visualizations render
- [ ] Anonymous survey submission works
- [ ] User signup/login functions
- [ ] Premium paywall displays correctly
- [ ] Stripe checkout redirects properly
- [ ] Subscription webhook processes correctly
- [ ] Premium dashboard is protected
- [ ] Custom report request works

### 4. Performance Optimization
- [ ] Enable Netlify CDN
- [ ] Configure caching headers
- [ ] Enable asset optimization
- [ ] Set up monitoring (Netlify Analytics or Google Analytics)

### 5. Security
- [ ] Verify all API routes use authentication
- [ ] Check RLS policies in Supabase
- [ ] Ensure environment variables are not exposed
- [ ] Test Stripe webhook signature verification
- [ ] Enable HTTPS (automatic with Netlify)

---

## Monitoring & Maintenance

### Logs
- **Netlify**: Functions → Function logs
- **Supabase**: Logs & Reports section
- **Stripe**: Developers → Events & logs

### Database Backups
- Supabase provides automatic daily backups
- Download manual backups from Project Settings → Database → Backups

### Updating Content
- Add coaches via API: `POST /api/coaches`
- Import CSV data (admin interface - to be built)
- Update ATS records as seasons progress

---

## Troubleshooting

### Build Fails
- Check Node.js version (must be 18+)
- Clear `.next` directory and rebuild
- Verify all dependencies are installed
- Check for TypeScript errors: `npm run type-check`

### API Routes 404
- Ensure `.next` directory is deployed
- Check Netlify function logs
- Verify environment variables are set

### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies
- Confirm schema is deployed

### Payment Issues
- Test with Stripe test mode first
- Verify webhook secret matches
- Check Stripe dashboard for detailed errors
- Ensure price IDs are correct

---

## Cost Estimates

### Monthly Operating Costs (Estimated)

| Service | Tier | Cost |
|---------|------|------|
| **Netlify** | Starter | $19/mo (or free for low traffic) |
| **Supabase** | Pro | $25/mo (includes 8GB database) |
| **Stripe** | Pay-as-you-go | 2.9% + $0.30 per transaction |
| **Domain** | Various | ~$12/year |

**Total**: ~$44/month + transaction fees

### Revenue Potential
- 100 premium subscribers: $1,900/month
- 5 custom reports: $2,485/month
- **Potential**: $4,385/month

---

## Alternative: Vercel Deployment

If you prefer Vercel over Netlify:

1. Go to [vercel.com](https://vercel.com)
2. Import repository
3. No build configuration needed (auto-detected)
4. Add environment variables
5. Deploy

Vercel is optimized for Next.js and may offer better performance.

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Netlify Docs**: https://docs.netlify.com

---

## Created Files Summary

This project contains **45+ production-ready files**:
- 8 configuration files
- 2 database schema files
- 4 scoring algorithm files
- 5 API route files
- 9 page files
- 9 React components
- 8+ utility files
- Full TypeScript type definitions
- Comprehensive documentation

**Ready for deployment after Node.js installation and build process completion.**
