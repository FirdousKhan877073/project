# 🚀 TaskFlow Pro - Complete Full-Stack Project Management System

![Status](https://img.shields.io/badge/status-live-success)
![Frontend](https://img.shields.io/badge/frontend-Vercel-blue)
![Backend](https://img.shields.io/badge/backend-Railway-orange)
![Database](https://img.shields.io/badge/database-MongoDB-green)

## 📌 Live Demo

| Component | URL |
|-----------|-----|
| **Frontend** | [https://taskflow-frontend.vercel.app/login.html](https://taskflow-frontend.vercel.app/login.html) |
| **Backend API** | [https://project.up.railway.app](https://project.up.railway.app) |
| **API Health Check** | [https://project.up.railway.app/api/health](https://project.up.railway.app/api/health) |

---

## 📖 Overview

**TaskFlow Pro** is a complete, production-ready project management system built with the MERN stack. It enables teams to manage projects, assign tasks, track progress, and collaborate effectively with role-based access control.

### 🎯 Key Highlights
- ✅ **Full-Stack Application** - Frontend + Backend + Database
- ✅ **Role-Based Access** - Admin, Manager, Member roles
- ✅ **Real-Time Dashboard** - Live charts and statistics
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark/Light Theme** - User preference saved
- ✅ **Deployed Live** - Vercel (Frontend) + Railway (Backend)

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT token-based authentication
- Role-based access control (Admin/Manager/Member)
- Protected routes and API endpoints

### 📁 Project Management
| Feature | Description |
|---------|-------------|
| Create Project | Add new projects with name, description, due date |
| Edit Project | Update project details and status |
| Delete Project | Remove projects (Admin only) |
| Progress Tracking | Track project completion percentage |
| Status Management | Active, Completed, On Hold statuses |

### ✅ Task Management
| Feature | Description |
|---------|-------------|
| Create Task | Add tasks with title, priority, due date |
| Assign Tasks | Assign tasks to team members |
| Status Tracking | Pending, In Progress, Completed |
| Priority Levels | High 🔥, Medium 📌, Low ✅ |
| Due Date Alerts | Overdue tasks highlighted in red |
| Bulk Actions | Complete/Delete tasks quickly |

### 👥 Team Management
| Feature | Description |
|---------|-------------|
| Add Members | Add team members with roles (Admin only) |
| Role Assignment | Admin, Manager, Member roles |
| Task Statistics | View tasks completed by each member |
| Remove Members | Remove team members (Admin only) |

### 📊 Dashboard & Analytics
- Real-time statistics cards
- Interactive task distribution chart (Doughnut)
- Priority breakdown chart (Bar)
- Weekly progress tracking (Line chart)
- Tasks by assignee visualization (Pie chart)
- Project progress tracking (Bar chart)

### 🎨 User Interface
- Modern glass-morphism design
- Dark/Light theme toggle with persistence
- Fully responsive (Mobile, Tablet, Desktop)
- Smooth animations and transitions
- Toast notifications for user actions

### 📤 Export & Reporting
- Export task data to CSV format
- Generate analytics reports

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling & Animations |
| JavaScript (ES6+) | Functionality |
| Chart.js | Data visualization |
| Font Awesome | Icons |
| Google Fonts | Poppins font |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Cors | Cross-origin requests |
| Dotenv | Environment variables |

### Deployment
| Platform | Purpose |
|----------|---------|
| Vercel | Frontend hosting |
| Railway | Backend hosting |
| MongoDB Atlas | Cloud database |
| GitHub | Version control |

---


---

## 🔑 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |

### Task Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/tasks` | Get all tasks | Authenticated |
| POST | `/api/tasks` | Create task | Admin only |
| PUT | `/api/tasks/:id/status` | Update task status | Assigned user/Admin |
| PUT | `/api/tasks/:id` | Update task | Admin only |
| DELETE | `/api/tasks/:id` | Delete task | Admin only |
| GET | `/api/tasks/dashboard/stats` | Get dashboard stats | Authenticated |

### Project Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Authenticated |
| POST | `/api/projects` | Create project | Admin only |
| PUT | `/api/projects/:id` | Update project | Admin only |
| DELETE | `/api/projects/:id` | Delete project | Admin only |

### User Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users` | Get all users | Authenticated |

---

## 🔑 Demo Credentials

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@taskflow.com | admin123 | Full access (Create/Delete projects, tasks, users) |
| **Manager** | john@taskflow.com | user123 | Can create/edit tasks, view all |
| **Member** | jane@taskflow.com | manager123 | Can only update own tasks |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/FirdousKhan877073/taskflow-fullstack.git
cd taskflow-fullstack

### Step 2: Install Backend Dependencies
cd backend
npm install

### Step 3: Configure Environment Variables
Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here

### Step 4: Start the Backend Server
npm start
# Server runs on http://localhost:5000

### Step 5: Open Frontend
# Simply open frontend/index.html in your browser
# Or use Live Server in VS Code

### Step 6: Access the Application
Frontend: http://localhost:5500/frontend/index.html

Backend API: http://localhost:5000

### Project Structure

Project/
├── frontend/
│   ├── index.html
│   └── dashboard.html
├── backend/
│   ├── server.js
│   ├── config/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── README.md
