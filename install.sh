#!/bin/bash

echo "Installing Yarn globally..."
npm install -g yarn
if [ $? -eq 0 ]; then
    echo "Yarn installed successfully."
else
    echo "Failed to install Yarn."
    exit 1
fi

echo "Installing Electron and node-notifier using Yarn..."
yarn add electron node-notifier
if [ $? -eq 0 ]; then
    echo "Electron and node-notifier installed successfully."
else
    echo "Failed to install Electron and node-notifier."
    exit 1
fi

echo "All installations completed successfully."
exit 0

