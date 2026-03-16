#!/usr/bin/env bash

set -e

echo ""
echo "----------------------------------------"
echo "Archaeologist Dev Environment Boot"
echo "----------------------------------------"
echo ""

echo "Stopping Docker containers..."
docker compose -f docker/docker-compose.yml down

echo "Cleaning database volumes..."
docker compose -f docker/docker-compose.yml down -v

echo "Starting Docker containers..."
docker compose -f docker/docker-compose.yml up -d

echo ""
echo "Waiting for database..."
sleep 5

echo ""
echo "Applying Prisma migrations..."
npx prisma migrate deploy

echo ""
echo "Generating Prisma client..."
npx prisma generate

echo ""
echo "Running tests..."
npm run test -- --run

echo ""
echo "Starting development server..."
npm run dev