
# Role Rocket


A modern, full-featured job board web application built with React, Vite, DaisyUI, Headless UI, Tailwind CSS, and Firebase.

## Recent Updates (Auguest &September 2025)

### 🚀 **Major Features & Improvements**
- **Employer Dashboard**: Complete employer portal with job posting, editing, application management, and analytics
- **Job Posting System**: Employers can post, edit, and manage their own jobs with full CRUD operations
- **Application Management**: Track and manage job applications with status updates and bulk operations
- **Enhanced Search**: Fixed hero section search functionality with proper state management and micro-interactions
- **Micro-interactions**: Added comprehensive animations and micro-interactions throughout the employer dashboard
- **Theme Consistency**: Full light/dark mode support with DaisyUI v5 theme system across all pages
- **Responsive Design**: Complete responsive design implementation for all screen sizes
- **Favicon Implementation**: Complete favicon set with proper meta tags and PWA support

### 🎨 **UI/UX Enhancements**
- **Modernized Homepage**: Redesigned homepage with improved layout and user experience
- **Testimonials Carousel**: Added testimonials section with carousel for user feedback
- **Personalized Recommendations**: Homepage features personalized job recommendations
- **Consistent Button Component**: All buttons use custom `Button` component with microinteractions
- **Admin Panel Consistency**: Unified styling across all admin features
- **Enhanced Animations**: Framer Motion animations throughout the application
- **Theme Toggle**: Back-to-top button and comprehensive theme switching

### 🔧 **Technical Improvements**
- **Code Cleanup**: Removed unused files and optimized codebase structure
- **ESLint Fixes**: Resolved all linting errors and warnings
- **Build Optimization**: Production-ready build configuration for Vercel deployment
- **Firebase Integration**: Enhanced Firestore collections for employer jobs and applications
- **Form Validation**: Comprehensive form validation with accessibility improvements
- **SEO Optimization**: Added meta tags, Open Graph, and Twitter Card support
- **PWA Support**: Web app manifest and service worker ready configuration

### 📱 **Mobile & Accessibility**
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Touch Interactions**: Enhanced touch interactions for mobile devices
- **Accessibility**: Proper form labels, ARIA attributes, and keyboard navigation
- **Performance**: Optimized bundle size and loading performance


## Features

### 👤 **User Features**
- **User Authentication**: Sign up, sign in, and manage your account securely with Firebase Auth
- **Job Search & Filtering**: Search jobs by title, location, company, tags, remote/onsite, and salary
- **Recent Searches**: Sidebar displays your latest search terms, synced in real time with Firebase
- **User Profile Summary**: Personalized welcome card on the homepage
- **Saved Jobs**: Save and unsave jobs to your account (visible in job cards)
- **Application Tracking**: Track your job applications with status updates
- **Account Management**: Edit profile, change password, and view account details
- **Theme Support**: Light and dark mode with system preference detection

### 🏢 **Employer Features**
- **Employer Dashboard**: Complete portal for job management and application tracking
- **Job Posting**: Create, edit, and manage job postings with rich descriptions
- **Application Management**: View, filter, and manage job applications
- **Bulk Operations**: Select and manage multiple jobs and applications at once
- **Analytics & Insights**: View job performance metrics and application statistics
- **Company Profile**: Manage company information and branding
- **Real-time Updates**: Live updates for new applications and job status changes

### 🎨 **UI/UX Features**
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Modern Animations**: Framer Motion micro-interactions throughout the app
- **Loading States**: DaisyUI spinners and skeleton loaders for all async operations
- **Clean UI**: Unified styling with DaisyUI 5, Headless UI, and Tailwind CSS 4
- **Accessibility**: Proper form labels, ARIA attributes, and keyboard navigation
- **PWA Ready**: Web app manifest and service worker configuration


### Admin Panel Features

- **Admin Dashboard**: Sidebar navigation for User Management, Jobs Panel, Analytics, Notifications, Settings, Feedback & Support
- **Role-Based Access Control**: Admin, editor, and viewer roles for secure access
- **User Management**: View, search, filter, and edit users (role/status) with Headless UI modal
- **Jobs Panel**: Add, edit, delete, feature/unfeature jobs, bulk actions (bulk delete, bulk feature/unfeature), search/filter, and pagination
- **Bulk Actions**: Select multiple jobs for bulk delete or feature/unfeature, with confirmation modal (Headless UI Dialog)
- **Inline Validation**: Real-time inline validation for all job and user forms (required fields, valid URLs, etc.)
- **Application Link**: Jobs support external application links, shown as 'Apply Now' buttons
- **Slug & Tags**: Jobs support unique slugs and comma-separated tags for advanced filtering and search
- **Pagination**: Admin jobs panel includes pagination for easier job management
- **Role-Based UI**: UI actions and buttons are enabled/disabled based on user role (admin, editor, viewer)
- **Profile Social Links**: Users can customize visibility of their Twitter and LinkedIn links in their profile
- **Job Analytics**: View job stats (customizable)
- **Notifications**: Send announcements to all users, save notifications to Firestore, view sent notifications
- **Settings**: Update site branding and featured tags, save to Firestore
- **Feedback & Support**: View user feedback, respond via modal, save responses to Firestore
- **Consistent UI**: All admin features use DaisyUI 5, Headless UI, and the custom Button component for modern, accessible, and consistent design
- **Wide Card Layouts**: Admin pages use wide, responsive cards for better usability
- **Status Feedback**: DaisyUI alerts and spinners for all status messages
- **Accessibility**: All form fields have proper `id` and `name` attributes for autofill/accessibility; all modals/dialogs use accessible Headless UI components
- **Firestore Integration**: Jobs, users, notifications, feedback, and settings are stored in Firestore

