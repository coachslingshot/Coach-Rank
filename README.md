# Coach Rank - D1 Football Coach Rankings

A full-stack web application for ranking Division I football coaches based on data-driven metrics.

## Features

### Scoring System
- **ATS Performance (40%)**: Against the spread success rate
- **Talent Maximization (35%)**: NFL placements vs blue-chip recruits ratio
- **Player Experience (25%)**: Retention rate + anonymous player ratings

### Frontend
- Top 25 coach rankings homepage
- Searchable coach database with filtering
- Detailed coach profile pages with charts and analytics
- Anonymous player survey system
- Premium subscription with Stripe integration

### Premium Features
- Deep analytics and historical trends
- Custom coach comparisons
- Advanced filtering and insights
- Ad-free experience

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Charts**: Recharts
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cobalt-oort
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file based on `.env.example`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe Price IDs
STRIPE_PREMIUM_PRICE_ID=price_premium_monthly
STRIPE_CUSTOM_REPORT_PRICE_ID=price_custom_report
```

4. Set up the database:

- Create a new Supabase project
- Run the SQL script in `supabase/schema.sql` in the Supabase SQL Editor

5. Configure Stripe:

- Create products and prices in Stripe Dashboard
- Set up webhook endpoint pointing to `/api/webhooks/stripe`
- Add webhook secret to environment variables

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Deployment to Netlify

1. Connect your repository to Netlify
2. Configure environment variables in Netlify dashboard
3. Deploy!

Netlify will automatically:
- Install dependencies
- Build the Next.js application
- Deploy to production

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── coaches/           # Coach listing and profiles
│   ├── dashboard/         # Premium dashboard
│   ├── subscribe/         # Subscription page
│   └── survey/            # Player survey
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── ...               # Feature components
├── lib/                   # Utility libraries
│   ├── auth/             # Authentication helpers
│   ├── scoring/          # Scoring algorithms
│   ├── stripe/           # Stripe utilities
│   ├── supabase/         # Supabase clients
│   └── utils/            # General utilities
├── supabase/             # Database schema
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Data Management

### Adding Coaches

Use the API endpoint `/api/coaches` to add new coaches:

```typescript
POST /api/coaches
{
  "name": "Coach Name",
  "school": "University Name",
  "conference": "Conference Name",
  // ... other fields
}
```

### CSV Upload

Upload bulk data via the admin interface (authentication required):
- ATS records by season
- NFL placement data
- Blue-chip recruit counts

### Player Survey

Anonymous survey available at `/survey` for players to rate their coaches.

## Scoring Algorithms

Located in `lib/scoring/`:

- `ats-calculator.ts`: ATS grading (55%+ = A)
- `talent-calculator.ts`: NFL/recruit ratio
- `experience-calculator.ts`: Retention + player ratings
- `composite-calculator.ts`: Weighted overall score

## License

All rights reserved.

## Support

For questions or issues, please contact support.
