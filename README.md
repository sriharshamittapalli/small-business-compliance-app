# Small Business Compliance Checker

A web application that helps US small business owners determine the laws, rules, and regulations that apply to them based on their business characteristics.

## Features

- **Single-screen interface** for easy business data entry
- **Dynamic regulation matching** based on location, industry, size, and business type
- **Scalable database structure** with efficient querying for hundreds/thousands of regulations
- **Data structure visualization** showing the backend organization
- **Clean, minimalist design** requiring no written instructions

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up the Database

1. In your Supabase dashboard, go to the SQL Editor
2. Run the migration script from `supabase/migrations/001_create_regulations_table.sql`

### 4. Seed the Database

After starting the development server, make a POST request to seed the database:

```bash
# Start the development server
npm run dev

# In another terminal, seed the database
curl -X POST http://localhost:3000/api/seed
```

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Structure

The application uses two main tables:

### `regulations`
- Stores all business regulations with filtering criteria
- Supports array fields for states, industries, and business types
- Includes employee count and revenue ranges for precise matching
- Optimized with GIN indexes for efficient array queries

### `business_profiles`
- Stores submitted business information
- Used for analytics and regulation matching history

## Key Features

### Regulation Matching Algorithm
The system matches businesses to regulations using multiple criteria:
- **Geographic**: State-based filtering
- **Industry**: Industry-specific regulations
- **Business Type**: Corporate structure requirements
- **Size**: Employee count and revenue thresholds

### Performance Optimization
- GIN indexes on array columns for fast array operations
- Range indexes for numerical filtering
- Efficient query structure to handle large regulation datasets

### User Experience
- Single-page interface with intuitive form inputs
- Real-time validation and feedback
- Clear regulation summaries with compliance requirements
- Database structure visualization for transparency

## Sample Data

The application includes sample regulations covering:
- Fair Labor Standards Act (FLSA)
- Occupational Safety and Health Act (OSHA)
- Americans with Disabilities Act (ADA)
- California Consumer Privacy Act (CCPA)
- Food Safety Modernization Act (FSMA)
- Sarbanes-Oxley Act (SOX)

## Deployment

The application is ready to deploy to platforms like Vercel, Netlify, or any Next.js-compatible hosting service. Make sure to set your environment variables in the deployment platform.

## Legal Disclaimer

This tool is for informational purposes only and should not be considered legal advice. Always consult with qualified legal professionals for specific compliance requirements.
