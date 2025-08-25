
# My Job Board

A modern, full-featured job board web application built with React, Vite, DaisyUI, Headless UI, Tailwind CSS, and Firebase.

## Features

- **User Authentication**: Sign up, sign in, and manage your account securely with Firebase Auth.
- **Job Search & Filtering**: Search jobs by title, location, company, tags, remote/onsite, and salary.
- **Recent Searches**: Sidebar displays your latest search terms, synced in real time with Firebase.
- **User Profile Summary**: Personalized welcome card on the homepage.
- **Saved Jobs**: Save and unsave jobs to your account (visible in job cards).
- **Responsive Layout**: Modern grid-based homepage with sidebar features.
- **Loading Spinner**: DaisyUI spinner for all loading states.
- **Account Management**: Edit profile, change password, and view account details.
- **Clean UI**: Unified styling with DaisyUI 5, Headless UI, and Tailwind CSS 4.

## Project Structure

```
my-job-board/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RecentSearchesSidebar.jsx
│   │   │   ├── RecentSearchesSidebarContainer.jsx
│   │   │   ├── SearchAndFilter.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── SuccessAlert.jsx
│   │   │   ├── UserProfileSummary.jsx
│   │   ├── account/
│   │   │   ├── ChangePasswordSection.jsx
│   │   │   ├── EditProfileModal.jsx
│   │   │   ├── ProfileSection.jsx
│   ├── context/
│   ├── pages/
│   │   ├── AccountPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── JobDetailPage.jsx
│   │   ├── SignupPage.jsx
│   ├── layout/
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   ├── firebase.js
│   ├── index.css
│   ├── main.jsx
│   ├── App.jsx
│   ├── routes/
│   │   └── index.jsx
├── .env
├── .gitignore
├── package.json
├── vite.config.js
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

- **Sign Up / Sign In**: Create an account or log in to access all features.
- **Search Jobs**: Use the search bar and filters to find jobs.
- **Save Jobs**: Click "Save" on job cards to bookmark jobs.
- **Recent Searches**: Your latest search terms appear in the sidebar.
- **Edit Profile**: Update your account info and change your password.

## Environment Variables

All sensitive Firebase config values are stored in `.env` and loaded via Vite. Never commit your `.env` file to public repositories.

## Tech Stack

- React 19
- Vite
- DaisyUI 5
- Tailwind CSS 4
- Headless UI
- Firebase (Auth & Firestore)
- Day.js
- Axios

## Contributing

Pull requests and suggestions are welcome! Please open an issue for major changes.

## Badges

![Vite](https://img.shields.io/badge/vite-4.1.2-blue)
![React](https://img.shields.io/badge/react-19.1.1-blue)
![DaisyUI](https://img.shields.io/badge/daisyui-5.0.50-yellow)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-4.1.12-blue)

## Screenshots

> Replace these with your own screenshots in the `screenshots/` folder.

![Homepage](screenshots/homepage.png)
![Account Page](screenshots/account.png)

## License

MIT
