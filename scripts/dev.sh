#!/usr/bin/env bash

set -e

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
echo "Running Prisma migrations..."
npx prisma migrate deploy

echo ""
echo "Generating Prisma client..."
npx prisma generate

echo ""
echo "Running tests..."
yarn test --run

echo ""
echo "Starting Next.js dev server..."
yarn dev