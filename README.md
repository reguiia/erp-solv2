# SolarPro ERP - Solar Installation Management System

A comprehensive ERP system designed specifically for solar installation companies in Tunisia, built with Next.js, Tailwind CSS, and Supabase.

## Features

### Core Modules
- **CRM**: Lead management, customer tracking, communication logs
- **Project Management**: Task scheduling, resource allocation, progress tracking
- **Design & Simulation**: Solar system sizing and financial calculations
- **Regulatory Compliance**: Tunisian energy regulation compliance tracking
- **Procurement & Inventory**: Supplier management, purchase orders, stock control
- **Finance**: Quotes, invoices, payments, subsidy tracking
- **Reporting & Analytics**: Real-time dashboards and KPI monitoring
- **Settings & Parametrage**: Role-based permissions and workflow customization

### Technical Features
- Multi-language support (Arabic, French, English)
- Role-based access control
- Real-time updates with Supabase
- Responsive design with Tailwind CSS
- Row Level Security (RLS) for data protection

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Authentication**: Supabase Auth with JWT
- **Database**: PostgreSQL with Row Level Security
- **Deployment**: Vercel + Supabase

## Getting Started

### Prerequisites
- Node.js 18+ 
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd solarpro-erp
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your Supabase credentials in `.env.local`:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

4. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL script from `scripts/01-initial-schema.sql`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

The application uses Supabase PostgreSQL with the following key tables:
- `user_profiles` - Extended user information with roles
- `leads` - Lead management and tracking
- `customers` - Customer information
- `projects` - Project lifecycle management
- `tasks` - Task assignment and tracking
- `communications` - Communication logs

All tables implement Row Level Security (RLS) for data protection.

## Authentication & Authorization

The system uses Supabase Auth with role-based access control:
- **Admin**: Full system access
- **Manager**: Project and team management
- **Technician**: Field operations and task management
- **Sales Rep**: CRM and lead management

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Supabase Configuration
1. Enable Row Level Security on all tables
2. Configure authentication providers as needed
3. Set up storage buckets for file uploads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software developed for BITA, Tunisia.

## Support

For technical support or questions, please contact the development team.
