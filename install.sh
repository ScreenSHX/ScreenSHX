echo "Installing Yarn globally..."
npm -ig yarn &> /dev/null

echo "Installing Electron and node-notifier using Yarn..."
yarn add electron node-notifier
