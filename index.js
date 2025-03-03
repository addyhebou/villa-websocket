import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import express from 'express';
import { createRequire } from 'module';

// For CommonJS compatibility
const require = createRequire(import.meta.url);

// Initialize the Express app
const app = express();

// Setup Hocuspocus Server
const server = Server.configure({
  name: 'Collaboration Server',
  port: process.env.PORT || 8080,
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

// Use Express to serve a basic route
app.get('/', (req, res) => {
  res.send('Hocuspocus WebSocket Server is running.');
});

// Start both the Hocuspocus server and the Express app
server.listen().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(
      `Express and WebSocket server running on port ${process.env.PORT || 8080}`
    );
  });
});
