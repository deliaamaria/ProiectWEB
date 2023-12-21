import "../css/login.css"
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Correct: useNavigate is called inside a React component
    navigate('/student-page');
  };

  return (
    <div className="Login">
      <div className="login-box">
        <h1>Login</h1>
        <form>
            <div>
                <input type="email" id="email" name="email" required placeholder="Email or Username"/>
                
            </div>
            <div>
                <input type="password" id="parola" name="parola" required placeholder="Password"/>
            </div>
            <input type="submit" value="Autentificare" id="submit" onClick={handleClick} />
        </form>

      </div>
    </div>
  );
}

export default Login;
