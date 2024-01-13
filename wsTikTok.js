const WebSocket = require('ws');
const { WebcastPushConnection } = require('tiktok-live-connector');

// Define the TikTok username you want to connect to
const tiktokUsername = "calimasih"; // Replace with your desired username

// Create a new WebcastPushConnection instance
const tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 }); // You can choose any available port

// WebSocket server event handling
wss.on('connection', ws => {
    console.log('WebSocket Client Connected');

    // Connect to the TikTok Live chat when a client is connected
    tiktokLiveConnection.connect()
        .then(state => {
            console.info(`Connected to roomId ${state.roomId}`);
        })
        .catch(err => {
            console.error('Failed to connect', err);
        });

    // Event handler for incoming chat messages
    tiktokLiveConnection.on('chat', data => {
        // Send chat messages to connected WebSocket clients
        ws.send(JSON.stringify(data));
    });

    // Handle WebSocket client disconnect
    ws.on('close', () => {
        console.log('WebSocket Client Disconnected');
    });
});
