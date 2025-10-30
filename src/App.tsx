import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CommentProvider } from './contexts/CommentContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CommentProvider>
          <AppRoutes />
        </CommentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
