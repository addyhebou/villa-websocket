// index.js
import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import express from 'express';
import { createRequire } from 'module';
import dotenv from 'dotenv';

// For CommonJS compatibility
const require = createRequire(import.meta.url);
dotenv.config();

// Environment variables for dynamic ports
const expressPort = process.env.EXPRESS_PORT || 8081; // Default to 8081 if not provided
const wsPort = process.env.WS_PORT || 8080; // Default to 8080 if not provided

// Setup the Hocuspocus WebSocket server
const wsServer = Server.configure({
  name: 'Collaboration Server',
  port: wsPort,
  timeout: 3000,
  async onConnect() {
    console.log('Client connected');
  },
  extensions: [
    new SQLite({
      database: 'db.sqlite',
      driver: require('better-sqlite3'),
    }),
  ],
});

// Start the WebSocket server
wsServer.listen();
console.log(`Hocuspocus WebSocket server running at ws://localhost:${wsPort}`);

// Express app for HTTP server
const app = express();

app.get('/', (req, res) => {
  res.send('Express server running.');
});

// Start the Express server
app.listen(expressPort, () => {
  console.log(`Express server listening on port ${expressPort}`);
});
