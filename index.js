import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Create Express app
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

// Start the Hocuspocus WebSocket server
server.listen();
console.log(
  `Hocuspocus WebSocket server running at ws://localhost:${
    process.env.PORT || 8080
  }`
);

// Setup Express HTTP endpoint
app.get('/', (req, res) => {
  res.send('Hocuspocus WebSocket Server is running.');
});

// Start the Express server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
