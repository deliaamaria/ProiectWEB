import React, {useState} from 'react';
import "../css/login.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/authContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    // Correct: useNavigate is called inside a React component
    navigate('/student-page');
    login(username);
  };

  return (
    <div className="Login">
      <div className="login-box">
        <h1>Login</h1>
        <form>
            <div>
                <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="Email or Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                
            </div>
            <div>
                <input 
                type="password" 
                id="parola" 
                name="parola" 
                required 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type="submit" value="Autentificare" id="submit" onClick={handleClick} />
        </form>

      </div>
    </div>
  );
}

export default Login;
