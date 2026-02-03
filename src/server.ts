import { Server } from 'http';
import { app } from './app';
import { ENV } from './config/env';
import { connectDB } from './db/connect.db';
import { seedAdmin } from './utils/seed.admin';
let server: Server;

const port = ENV.PORT;
const startServer = () => {
  server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

(() => {
  startServer();
  connectDB();
  seedAdmin()
})();
