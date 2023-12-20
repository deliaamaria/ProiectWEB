import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import StudentPage from './components/StudentPage';
import TeacherPage from './components/TeacherPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-page" element={<StudentPage />} />
        <Route path="/teacher-page" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
