# Client Management System

## Overview
The **Client Management System** is a full-stack web application designed to help businesses manage client information efficiently. Built with **React** (frontend), **Node.js/Express** (backend), and **PostgreSQL** (database), this system allows users to add, update, and delete client details while maintaining a user-friendly experience.

## Features
- Add, edit, and delete client records
- Search and filter clients

## Tech Stack
### Frontend (Client)
- React
- React Router
- Axios
- Tailwind CSS (for styling)

### Backend (Server)
- Node.js & Express
- PostgreSQL & Sequelize ORM

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- PostgreSQL

### Setup Instructions
#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/client-management.git
cd client-management
```

#### 2. Install dependencies
##### Install backend dependencies:
```bash
cd server
npm install
```
##### Install frontend dependencies:
```bash
cd ../client
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the `server/` directory and add:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=client_management
```

#### 4. Run the Application
##### Start the backend server:
```bash
cd server
npm run dev
```
##### Start the frontend:
```bash
cd ../client
npm start
```

The application should now be running at `http://localhost:3000/`.

## API Endpoints
### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Add a new client
- `PUT /api/clients/:id` - Update client details
- `DELETE /api/clients/:id` - Delete a client

## Deployment
### Backend (Server)
Deploy the Node.js server using **Heroku** or **AWS EC2**:
```bash
git push heroku main
```

### Frontend (Client)
Deploy the React app using **Vercel** or **Netlify**:
```bash
npm run build
```

## Future Enhancements
- Secure API endpoints with JWT authentication
- Responsive design for mobile and desktop
- Role-based access control
- Client analytics dashboard
- Email notifications

## Contributing
Feel free to fork this repository and submit pull requests.

## License
This project is open-source

---
**Author:** Yunseon Choi  
**GitHub:** (https://github.com/kellychoi47)

