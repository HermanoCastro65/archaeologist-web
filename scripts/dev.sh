#!/usr/bin/env bash

echo ""
echo "----------------------------------------"
echo "Archaeologist Dev Environment Boot"
echo "----------------------------------------"
echo ""

echo "Stopping Docker containers..."
docker compose -f docker/docker-compose.yml down

echo "Removing Docker volumes..."
docker compose -f docker/docker-compose.yml down -v

echo "Starting Docker containers..."
docker compose -f docker/docker-compose.yml up -d

echo ""
echo "Waiting for database to start..."
sleep 10

echo ""
echo "Resetting database..."
npx prisma migrate reset --force

echo ""
echo "Generating Prisma client..."
npx prisma generate

echo ""
echo "Running tests..."
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/archaeologist_test" yarn test || echo "Tests failed"

echo ""
echo "Starting Next.js dev server..."
yarn dev