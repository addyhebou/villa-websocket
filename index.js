import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';

/**
 * Configures and initializes the server.
 *
 * @type {Object}
 * @property {string} name - The name of the server.
 * @property {number} port - The port number on which the server listens.
 * @property {number} timeout - The timeout duration in milliseconds.
 * @property {function} onConnect - Callback function invoked when a client connects.
 * @property {Object[]} extensions - Array of extensions to be used by the server.
 * @property {SQLite} extensions[].SQLite - SQLite extension configuration.
 * @property {string} extensions[].SQLite.database - The name of the SQLite database file.
 *
 * @see {@link https://tiptap.dev/docs/hocuspocus/server/configuration | Hocuspocus Server Configuration Documentation}
 */
const server = Server.configure({
  name: 'Collaboration server',
  port: 8080,
  timeout: 3000,

  /**
   * This method is called when a client connects to the server.
   */
  async onConnect() {
    console.log('Client connected');
  },

  extensions: [
    new SQLite({
      database: 'db.sqlite',
    }),
  ],
});

server.listen();
