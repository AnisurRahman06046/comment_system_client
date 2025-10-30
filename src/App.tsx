import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { CommentProvider } from './contexts/CommentContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <CommentProvider>
            <AppRoutes />
          </CommentProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
