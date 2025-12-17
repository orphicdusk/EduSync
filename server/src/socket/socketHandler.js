const socketIO = require('socket.io');

// Store connected users
const connectedUsers = new Map();

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle user joining
    socket.on('join', (userId) => {
      connectedUsers.set(userId, socket.id);
      socket.userId = userId;
      console.log('User joined:', userId);
      // Broadcast to all clients that a user has come online
      socket.broadcast.emit('userOnline', userId);
    });

    // Handle sending messages
    socket.on('sendMessage', (messageData) => {
      const { senderId, recipientId, courseId, message, type } = messageData;
      
      // Save message to database (in a real implementation)
      // For now, we'll just broadcast it
      
      const messagePayload = {
        senderId,
        recipientId,
        courseId,
        message,
        type,
        timestamp: new Date(),
        messageId: Date.now().toString()
      };
      
      // If it's a private message
      if (recipientId) {
        const recipientSocketId = connectedUsers.get(recipientId);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('receiveMessage', messagePayload);
        }
        // Also send to sender for confirmation
        socket.emit('receiveMessage', messagePayload);
      } 
      // If it's a course chat
      else if (courseId) {
        // Broadcast to all users in the course
        socket.to(`course_${courseId}`).emit('receiveMessage', messagePayload);
        // Also send to sender for confirmation
        socket.emit('receiveMessage', messagePayload);
      }
    });

    // Handle joining a course room
    socket.on('joinCourseRoom', (courseId) => {
      socket.join(`course_${courseId}`);
      console.log(`User joined course room: ${courseId}`);
    });

    // Handle leaving a course room
    socket.on('leaveCourseRoom', (courseId) => {
      socket.leave(`course_${courseId}`);
      console.log(`User left course room: ${courseId}`);
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
      const { userId, courseId, isTyping } = data;
      socket.to(`course_${courseId}`).emit('userTyping', { userId, courseId, isTyping });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      // Remove user from connected users map
      for (let [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          // Notify others that user went offline
          socket.broadcast.emit('userOffline', userId);
          break;
        }
      }
    });
  });

  return io;
};

module.exports = { initializeSocket, connectedUsers };