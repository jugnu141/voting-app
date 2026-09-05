
# 🗳️ Voting App

A full-stack **Online Voting System** built using the MERN stack — MongoDB, Express.js, React.js, and Node.js.

The application allows users to register, securely log in, view candidates, cast votes, and view election results. It also includes a role-based **Admin Dashboard** for managing candidates and monitoring election results.

The project demonstrates practical implementation of:

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Role-Based Authorization
- REST APIs
- CRUD Operations
- React Router
- Frontend–Backend Integration
- Git & GitHub
- Cloud Deployment

---

## 🌐 Live Demo

🚀 **Live Application:**

https://voting-app-frontend-d2xo.onrender.com

The application is deployed using:

- **Frontend:** Render Static Site
- **Backend:** Render Web Service
- **Database:** MongoDB Atlas

### 🎯 Demo Admin

The login page includes a:

> 🚀 Try Demo Admin

button that allows visitors to explore the administrative functionality without manually entering demo credentials.

The Demo Admin account is intended only for demonstration purposes.

> ⚠️ **Demo Environment:** Please do not enter real Aadhaar numbers, passwords, phone numbers, addresses, or other sensitive personal information.

---

# 📌 About The Project

The Voting App is a web-based voting platform designed to demonstrate how a full-stack application can handle authentication, authorization, candidate management, voting, and result tracking.

The application has two primary types of users:

### 👤 Voter

A voter can:

- Create an account
- Log in
- View candidates
- Cast a vote
- View election results
- Log out

### 👨‍💼 Administrator

An administrator can:

- Access the Admin Dashboard
- View candidates
- Add candidates
- Edit candidate information
- Delete candidates
- View election results
- Monitor vote counts

Administrative operations are protected by role-based authorization.

---

# ✨ Features

## 👤 User Features

- User registration
- User login
- JWT-based authentication
- Protected API operations
- Candidate listing
- Voting functionality
- Election result viewing
- User logout
- Role-based access

---

## 👨‍💼 Admin Features

The application includes a dedicated Admin Dashboard.

Administrators can:

- 📊 View dashboard statistics
- 👥 View all candidates
- ➕ Add candidates
- ✏️ Edit candidates
- 🗑️ Delete candidates
- 📈 View election results
- 🔄 Refresh vote results
- 🚪 Logout securely

The Admin Dashboard is accessible only to authenticated users with an administrative role.

---

# 🚀 Demo Flow

Visitors can explore the application using two different flows.

## Voter Flow

```text
Open Website
     ↓
Signup
     ↓
Create Voter Account
     ↓
Login
     ↓
View Candidates
     ↓
Cast Vote
     ↓
View Results
````

---

## Admin Flow

```text
Open Website
     ↓
Login
     ↓
🚀 Try Demo Admin
     ↓
Admin Dashboard
     ↓
Manage Candidates
     ├── Add
     ├── Edit
     └── Delete
     ↓
View Election Results
```

---

# 🗳️ Voting System

The voting system allows authenticated voters to select a candidate and cast their vote.

The general workflow is:

```text
User
  │
  ▼
Login
  │
  ▼
Authentication
  │
  ▼
View Candidates
  │
  ▼
Select Candidate
  │
  ▼
Cast Vote
  │
  ▼
Backend Validation
  │
  ▼
MongoDB
  │
  ▼
Updated Vote Count
  │
  ▼
Election Results
```

The backend performs authentication and authorization checks before protected operations are processed.

---

# 📊 Election Results

The application provides an election results section that retrieves voting information from MongoDB.

The Admin Dashboard also provides a results view where administrators can monitor candidate vote counts.

Example:

```text
Candidate             Party             Votes

Candidate A           Party X             25
Candidate B           Party Y             18
Candidate C           Party Z             11
```

The results are generated from the stored application data.

---

# 🛡️ Authentication & Authorization

The application separates **authentication** from **authorization**.

## Authentication

Authentication answers:

> "Who is this user?"

The application uses JWT-based authentication to identify authenticated users.

General flow:

```text
Signup
  ↓
