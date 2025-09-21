// frontend/src/App.jsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;