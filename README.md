# React Todo Application

A Todo application built with React, Firebase, and Tailwind CSS. This application provides user authentication, real-time todo management, and a responsive user interface.

## Features

- User Authentication
  - Email/Password registration and login
  - Google Sign-in integration
  
- Todo Management
  - Create, read, update, and delete todos
  - Real-time updates using Firebase
  - Priority levels for tasks
  - Subtask support
  
- User Profile
  - Customizable user profile details
  - Profile picture upload
  - Display name management

## Technologies Used

- Frontend
  - React 19.0.0
  - React Router DOM 7.3.0
  - Tailwind CSS 4.0.9
  - Framer Motion 12.4.10
  - Font Awesome icons

- Backend/Services
  - Firebase 11.4.0
    - Authentication
    - Firestore Database
    - Storage
    - Analytics
  
- Development Tools
  - Vite 6.1.0
  - ESLint 9.19.0
  - PostCSS 8.5.3
  - Autoprefixer 10.4.20

## Prerequisites

- Node.js (version 18.0.0 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
gh repo clone MS-092/my-todo-list
cd my-todo-list
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # React components
├── contexts/          # Context providers
├── firebase/          # Firebase configuration
├── App.jsx           # Main application component
├── main.jsx         # Application entry point
└── index.css        # Global styles
```

## Docs

[Tailwind CSS Documentation](https://v2.tailwindcss.com/docs)

[React Native CSS Documentation](https://react.dev/learn)

[Firebase Products Build](https://firebase.google.com/products-build)