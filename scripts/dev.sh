#!/usr/bin/env bash

echo ""
echo "----------------------------------------"
echo "Archaeologist Dev Environment Boot"
echo "----------------------------------------"
echo ""

echo "Killing Node processes..."
taskkill /F /IM node.exe 2>nul || true

echo "Cleaning Prisma..."
rmdir /s /q node_modules\.prisma 2>nul || true

echo ""
echo "Starting Docker..."
docker compose -f docker/docker-compose.yml up -d

echo ""
echo "Waiting DB..."
sleep 5

echo ""
echo "Generating Prisma (dataproxy)..."
npx prisma generate --no-engine

echo ""
echo "Syncing DB..."
npx prisma db push

echo ""
echo "Running tests..."
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/archaeologist_test" yarn test || echo "Tests failed"

echo ""
echo "Starting app..."
PRISMA_CLIENT_ENGINE_TYPE=dataproxy yarn dev