# AB Function Hall - Booking Management System

A modern, full-stack booking management website for **AB Function Hall** in Guntakal. This platform enables clients to book the function hall for various events and provides an admin dashboard for managing bookings efficiently.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)

## 🌟 Features

### User Features
- **Event Booking System**: Book the function hall with date range selection, event type, and guest count
- **User Authentication**: Secure login and registration system with email/password
- **My Bookings**: View and track personal booking history with status updates
- **AI Chatbot Assistant**: Get instant answers about the venue, amenities, and booking process
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### Admin Features
- **Admin Dashboard**: Comprehensive view of all booking requests
- **Booking Management**: Approve or reject bookings with real-time status updates
- **Email Notifications**: Automatic notifications when new bookings are submitted
- **Google Sheets Integration**: Sync approved bookings to Google Sheets for record-keeping
- **Protected Routes**: Secure admin access with authentication middleware

### Venue Highlights
- Capacity: Up to 500 guests
- Premium catering services
- State-of-the-art sound & lighting systems
- Elegant interior decoration options
- Professional event management support
- Ample parking space

## 🚀 Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn UI Components
- Framer Motion (animations)

**Backend:**
- Next.js API Routes
- Drizzle ORM
- Turso (SQLite) Database
- Better-auth (authentication)

**Additional Services:**
- Resend (email notifications)
- Google Sheets API (booking records)
- AI Chatbot integration

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd ab-function-hall
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory with the following variables:
   
   ```env
   # Database (Turso)
   TURSO_DATABASE_URL=your_turso_database_url
   TURSO_AUTH_TOKEN=your_turso_auth_token
   
   # Better Auth
   BETTER_AUTH_SECRET=your_auth_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   
   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   ADMIN_EMAIL=your_admin_email@example.com
   
   # Google Sheets API
   GOOGLE_CLIENT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY=your_private_key
   GOOGLE_SHEET_ID=your_google_sheet_id
   ```
   
   **Note**: See `.env.example` for a template with all required variables.

4. **Database Setup**
   ```bash
   # Generate database migrations
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ab-function-hall/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin dashboard
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── bookings/       # Booking CRUD operations
│   │   │   └── my-bookings/    # User booking history
│   │   ├── booking/            # Booking form page
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── my-bookings/        # User bookings page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── ChatBot.tsx         # AI chatbot component
│   │   ├── Header.tsx          # Navigation header
│   │   └── Footer.tsx          # Site footer
│   ├── db/                     # Database configuration
│   │   ├── schema.ts           # Drizzle schema definitions
│   │   └── seeds/              # Database seeders
│   ├── lib/                    # Utility functions
│   │   ├── auth.ts             # Better-auth server config
│   │   └── auth-client.ts      # Better-auth client config
│   └── hooks/                  # Custom React hooks
├── drizzle/                    # Drizzle migrations
├── public/                     # Static assets
├── .env                        # Environment variables (gitignored)
├── drizzle.config.ts           # Drizzle configuration
├── middleware.ts               # Auth middleware
└── package.json                # Dependencies
```

## 🔑 Key Features Explained

### Booking Flow
1. User registers/logs in to the platform
2. Navigates to the booking page
3. Fills out booking form (event type, dates, guest count, contact details)
4. Submits booking request
5. Admin receives email notification
6. Admin reviews and approves/rejects from dashboard
7. User receives status update
8. Approved bookings sync to Google Sheets

### Authentication System
- Built with Better-auth for secure session management
- Email/password authentication
- Protected routes using Next.js middleware
- Bearer token support for API calls
- Session persistence across page refreshes

### Admin Dashboard
- View all pending, approved, and rejected bookings
- Quick approve/reject actions with confirmation dialogs
- Real-time status updates
- Contact information display for each booking
- Integration with Google Sheets for record-keeping

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Make sure to update these variables for production:
- Change `BETTER_AUTH_URL` to your production URL
- Use production database credentials
- Verify all API keys are production-ready

## 📧 Email Notifications

The system sends automatic email notifications to the admin when:
- New booking requests are submitted
- Includes booking details and user contact information

Configure email settings in your `.env` file using Resend API.

## 📊 Google Sheets Integration

Approved bookings are automatically synced to Google Sheets for easy record-keeping and offline access.

Setup instructions: See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

## 🎨 Customization

### Styling
- Edit `src/app/globals.css` for theme colors and design tokens
- Modify Tailwind configuration in `postcss.config.mjs`
- Update component styles in individual component files

### Content
- Edit venue images in homepage (`src/app/page.tsx`)
- Update feature cards and amenities
- Modify contact information in footer
- Customize chatbot responses

## 🐛 Troubleshooting

**Database Connection Issues:**
- Verify Turso credentials in `.env`
- Run `npm run db:push` to sync schema

**Authentication Errors:**
- Check `BETTER_AUTH_SECRET` is set
- Verify `BETTER_AUTH_URL` matches your domain
- Clear browser cookies and try again

**Email Not Sending:**
- Verify Resend API key
- Check admin email is correct in `.env`
- Review Resend dashboard for delivery status

## 📄 License

This project is private and proprietary. All rights reserved.

## 🤝 Contributing

This is a personal project. If you'd like to contribute or suggest improvements, please reach out directly.

## 📞 Contact

**AB Function Hall**
- Location: Guntakal
- Website: [ab-function-hall-booking-system.vercel.app]
- Email: [Shaikbilaal223@gmail.com]

---

**Built with ❤️ for AB Function Hall**

*Making every event memorable since [2025]*
