# 🗒️ **Notes App** – Full Stack Challenge


A full-stack web application to create, manage, tag, and filter notes. Built with React (Vite), TailwindCSS, Node.js, Express, PostgreSQL, and Prisma ORM.

## ✨ _Features_

### Phase 1

Create, edit, and delete notes

Archive and unarchive notes

List active and archived notes

### Phase 2 (Bonus)

Tag notes

Filter notes by tag

___________________________________________________________
## 🛠 _Technologies Used_

### General

Node.js: v22.14.0

npm: 10.9.2

Docker: 28.1.1

Docker Compose: v3 (YAML format)

PostgreSQL: 15

### _Backend_

Express: ^5.1.0

Prisma: ^6.10.1

@prisma/client: ^6.10.1

CORS: ^2.8.5

### Frontend

React: ^19.1.0

Vite: ^6.3.5

TailwindCSS: ^4.1.10

@tailwindcss/vite: ^4.1.10

Axios: ^1.10.0

React Router DOM: ^7.6.2

React Hot Toast: ^2.5.2

Font Awesome (Icons): ^6.7.2

___________________________________________________________

## ⚙️ _Project Structure_
```
notes-app/ 
├── backend/
│   ├── prisma/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   └── App.jsx
│   └── index.html
├── start.sh              # Script for Linux/macOS
├── start.bat             # Script for Windows
└── README.md
```
___________________________________________________________

## 🚀 _Quick Start_

▶ For Linux/macOS Users

### Make the script executable:

chmod +x start.sh

Run the script:

./start.sh

___________________________________________________________

## 🚨 _For Windows Users_

### Double-click the start.bat file, or run it from terminal:

start.bat

This will:

Start the PostgreSQL container

Install backend dependencies

Run Prisma migrations

Start the backend

Install frontend dependencies

Start the frontend

___________________________________________________________

## 🌐 _API Endpoints Overview_

### Notes

GET /notes/active - Get active notes

GET /notes/archived - Get archived notes

GET /notes/:id - Get note by ID

POST /notes - Create note

PUT /notes/:id - Update note

DELETE /notes/:id - Delete note

PATCH /notes/:id/archive - Archive/unarchive note

PATCH /notes/:id/tags - Add tags to note

### Tags

GET /tags - List all tags

___________________________________________________________

## 🙏 Credits

Developed by Fabrizio Fasoli for Ensolvers job application.
