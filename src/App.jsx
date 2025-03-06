import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TodoWrapper } from './components/TodoWrapper';
import Landing from './components/Landing';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/todo" element={<TodoWrapper />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
