# Notes API Backend

A RESTful backend API for user authentication and note management, built with **Node.js**, **Express**, and **MongoDB**.  
Includes JWT-based authentication, protected routes, and a clean, scalable project structure.

---

## Features

- User authentication (Register & Login)
- JWT-based authorization
- CRUD operations for notes
- Protected routes with middleware
- Modular MVC-style architecture
- MongoDB with Mongoose ODM

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- dotenv

---

## Project Structure
project/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── notes.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── note.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── notes.routes.js
│   └── server.js
│
└── package.json

