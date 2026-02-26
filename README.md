# 📅 Meeting Scheduler Backend

A backend service that allows users to schedule meetings while preventing overlapping time slots.

Built with:
- Node.js
- TypeScript
- Express
- Sequelize ORM
- MySQL
- JWT Authentication

---

# 🚀 How to Run This Project Locally

Follow the steps below carefully.

---

## 1️⃣ Clone the Repository

Open terminal and run:

git clone <your-repository-url>
cd meeting-scheduler

---

## 2️⃣ Install Dependencies

Run:

npm install

---

## 3️⃣ Create MySQL Database

Open phpMyAdmin or MySQL CLI and create a database named:

meeting_scheduler

---

## 4️⃣ Create Environment File

In the project root folder, create a file named:

.env

Inside that file, add:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_mysql_password

DB_NAME=meeting_scheduler

JWT_SECRET=yourSecretKey

⚠️ Important:
- Replace `your_mysql_password` with your actual MySQL password.
- Do NOT upload the `.env` file to GitHub.

---

## 5️⃣ Run Database Migrations

Run this command to create tables:

npx sequelize-cli db:migrate

This will create:
- users table
- meetings table

---

## 6️⃣ Start the Server

Run:

npm run dev

Server will start at:

http://localhost:5000

---

# 🔐 Authentication

After login, you will receive a JWT token.

For protected APIs, add this header:

Authorization: Bearer <your-token>

---

# 📌 API Endpoints

## User APIs

POST /users  
→ Create a new user

POST /login  
→ Login and receive JWT token

GET /users/:id  
→ Get user profile (Protected)

---

## Meeting APIs (Protected)

POST /meetings  
→ Create meeting (No overlapping allowed)

GET /meetings  
→ Get all meetings

PUT /meetings/:id  
→ Update meeting

DELETE /meetings/:id  
→ Delete meeting

---

# 📅 Filtering Meetings

GET /meetings?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD

Example:

GET /meetings?startDate=2026-06-01&endDate=2026-06-30

---

# 📄 Pagination

GET /meetings?page=1&limit=5

Response includes:
- totalRecords
- currentPage
- totalPages
- meetings

---

# 🧠 Business Logic

Meetings cannot overlap.

Conflict condition:

existing.startTime < new.endTime  
AND  
existing.endTime > new.startTime  

This logic is implemented in the service layer.

---

# 🗄️ Database Tables

## Users
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- createdAt
- updatedAt

## Meetings
- id (Primary Key)
- title
- startTime
- endTime
- userId (Foreign Key → users.id)
- createdAt
- updatedAt

---

# 👨‍💻 Author

Ravindra Kumar  

Backend Developer
