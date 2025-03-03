import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

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

// Start only the Hocuspocus WebSocket server
server.listen();
console.log(
  `Hocuspocus WebSocket server running at ws://localhost:${
    process.env.PORT || 8080
  }`
);
