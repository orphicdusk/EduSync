# EduSync - Learning Management System

A modern, scalable Learning Management System built on the MERN stack that provides an intuitive platform for course delivery, student management, and interactive learning experiences.

## Project Overview

This project implements the requirements outlined in the Product Requirements Document (PRD) for a Learning Management System. The system is built using the MERN stack (MongoDB, Express.js, React, Node.js) with additional technologies as specified in the PRD.

## Technology Stack

### Backend (Node.js + Express)
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Authentication**: JWT + bcrypt
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Built-in validation
- **Real-time**: Socket.io (planned for future implementation)

### Frontend (React)
- **Framework**: React 18+
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **UI Library**: Material-UI
- **HTTP Client**: Axios

### DevOps & Infrastructure
- **Containerization**: Docker (planned for future implementation)
- **CI/CD**: GitHub Actions (planned for future implementation)

## Project Structure

```
edusync/
├── client/                 # React frontend application
│   ├── public/             # Static assets
│   └── src/                # Source code
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── hooks/          # Custom hooks
│       ├── store/          # Redux store and slices
│       ├── services/       # API service files
│       ├── utils/          # Utility functions
│       └── styles/         # Styling files
├── server/                 # Node.js backend application
│   └── src/                # Source code
│       ├── controllers/    # Request handlers
│       ├── models/         # Database models
│       ├── routes/         # API routes
│       ├── middleware/     # Custom middleware
│       ├── services/       # Business logic
│       ├── utils/          # Utility functions
│       └── socket/         # Real-time functionality
└── prd.txt                 # Product Requirements Document
```

## Implemented Features

### Phase 1: MVP (Months 1-3)
- [x] User authentication and profiles
- [x] Basic course creation and enrollment
- [ ] Video/content playback
- [ ] Simple quizzes and assignments
- [ ] Discussion forums

### Current Implementation Status
1. **Backend API**:
   - User registration and authentication with JWT
   - User profile management
   - Course management (CRUD operations)
   - Role-based access control

2. **Frontend Application**:
   - Home page with course listings
   - User authentication pages (login/register)
   - Dashboard with role-based content
   - Responsive UI with Material-UI components

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 4.4+
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd edusync
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd client
   npm install
   npm start
   ```

### Environment Variables

#### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edusync
JWT_SECRET=your_jwt_secret_here
```

#### Client (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile

### Courses
- `GET /api/v1/courses` - Get all courses
- `POST /api/v1/courses` - Create a new course (instructor/admin only)
- `GET /api/v1/courses/:id` - Get a specific course
- `PUT /api/v1/courses/:id` - Update a course (instructor/admin only)
- `DELETE /api/v1/courses/:id` - Delete a course (instructor/admin only)

## Development Guidelines

### Code Standards
- ES6+ JavaScript
- Component-based React architecture
- RESTful API design principles

### State Management Strategy
- Redux Toolkit for global state
- React Query for server state (planned)
- Context API for theme/auth (planned)

## Future Enhancements

### Phase 2: Enhanced Features (Months 4-6)
- Advanced assessment system
- Real-time chat and notifications
- Analytics dashboard
- Payment integration (if monetized)
- Mobile app (React Native)

### Phase 3: Advanced Features (Months 7-9)
- AI-powered recommendations
- Advanced reporting
- Integration APIs (LTI, Google Classroom)
- White-labeling options
- SCORM compliance

### Phase 4: Enterprise Features (Months 10-12)
- Single Sign-On (SSO)
- Advanced RBAC with custom roles
- Bulk operations
- Custom workflow engine
- Advanced content authoring tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was built according to the specifications in the Product Requirements Document
- Thanks to all contributors who have helped develop this system