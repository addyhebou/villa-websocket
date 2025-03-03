import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080;
const app = express();

// Enable CORS to allow frontend connections from different domains
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hocuspocus WebSocket Server is running');
});

// Create an Express HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Attach WebSocket server to Express
const websocketServer = new WebSocketServer({ server });

const hocuspocus = Server.configure({
  name: 'Collaboration server',
  timeout: 3000,

  async onConnect() {
    console.log('Client connected to Hocuspocus');
  },

  extensions: [
    new SQLite({
      database: 'db.sqlite',
    }),
  ],
});

// Start Hocuspocus on the same server
hocuspocus.listen(websocketServer);
