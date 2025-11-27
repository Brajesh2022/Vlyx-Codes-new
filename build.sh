#!/bin/bash
# Install dependencies
npm install

# Build Tailwind CSS
npx tailwindcss -i ./input.css -o ./style.css --minify

# Verify build
if [ -f "style.css" ]; then
    echo "Tailwind CSS built successfully."
else
    echo "Error: Tailwind CSS build failed."
    exit 1
fi
