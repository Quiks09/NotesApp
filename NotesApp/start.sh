#!/bin/bash

echo "Starting the full app setup..."

cd backend 

echo "Starting PostgreSQL Docker container..."
docker compose up -d

echo "Installing backend dependencies..."
npm install

echo "Running Prisma generate and migrate..."
npx prisma generate
npx prisma migrate deploy

echo "Starting the backend server in background..."
nohup npm run start > backend.log 2>&1 &

cd ../frontend 

echo "Installing frontend dependencies..."
npm install

echo "Starting the frontend server in background..."
nohup npm run dev > frontend.log 2>&1 &

echo "Setup complete."
