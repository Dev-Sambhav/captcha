import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(null);
  const {currentUser, setCurrentUser} = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!value){
      alert("Please validate the captcha");
      return;
    }
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

  const onChange = (v) => {
    if(v) setValue(v);
  };
  return (
    <>
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
          <ReCAPTCHA
            sitekey="6LfYZ2IlAAAAAFSlNtHj-HNO-NaJ-DOwgo24XFBc"
            onChange={onChange}
          />
        </div>
        <button className="btn">Register</button>
        <p>
          Already have an Account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};
export default Register;
