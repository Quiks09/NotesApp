@echo off
setlocal enabledelayedexpansion

echo Starting the full app setup...

cd backend

echo Starting PostgreSQL Docker container...
docker compose up -d

echo Installing backend dependencies...
call npm install

echo Running Prisma generate and migrate...
call npx prisma generate
call npx prisma migrate deploy

echo Starting the backend server in background...
start cmd /k "npm run start"

cd ..
cd frontend

echo Installing frontend dependencies...
call npm install

echo Starting the frontend server in background...
start cmd /k "npm run dev"