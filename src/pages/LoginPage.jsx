import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, setUser } from "../redux/authSlice";
import { loginUser, getUserProfile } from "../api/api";

function LoginPage() {
  const [email, setEmail] = useState(localStorage.getItem("savedEmail") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Save or remove email in localStorage
  const saveEmail = () => 
    rememberMe ? localStorage.setItem("savedEmail", email) : localStorage.removeItem("savedEmail");

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { body } = await loginUser(email, password);
      dispatch(loginSuccess({ token: body.token }));

      const userData = await getUserProfile(body.token);
      dispatch(setUser(userData.body));

      saveEmail(); 
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
