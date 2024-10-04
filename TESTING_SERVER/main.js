const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const PORT = 12345;
const BROADCAST_ADDR = "255.255.255.255";

// Dummy data to broadcast
const deviceData = JSON.stringify({
  id: "device_123",
  name: "ScreenSHX Device",
  status: "active"
});

function broadcastDeviceData() {
  const message = Buffer.from(deviceData);

  client.send(message, 0, message.length, PORT, BROADCAST_ADDR, (err) => {
    if (err) {
      console.error('Failed to send broadcast:', err);
    } else {
      console.log('Broadcast sent.');
    }
  });
}

// Send broadcast every 2 seconds
setInterval(broadcastDeviceData, 2000);

// Client error handler
client.on('error', (err) => {
  console.log(`Client error:\n${err.stack}`);
  client.close();
});

