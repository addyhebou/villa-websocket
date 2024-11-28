import express from 'express';
import expressWebsockets from 'express-ws';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from '@hocuspocus/server';

// Configure Hocuspocus
const server = Server.configure({
  name: 'Collaboration',
  port: 1234,
});

// Setup your express instance using the express-ws extension
const { app } = expressWebsockets(express());

app.use(cors());
app.use(bodyParser.json());

// A basic http route
app.get('/', (request, response) => {
  response.send('Hello World!');
});

// Add a websocket route for Hocuspocus
// You can set any contextual data like in the onConnect hook
// and pass it to the handleConnection method.
app.ws('/collaboration', (websocket, request) => {
  const context = {
    user: {
      id: 1234,
      name: 'Jane',
    },
  };

  server.handleConnection(websocket, request, context);
});

// Start the server
app.listen(1234, () => console.log('Listening on http://127.0.0.1:1234'));