User Account
  ↓
Login
  ↓
Credentials Verified
  ↓
JWT Generated
  ↓
Token Stored
  ↓
Protected API Requests
```

---

## Authorization

Authorization answers:

> "What is this user allowed to do?"

The application uses user roles to restrict administrative operations.

Example:

```text
User
 │
 ├── voter
 │     └── Voting functionality
 │
 └── admin
       └── Candidate Management
       └── Election Results
```

Candidate management operations are protected on the backend using authorization checks.

---

# 🔐 Demo Admin

The project includes a dedicated Demo Admin account for portfolio and demonstration purposes.

The Demo Admin is stored in the database with:

```text
role: admin
```

The frontend provides a:

```text
🚀 Try Demo Admin
```

button on the Login page.

This allows visitors to quickly explore the Admin Dashboard.

### Important

The Demo Admin account should contain only fake/demo information.

Never use:

* Real Aadhaar numbers
* Real passwords
* Personal phone numbers
* Personal addresses
* Sensitive user information

---

# 🧱 Application Architecture

```text
                         ┌───────────────────┐
                         │       User        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  React Frontend   │
                         │     + Vite        │
                         └─────────┬─────────┘
                                   │
                              HTTP Requests
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Express Backend   │
                         │     REST API      │
                         └─────────┬─────────┘
                                   │
                   ┌───────────────┼───────────────┐
                   │               │               │
                   ▼               ▼               ▼
             Authentication  Authorization   Voting Logic
                   │               │               │
                   └───────────────┼───────────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     MongoDB       │
                         │      Atlas        │
                         └───────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

| Technology    | Purpose                  |
| ------------- | ------------------------ |
| React.js      | Frontend UI              |
| Vite          | Development & build tool |
| JavaScript    | Application logic        |
| CSS           | Styling                  |
| React Router  | Client-side routing      |
| Axios / Fetch | API communication        |

---

## Backend

| Technology    | Purpose               |
| ------------- | --------------------- |
| Node.js       | Backend runtime       |
| Express.js    | REST API framework    |
| JavaScript    | Backend logic         |
| Mongoose      | MongoDB interaction   |
| JWT           | Authentication        |
| Cookie Parser | Cookie handling       |
| CORS          | Cross-origin requests |
| dotenv        | Environment variables |
| bcrypt        | Password hashing      |

---

## Database

* MongoDB
* MongoDB Atlas
* Mongoose

---

## Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* npm
* MongoDB Compass

---

# 📁 Project Structure

```text
voting-app/
│
├── Backend/
│   │
│   ├── .postman/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── candidate.js
│   │   └── user.js
│   │
│   ├── middlewares/
│   │   └── voting.js
│   │
│   ├── models/
│   │   ├── candidate.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   ├── candidateRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   │
│   └── voting-frontend/
│       │
│       ├── public/
│       │
│       ├── src/
│       │   │
│       │   ├── assets/
│       │   │
│       │   ├── components/
│       │   │   └── Navbar.jsx
│       │   │
│       │   ├── pages/
│       │   │   ├── AdminDashboard.jsx
│       │   │   ├── Candidates.jsx
│       │   │   ├── Home.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── Results.jsx
│       │   │   ├── Signup.jsx
│       │   │   └── Vote.jsx
│       │   │
│       │   ├── services/
│       │   │   └── api.js
│       │   │
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── index.css
│       │   └── main.jsx
│       │
│       ├── index.html
│       ├── package.json
│       ├── package-lock.json
│       └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🔌 API Structure

The backend REST APIs are organized under:

```text
/api/v1/
```

---

## User Routes

Base URL:

```text
/api/v1/user
```

Main functionality includes:

```text
POST /login
POST /signup
GET  /profile
PUT  /profile/password
```

These routes handle user authentication and user-related operations.

---

## Candidate Routes

Base URL:

```text
/api/v1/candidate
```

Main functionality includes:

```text
GET    /
POST   /addCandidate
PUT    /:candidateID
DELETE /:candidateID
POST   /vote/:candidateID
GET    /vote/voteCount
```

These endpoints handle candidate management, voting, and election results.

---

# 🧪 API Testing With Postman

The backend APIs can also be tested independently using Postman.

Typical workflow:

```text
1. Register User
       ↓
