#!/bin/bash

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

# Copy all project files to the temporary directory
echo "Copying project files..."
find . -type f -not -path "*/\.*" -not -path "*/node_modules/*" -not -path "*/.next/*" | xargs -I {} cp --parents {} "$TEMP_DIR"

# Create a zip file
ZIP_FILE="transcript-ai-project.zip"
echo "Creating zip file: $ZIP_FILE"
cd "$TEMP_DIR" && zip -r "$ZIP_FILE" .

# Move the zip file to the original directory
mv "$TEMP_DIR/$ZIP_FILE" .

# Clean up
rm -rf "$TEMP_DIR"

echo "Done! Your project has been zipped to $ZIP_FILE"
echo "You can download this file from the Tempo file browser."
