#!/bin/sh
set -e

echo "Waiting for postgres..."
while ! nc -z musicstudio-db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

echo "Running migrations..."
npx prisma migrate deploy

echo "Generating Prisma Client..."
npx prisma generate

echo "Running seed..."
npx prisma db seed || echo "Seed failed or already run"

echo "Starting application..."
exec "$@"