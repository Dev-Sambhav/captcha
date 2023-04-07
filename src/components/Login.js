import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useAuthContext();
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (!value) {
      alert("Please validate the captcha");
      return;
    }
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        setCurrentUser(user);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") alert("User doesn't exists");
        else if (err.code === "auth/wrong-password")
          alert("Password is Invalid");
        else console.log(err.message);
      });
  };
  const onChange = (v) => {
    if (v) setValue(v);
  };
  if (currentUser) {
    navigate("/");
  }
  return (
    <form className="login_form" onSubmit={handleSubmit}>
      <h2 className="title">Login</h2>
      <div className="user_info">
        <label className="info">
          <span className="text">Email</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="user_email"
            required
          />
        </label>
        <label className="info">
          <span className="text">Password</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="user_pass"
            required
          />
        </label>
        <ReCAPTCHA
          sitekey="6LfYZ2IlAAAAAFSlNtHj-HNO-NaJ-DOwgo24XFBc"
          onChange={onChange}
        />
      </div>
      <button className="btn">Login</button>
      <p>
        Don't have an Account?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </form>
  );
};
export default Login;
