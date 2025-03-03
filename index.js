import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import express from 'express';
import { createRequire } from 'module';

// For CommonJS compatibility
const require = createRequire(import.meta.url);

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

// Start Hocuspocus
server.listen();

// Express app to check if server is running
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hocuspocus WebSocket Server is running.');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
