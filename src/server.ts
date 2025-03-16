import http from 'http';
import app from './app';


const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully...');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit(0);
  });

  // Forcefully shut down after 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default server;