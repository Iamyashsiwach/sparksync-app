#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# The name of the packaged build file, passed as the first argument
PACKAGE_NAME=$1
APP_DIR="/var/www/sparksync"

# Check if a package name is provided
if [ -z "$PACKAGE_NAME" ]; then
  echo "Usage: ./deploy.sh <package-name>.tar.gz"
  exit 1
fi

# Check if the package file exists
if [ ! -f "$PACKAGE_NAME" ]; then
  echo "Package file $PACKAGE_NAME not found!"
  exit 1
fi

echo "Deploying $PACKAGE_NAME..."

# Create the application directory if it doesn't exist
mkdir -p $APP_DIR

# Unzip the package
tar -xzf $PACKAGE_NAME -C $APP_DIR

# Navigate to the app directory
cd $APP_DIR

# Stop the existing application process managed by pm2
# The --silent flag prevents pm2 from throwing an error if the process doesn't exist
pm2 stop sparksync --silent || true
pm2 delete sparksync --silent || true

# Start the new application with pm2
# The --name flag gives the process a name for easy management
pm2 start npm --name "sparksync" -- run start

# Save the pm2 process list to restart on server reboot
pm2 save

echo "Deployment successful!" 