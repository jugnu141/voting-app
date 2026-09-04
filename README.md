
# 🗳️ Voting App

A full-stack web-based voting application built using the **MERN stack**. The application provides user authentication, candidate management, voting functionality, and result tracking with persistent data stored in MongoDB.

The project is designed as a practical full-stack application demonstrating **React, Node.js, Express.js, MongoDB, JWT authentication, REST APIs, role-based authorization, and frontend-backend integration**.

---

## 🌐 Live Demo

🚧 **Coming Soon**

The application is currently being prepared for production deployment.

---

## 📌 About The Project

The **Voting App** is a full-stack online voting platform where users can create accounts, log in securely, view candidates, cast votes, and view election results.

The backend provides RESTful APIs for authentication, candidate management, and voting-related operations, while the React frontend provides the user interface for interacting with the application.

The application uses **MongoDB** for persistent data storage and **JWT-based authentication** for securing protected operations.

---

# ✨ Features

## 👤 User Features

- User registration
- User login
- JWT-based authentication
- Secure authentication using cookies
- Protected routes
- View available candidates
- Cast votes
- View voting results
- User-specific authenticated operations

---

## 👨‍💼 Admin Features

The application includes role-based functionality for administrative operations.

Administrators can perform candidate-management operations such as:

- Add candidates
- View candidates
- Update candidate information
- Delete candidates
- Manage voting-related resources

Administrative APIs are protected using authorization middleware.

---

## 🗳️ Voting System

The voting module allows authenticated users to interact with the available candidates and cast their vote.

The voting workflow is:

```text
User
  │
  ▼
Login / Authentication
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
Voting Results
````

---

## 📊 Results

The application provides a results section where voting information can be retrieved and displayed.

Results are generated from the data stored in MongoDB.

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| React.js     | Frontend UI                |
| Vite         | Development and build tool |
| JavaScript   | Application logic          |
| CSS          | Styling                    |
| React Router | Client-side routing        |
| Axios        | API communication          |

---

## Backend

| Technology    | Purpose               |
| ------------- | --------------------- |
| Node.js       | Backend runtime       |
| Express.js    | Web framework         |
| JavaScript    | Backend logic         |
| Mongoose      | MongoDB interaction   |
| JWT           | Authentication        |
| Cookie Parser | Cookie handling       |
| CORS          | Cross-origin requests |
| dotenv        | Environment variables |

---

## Database

* MongoDB
* MongoDB Atlas
* Mongoose

---

## Development & Testing

* Visual Studio Code
* Git
* GitHub
* Postman
* npm

---

# 🏗️ Project Structure

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
│   ├── postman/
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
│       │   ├── favicon.svg
│       │   └── icons.svg
│       │
│       ├── src/
│       │   │
│       │   ├── assets/
│       │   │   ├── hero.png
│       │   │   ├── react.svg
│       │   │   └── vite.svg
│       │   │
│       │   ├── components/
│       │   │   └── Navbar.jsx
│       │   │
│       │   ├── pages/
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

> `node_modules` and actual environment files are intentionally excluded from the repository.

---

# 🔄 Application Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │      + Vite         │
                         └──────────┬──────────┘
                                    │
                              HTTP Requests
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │      REST API       │
                         └──────────┬──────────┘
                                    │
                   ┌────────────────┼────────────────┐
                   │                │                │
                   ▼                ▼                ▼
              Authentication   Authorization   Voting Logic
                   │                │                │
                   └────────────────┼────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      MongoDB        │
                         │     Database        │
                         └─────────────────────┘
```

---

# 🔐 Authentication

The application uses **JWT (JSON Web Token)** based authentication.

The general authentication flow is:

```text
Register
   │
   ▼
User Account Created
   │
   ▼
Login
   │
   ▼
Credentials Verified
   │
   ▼
JWT Generated
   │
   ▼
Authentication Cookie
   │
   ▼
Protected API Requests
   │
   ▼
Authentication / Authorization
```

The backend uses `cookie-parser` to handle authentication cookies.

---

# 🛡️ Authorization

The application separates authentication from authorization.

### Authentication

Determines:

> "Who is this user?"

### Authorization

Determines:

> "What is this user allowed to do?"

For example, candidate-management operations can be restricted to users with the appropriate administrative role.

---

# 🔌 API Structure

The backend exposes REST API routes under:

```text
/api/v1/
```

## User Routes

```text
/api/v1/user
```

Used for user-related functionality such as:

* Registration
* Login
* User authentication
* User-related operations

---

## Candidate Routes

```text
/api/v1/candidate
```

Used for candidate and voting-related functionality such as:

* Candidate management
* Candidate retrieval
* Voting operations
* Candidate-related requests

---

# 🧪 API Testing With Postman

The backend APIs can be tested using **Postman**.

The project contains Postman-related resources for API testing.

A typical testing flow is:

```text
1. Register User
       ↓
2. Login
       ↓
3. Authenticate User
       ↓
4. Fetch Candidates
       ↓
5. Perform Voting Operation
       ↓
6. Fetch Results
```

---

# 🗄️ Database

The application uses **MongoDB** for persistent data storage.

Mongoose is used to communicate with MongoDB from the Node.js backend.

The database contains application data related to:

```text
Users
Candidates
Votes
```

For production deployment, **MongoDB Atlas** can be used as the cloud-hosted database.

---

# ⚙️ Environment Variables

Environment variables are used to keep sensitive configuration outside the source code.

Create a `.env` file inside the `Backend` directory:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```



# 🚀 Getting Started

Follow the instructions below to run the project locally.

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git
* MongoDB / MongoDB Atlas
* Postman (optional, for API testing)

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

Navigate to the backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

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

The frontend communicates with the backend through REST APIs.

The general flow is:

```text
React
  │
  │ Axios / HTTP Request
  ▼