2. Login
       ↓
3. Receive Authentication Token
       ↓
4. Fetch Candidates
       ↓
5. Perform Voting Operation
       ↓
6. Fetch Results
```

The project contains Postman-related resources for API testing.

---

# 🗄️ Database

The application uses MongoDB as its database.

Mongoose is used by the Node.js backend to interact with MongoDB.

The application stores information related to:

```text
Users
Candidates
Votes
```

For cloud deployment, MongoDB Atlas is used as the database service.

---

# ⚙️ Environment Variables

Sensitive configuration should be stored in environment variables.

Create a `.env` file inside the `Backend` directory.

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

### Important

Never commit the actual `.env` file to GitHub.

Use `.env.example` to document required environment variables.

---

# 🚀 Getting Started

Follow the instructions below to run the application locally.

---

## Prerequisites

Install the following:

* Node.js
* npm
* Git
* MongoDB or MongoDB Atlas
* Postman (optional)
* MongoDB Compass (optional)

---

# 📥 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/jugnu141/voting-app.git
```

Navigate into the project:

```bash
cd voting-app
```

---

# 🖥️ Backend Setup

Open a terminal and navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
Backend/.env
```

Add:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:4000
```

---

# 🌐 Frontend Setup

Open another terminal.

Navigate to:

```bash
cd Frontend/voting-frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔗 Frontend ↔ Backend Communication

The frontend communicates with the Express backend using HTTP requests.

General flow:

```text
React Frontend
      │
      │ HTTP Request
      ▼
Express REST API
      │
      ▼
Controller
      │
      ▼
Mongoose
      │
      ▼
MongoDB
```

API-related frontend functionality is organized within the frontend source code and services.

---

# 🔐 Security Considerations

This project implements several basic security mechanisms:

* Password hashing using bcrypt
* JWT-based authentication
* Protected backend routes
* Role-based authorization
* Environment variables for secrets
* CORS configuration
* Backend authorization checks

### Demo Environment

This application is intended for educational and portfolio demonstration purposes.

The Demo Admin account should never be used for sensitive or real-world data.

---

# 🧑‍💻 Development Workflow

A typical development workflow is:

```text
Write Code
    ↓
Run Backend Locally
    ↓
Run Frontend Locally
    ↓
Test Application
    ↓
Test APIs with Postman
    ↓
Check Database
    ↓
git add .
    ↓
git commit
    ↓
git push
    ↓
Deploy
```

---

# 🚀 Deployment

The application uses separate services for frontend, backend, and database.

Current architecture:

```text
                         GitHub
                            │
               ┌────────────┴────────────┐
               │                         │
               ▼                         ▼
        Render Frontend           Render Backend
        Static Site               Web Service
               │                         │
               └────────────┬────────────┘
                            │
                            ▼
                       MongoDB Atlas
```

### Current Deployment

```text
Frontend
https://voting-app-frontend-d2xo.onrender.com

Backend
https://voting-app-backend-194a.onrender.com

