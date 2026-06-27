# 🧾 Invoice Processing System

A Java-based invoice processing application built using Spring Boot and JPA-Hibernate.  

This system helps manage invoices, customers, and billing records in a structured and scalable way using REST APIs.

---

## 🚀 Features

- Create new invoices
- Fetch invoice details by ID
- List all invoices
- Update invoice data
- Delete invoices
- Customer-wise invoice mapping
- Automatic persistence using JPA-Hibernate

---

## 🧠 Why this project

Handling invoices manually is error-prone and slow.

This project demonstrates how backend systems manage billing data using:
- RESTful APIs
- Database relationships
- ORM (Object Relational Mapping)
- Layered architecture

---

## 🏗️ Tech Stack

Backend:
- Java
- Spring Boot
- Spring Data JPA
- Hibernate ORM
- REST APIs

Database:
- MySQL / PostgreSQL (any relational DB)

Tools:
- Maven
- Postman (for API testing)

---

## ⚙️ How to run locally

### Clone the repo
git clone https://github.com/your-username/invoice-processing-system.git

---

### Backend setup

Update application.properties:

Run backend:

mvn spring-boot:run

Backend runs at:
http://localhost:8080

---

### Frontend setup

cd client

npm install

npm start

Frontend runs at:
http://localhost:3000

---

## 🔐 Authentication Flow

1. User signs up or logs in
2. Server generates JWT token
3. Token stored in frontend
4. Token sent in every request:

Authorization: Bearer <token>

5. Backend validates token before allowing access

---

## 📁 Project Structure

Backend:
- Controller → APIs
- Service → Business logic
- Repository → DB layer
- Entity → Models
- Security → JWT config

Frontend:
- Pages → Login, Signup, Onboarding
- Components → UI forms
- Services → API calls

---

## 🔌 API Endpoints

Auth:
- POST /signup
- POST /login

Onboarding:
- POST /user/basic
- POST /user/verify
- POST /user/cards

Cards:
- GET /user/cards

---

## 🔒 Security Features

- JWT authentication
- BCrypt password hashing
- Protected routes
- OTP verification flow

---

## 🚀 Future Improvements

- Email OTP system
- Refresh tokens
- Role-based access (Admin/User)
- Payment integration
- Docker deployment
- Better UI

---

## 👩‍💻 Author

Rishita Gangwal