Express API
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

API-related frontend logic is maintained in:

```text
Frontend/voting-frontend/src/services/api.js
```

---

# 📁 Backend Architecture

The backend follows a modular structure.

### `config/`

Contains configuration files such as the MongoDB database connection.

```text
config/database.js
```

### `controllers/`

Contains application/business logic for users and candidates.

```text
controllers/
├── candidate.js
└── user.js
```

### `models/`

Contains MongoDB/Mongoose data models.

```text
models/
├── candidate.js
└── user.js
```

### `routes/`

Contains API route definitions.

```text
routes/
├── candidateRoutes.js
└── userRoutes.js
```

### `middlewares/`

Contains middleware used for request processing and voting-related functionality.

---

# 🎨 Frontend Architecture

The frontend is built with React and Vite.

The application is organized into:

```text
src/
├── components/
├── pages/
├── services/
├── assets/
├── App.jsx
└── main.jsx
```

### Pages

The application contains pages for:

* Home
* Login
* Signup
* Candidates
* Vote
* Results

### Components

Reusable UI components are maintained inside:

```text
src/components/
```

### Services

API communication is maintained inside:

```text
src/services/
```

---

# 📸 Screenshots

## 🏠 Home Page

> Screenshot coming soon.

---

## 🔐 Login Page

> Screenshot coming soon.

---

## 📝 Signup Page

> Screenshot coming soon.

---

## 🗳️ Voting Page

> Screenshot coming soon.

---

## 📊 Results Page

> Screenshot coming soon.

---

# 🚀 Deployment

The application can be deployed using separate services for the frontend, backend, and database.

A possible production architecture is:

```text
                       GitHub
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
        Frontend                   Backend
        Hosting                    Hosting
             │                         │
             │                         │
             └───────────┬─────────────┘
                         │
                         ▼
                   MongoDB Atlas
```

For example:

```text
Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
```

The actual deployment providers can be changed depending on hosting requirements.

---

# 🔐 Production Environment Variables

When deploying the backend, configure environment variables directly in the hosting provider's dashboard.

For example:

```text
MONGODB_URL = your_production_mongodb_url
JWT_SECRET  = your_production_jwt_secret
PORT        = platform_provided_port
```

### Important

Production secrets should **never** be committed to GitHub.

The production server receives these values through its environment configuration.

---

# 🧑‍💻 Development Workflow

A typical development workflow for this project is:

```text
Write Code
    ↓
Run Frontend + Backend Locally
    ↓
Test APIs Using Postman
    ↓
Test Application
    ↓
git add .
    ↓
git commit
    ↓
git push
    ↓
Deploy / Update Live Application
```

---

# 📦 Important Git Files

The repository includes a `.gitignore` file to prevent unnecessary and sensitive files from being uploaded.

The following should not be committed:

```text
.env
node_modules/
dist/
build/
logs/
coverage/
temporary files
```

The following should normally remain in the repository:

```text
package.json
package-lock.json
source code
configuration code
routes
controllers
models
frontend source
.env.example
README.md
```

---

# 🧠 Key Concepts Demonstrated

This project demonstrates practical understanding of:

* MERN stack development
* React component architecture
* React routing
* REST API development
* Express.js
* Node.js
* MongoDB
* Mongoose
* JWT authentication
* Cookie-based authentication
* Role-based authorization
* Middleware
* CRUD operations
* Frontend-backend integration
* Environment variables
* CORS
* API testing with Postman
* Git and GitHub
* Production deployment concepts

---

# 📚 What I Learned

Through this project, I gained practical experience in building a complete full-stack application from frontend to backend and database.

### Frontend

* Building React components
* Managing multiple pages
* Implementing client-side routing
* Connecting React with REST APIs
* Structuring frontend code

### Backend

* Creating Express.js APIs
* Organizing controllers and routes
* Implementing middleware
* Connecting applications to MongoDB
* Implementing authentication and authorization

### Database

* Designing MongoDB models
* Using Mongoose
* Storing and retrieving application data

### Authentication

* JWT authentication
* Cookies
* Protected routes
* Role-based authorization

### Development

* Git version control
* GitHub repositories
* Postman API testing
* Environment variable management
* Preparing an application for deployment

---

# 🔮 Future Improvements

The project can be extended with additional features such as:

* [ ] Admin dashboard
* [ ] Multiple elections
* [ ] Election start and end dates
* [ ] Real-time voting statistics
* [ ] Improved result visualization
* [ ] Email verification
* [ ] Password reset
* [ ] Advanced input validation
* [ ] Rate limiting
* [ ] Enhanced security
* [ ] Automated tests
* [ ] Better error handling
* [ ] Improved responsive design
* [ ] Election management
* [ ] User profile management
* [ ] Production monitoring

---

# 🤝 Contributing

Contributions and suggestions are welcome.

## Fork the repository

```bash
git clone https://github.com/jugnu141/voting-app.git
```

Create a new branch:

```bash
git checkout -b feature/your-feature
```

Make your changes and commit:

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

This project is developed for **educational, demonstration, and portfolio purposes**.

For use in a real-world election system, additional security measures, auditing, privacy controls, identity verification, infrastructure security, and extensive testing would be required.

---

# 📄 License

This project is currently intended for educational and portfolio purposes.

---

# 👨‍💻 Author

## Nawaz Alam

GitHub:

[https://github.com/jugnu141](https://github.com/jugnu141)

Project Repository:

[https://github.com/jugnu141/voting-app](https://github.com/jugnu141/voting-app)

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

# 🗳️ Voting App

**Built with React • Node.js • Express • MongoDB**

🚧 **Live deployment coming soon.**

`
