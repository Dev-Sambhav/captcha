import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {currentUser, setCurrentUser} = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // check res is valid or not
      if (!res) {
        throw new Error("Couldn't Sign the user");
      }
      await updateProfile(res.user, {
        displayName: name,
      });
      setCurrentUser(res.user);
    } catch (err) {
        if(err.code === "auth/email-already-in-use"){
          alert("Email already in Use")
        }
        else alert(err.message);
    }
  };

  if(currentUser){
    navigate('/')
  }

  return (
    <div className="app_container">
      <form className="login_form" onSubmit={handleSubmit}>
        <h2 className="title">Register</h2>
        <div className="user_info">
          <label className="info">
            <span className="text">Display Name</span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="user_name"
              value={name}
              required
            />
          </label>
          <label className="info">
            <span className="text">Email</span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="user_email"
              value={email}
              required
            />
          </label>
          <label className="info">
            <span className="text">Password</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="user_pass"
              value={password}
              required
            />
          </label>
        </div>
        <button className="btn">Register</button>
        <p>
          Already have an Account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
