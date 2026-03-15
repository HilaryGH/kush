// This file exports both a Provider component and a custom hook
// Fast Refresh warnings are expected but harmless - the app works correctly
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
      const newSocket = io(socketUrl, {
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        // Join user-specific room
        newSocket.emit('join', user.id);

        // Join role-specific rooms
        if (user.role === 'rider') {
          newSocket.emit('join_rider', user.id);
        } else if (user.role === 'vendor') {
          // Get vendor ID and join vendor room
          newSocket.emit('join_vendor', user.id);
        }
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for accessing socket context
export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