## Project Structure

```
my-job-board/
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── SearchAndFilter.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── SuccessAlert.jsx
│   │   │   ├── UserProfileSummary.jsx
│   │   │   ├── ApplicationTracker.jsx
│   │   │   ├── RecentApplications.jsx
│   │   │   ├── BackToTopButton.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── [other UI components]
│   │   ├── account/
│   │   │   ├── AccountSidebar.jsx
│   │   │   ├── ChangePasswordSection.jsx
│   │   │   ├── EditProfileModal.jsx
│   │   │   ├── NotificationsSection.jsx
│   │   │   ├── ProfileSection.jsx
│   │   │   ├── SavedJobsSection.jsx
│   │   │   └── SettingsSection.jsx
│   │   ├── admin/
│   │   │   ├── AdminJobsPanel.jsx
│   │   │   ├── AdminPanelLayout.jsx
│   │   │   ├── AdminUserManagement.jsx
│   │   │   ├── AdminJobAnalytics.jsx
│   │   │   ├── AdminNotifications.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   ├── AdminFeedbackSupport.jsx
│   │   │   ├── AdminJobsBulkActions.jsx
│   │   │   ├── AdminJobsPagination.jsx
│   │   │   ├── AddSampleJobs.jsx
│   │   │   └── useUserRole.js
│   │   ├── homepage/
│   │   │   ├── FeaturedJobs.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   └── auth/
│   │       └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── AuthContextInstance.js
│   │   ├── ThemeContext.jsx
│   │   ├── ThemeContextInstance.js
│   │   └── useAuth.js
│   ├── hooks/
│   │   ├── useAdminStatus.js
│   │   ├── useJobs.js
│   │   ├── useTheme.js
│   │   └── useUserType.js
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   ├── AccountPage.jsx
│   │   ├── AdminPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── BlogPostPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── EmailVerificationPage.jsx
│   │   ├── EmployerDashboard.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── JobDetailPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── SignupPage.jsx
│   ├── routes/
│   │   └── index.jsx
│   ├── services/
│   │   └── jobs.js
│   ├── firebase.js
│   ├── index.css
│   ├── main.jsx
│   └── App.jsx
├── .env
├── .gitignore
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## Getting Started

1. **Clone the repository**
	```bash
	git clone https://github.com/your-username/my-job-board.git
	cd my-job-board
	```
2. **Install dependencies**
	```bash
	npm install
	```
3. **Set up Firebase**
	- Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
	- Add a web app and copy your config values.
	- Create a `.env` file in the root directory and add:
	  ```env
	  VITE_FIREBASE_API_KEY=your-api-key
	  VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
	  VITE_FIREBASE_PROJECT_ID=your-project-id
	  VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
	  VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
	  VITE_FIREBASE_APP_ID=your-app-id
	  VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
	  ```
4. **Start the development server**
	```bash
	npm run dev
	```
5. **Open in browser**
	- Visit `http://localhost:5173` (or the port shown in your terminal).


## Usage

- **Modern Homepage**: Enjoy a visually improved homepage with testimonials and recommendations.
- **Consistent Buttons**: All actions use the new Button component for a unified look and feel.

- **Sign Up / Sign In**: Create an account or log in to access all features.
- **Search Jobs**: Use the search bar and filters to find jobs.
- **Save Jobs**: Click "Save" on job cards to bookmark jobs.
- **Recent Searches**: Your latest search terms appear in the sidebar.
- **Edit Profile**: Update your account info and change your password.

## Environment Variables

All sensitive Firebase config values are stored in `.env` and loaded via Vite. Never commit your `.env` file to public repositories.

### Required Environment Variables:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Deployment

### Vercel Deployment
1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository
2. **Connect to Vercel**: Import your repository in Vercel dashboard
3. **Set Environment Variables**: Add all Firebase config variables in Vercel settings
4. **Deploy**: Vercel will automatically build and deploy your application

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Production Features
- ✅ **Optimized Build**: Vite production build with code splitting
- ✅ **PWA Ready**: Web app manifest and service worker configuration
- ✅ **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- ✅ **Favicon Support**: Complete favicon set for all devices and platforms
- ✅ **Responsive Design**: Optimized for all screen sizes
- ✅ **Performance**: Optimized bundle size and loading performance

## Tech Stack

- **Frontend**: React 19.1.1, Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12, DaisyUI 5.0.50
- **UI Components**: Headless UI 2.2.8, Heroicons 2.2.0
- **Animations**: Framer Motion 12.23.14
- **Backend**: Firebase 12.1.0 (Auth & Firestore)
- **Routing**: React Router 7.8.1
- **Utilities**: Day.js 1.11.13, Axios 1.11.0
- **Notifications**: React Hot Toast 2.6.0
- **Carousel**: Swiper 11.2.10
- **Security**: DOMPurify 3.2.6

## Contributing

Pull requests and suggestions are welcome! Please open an issue for major changes.

## Badges

![Vite](https://img.shields.io/badge/vite-7.1.2-blue)
![React](https://img.shields.io/badge/react-19.1.1-blue)
![DaisyUI](https://img.shields.io/badge/daisyui-5.0.50-yellow)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-4.1.12-blue)
![Firebase](https://img.shields.io/badge/firebase-12.1.0-orange)
![Framer Motion](https://img.shields.io/badge/framer--motion-12.23.14-purple)


## Screenshots

> Update screenshots to reflect the new homepage, testimonials carousel, and button styles for the most accurate preview.

> Replace these with your own screenshots in the `screenshots/` folder.

![Homepage](screenshots/homepage.png)
![Account Page](screenshots/account.png)

## License

MIT
