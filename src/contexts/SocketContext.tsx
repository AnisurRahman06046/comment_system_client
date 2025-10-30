import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';
import { getToken } from '../services/authService';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Only connect if user is authenticated
    const token = getToken();
    if (!token) {
      return;
    }

    // Initialize socket connection
    const socketInstance = io(SOCKET_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection event handlers
    socketInstance.on('connect', () => {
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setConnected(false);
    });

    socketInstance.on('connect_error', () => {
      setConnected(false);
    });

    socketInstance.on('reconnect', () => {
      setConnected(true);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const value: SocketContextType = {
    socket,
    connected,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
