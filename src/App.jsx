import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TodoWrapper } from './components/TodoWrapper';
import Landing from './components/Landing';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/todo" 
              element={
                <PrivateRoute>
                  <TodoWrapper />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

// Private Route component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

export default App;