Database
MongoDB Atlas
```

The frontend and backend are deployed separately and communicate through REST APIs.

---

# 🔐 Production Environment Variables

Production environment variables should be configured through the hosting provider rather than committed to GitHub.

Backend example:

```text
MONGODB_URL = your_production_mongodb_url
JWT_SECRET  = your_production_jwt_secret
PORT        = platform_provided_port
```

### Never commit:

```text
.env
```

to the repository.

---

# 📸 Screenshots

Screenshots can be added here to showcase the application's main interfaces.

Recommended screenshots:

## 🏠 Home Page

Add a screenshot of the home page here.

---

## 🔐 Login Page

Add a screenshot of the login page here.

The Login page includes the:

```text
🚀 Try Demo Admin
```

option.

---

## 📝 Signup Page

Add a screenshot of the signup page here.

---

## 👥 Candidate Page

Add a screenshot showing available candidates.

---

## 🗳️ Voting Page

Add a screenshot showing the voting interface.

---

## 📊 Results Page

Add a screenshot showing election results.

---

## 👨‍💼 Admin Dashboard

Add a screenshot showing:

* Candidate management
* Add Candidate
* Edit Candidate
* Delete Candidate
* Election Results
* Vote statistics

---

# 🧠 Key Concepts Demonstrated

This project demonstrates practical understanding of:

* MERN Stack
* React.js
* React Components
* React Router
* Vite
* Node.js
* Express.js
* REST APIs
* MongoDB
* Mongoose
* JWT Authentication
* Password Hashing
* Protected Routes
* Role-Based Authorization
* Middleware
* CRUD Operations
* Voting Logic
* Frontend–Backend Integration
* CORS
* Environment Variables
* API Testing
* Git
* GitHub
* Cloud Deployment
* MongoDB Atlas
* Render

---

# 📚 What I Learned

This project provided practical experience in building a complete full-stack application from the frontend to the backend and database.

## Frontend

* Building React components
* Managing application pages
* Client-side routing
* Connecting React with REST APIs
* Managing authentication state
* Creating an Admin Dashboard
* Building CRUD interfaces

## Backend

* Creating Express.js REST APIs
* Organizing controllers and routes
* Implementing middleware
* Connecting Node.js to MongoDB
* Implementing authentication
* Implementing authorization
* Protecting administrative operations

## Database

* Designing MongoDB models
* Using Mongoose
* Storing application data
* Retrieving candidate and voting information

## Authentication

* JWT authentication
* Password hashing
* Protected API requests
* Role-based authorization

## Deployment

* GitHub-based deployment
* Render deployment
* MongoDB Atlas
* Production environment variables
* Frontend/backend deployment architecture

---

# 🔮 Future Improvements

Possible future improvements include:

* [x] Admin Dashboard
* [x] Candidate CRUD operations
* [x] Election result management
* [x] Demo Admin access
* [ ] Multiple elections
* [ ] Election start and end dates
* [ ] Real-time voting statistics
* [ ] Improved result visualization
* [ ] Election management
* [ ] Email verification
* [ ] Password reset
* [ ] Advanced input validation
* [ ] Rate limiting
* [ ] Automated tests
* [ ] Improved error handling
* [ ] Enhanced responsive design
* [ ] User profile management
* [ ] Production monitoring

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

## Fork the Repository

```bash
git clone https://github.com/jugnu141/voting-app.git
```

Create a new branch:

```bash
git checkout -b feature/your-feature
```

Make your changes:

```bash
git add .
git commit -m "Add your feature"
```

Push your branch:

```bash
git push origin feature/your-feature
```

Then create a Pull Request.

---

# ⚠️ Disclaimer

This project is developed for:

* Educational purposes
* Demonstration purposes
* Portfolio purposes

It is **not intended to be used as a real-world election system**.

A production election system would require significantly stronger security, identity verification, auditing, privacy controls, infrastructure security, monitoring, testing, legal compliance, and independent security review.

Please do not enter real personal or sensitive information into the demo application.

---

# 👨‍💻 Author

## Nawaz Alam

GitHub:

[https://github.com/jugnu141](https://github.com/jugnu141)

Project Repository:

[https://github.com/jugnu141/voting-app](https://github.com/jugnu141/voting-app)

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

Feedback and suggestions are always welcome.

---

# 🗳️ Voting App

**Built with React • Node.js • Express.js • MongoDB**

🚀 **Live Demo:**

[https://voting-app-frontend-d2xo.onrender.com](https://voting-app-frontend-d2xo.onrender.com)


