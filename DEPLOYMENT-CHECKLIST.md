# Production Deployment Checklist

## Pre-Build Requirements
- [ ] Node.js 18+ installed
- [ ] Git repository initialized
- [ ] All files committed

## Environment Setup
- [ ] Supabase project created
- [ ] Database schema deployed (`supabase/schema.sql`)
- [ ] Seed data loaded (`supabase/seed.sql`)
- [ ] Supabase URL and keys obtained
- [ ] Stripe account created
- [ ] Stripe products created ($19/mo + $497 custom report)
- [ ] Stripe webhook configured
- [ ] All environment variables ready

## Build & Test
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables in `.env.local`
- [ ] Production build successful (`npm run build`)
- [ ] Type check passed (`npm run type-check`)
- [ ] Lint check passed (`npm run lint`)
- [ ] Local production test (`npm run start`)

## Deployment Configuration
- [ ] Netlify/Vercel account created
- [ ] Repository connected
- [ ] Build settings configured
- [ ] Environment variables set in platform
- [ ] Custom domain configured (optional)

## Post-Deployment
- [ ] Stripe webhook URL updated to production
- [ ] Supabase redirect URLs updated
- [ ] All features tested in production
- [ ] Payment flow tested (test mode)
- [ ] Authentication tested
- [ ] Premium features verified
- [ ] Survey submission working
- [ ] Charts rendering correctly

## Launch
- [ ] Switch Stripe to live mode
- [ ] Enable monitoring/analytics
- [ ] Set up error tracking
- [ ] Document admin procedures
- [ ] Ready for users! 🚀

## File to Send to Deployment Team
After completing above steps, create ZIP with:
- All project files
- `.env.example` (NOT `.env.local`)
- `DEPLOYMENT.md` guide
- `README.md`

**Exclude from ZIP:**
- `node_modules/`
- `.next/`
- `.env.local`
- `.git/`
