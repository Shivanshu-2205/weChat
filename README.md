# Chat Application

A real-time chat application built with modern web technologies, featuring user authentication, instant messaging, and profile management.

## Features

- **User Authentication**: Secure signup and login functionality
- **Real-time Messaging**: Instant message delivery using WebSockets
- **User Profiles**: View and manage user profiles
- **Theme Switching**: Light and dark mode support
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Image Support**: Upload and share images using Cloudinary integration
- **User Status**: See online/offline status of users

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Socket.io** - WebSocket library
- **Cloudinary** - Image hosting service
- **JWT** - Authentication tokens

## Project Structure

```
chat-app/
├── frontend/              # React front-end application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── lib/           # Utilities and axios config
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/               # Node.js + Express back-end
    ├── src/
    │   ├── controllers/   # Route handlers
    │   ├── models/        # MongoDB schemas
    │   ├── routes/        # API routes
    │   ├── middleware/    # Express middleware
    │   ├── lib/           # Database and utilities
    │   ├── seeds/         # Database seeders
    │   └── index.js       # Entry point
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image upload)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5001
NODE_ENV=development
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
The backend server will run on `http://localhost:5001`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will be available on `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts

### Backend
- `npm start` - Start the server
- `npm run seed` - Seed the database with initial data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Messages
- `GET /api/messages/:userId` - Get messages with a user
- `POST /api/messages/send/:id` - Send a message
- `GET /api/messages/users` - Get all users for sidebar

## Real-time Events (Socket.io)

- `connect` - User connects
- `disconnect` - User disconnects
- `sendMessage` - Send a message
- `receiveMessage` - Receive a message
- `userOnline` - User comes online
- `userOffline` - User goes offline

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `PORT` - Server port (default: 5001)
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
