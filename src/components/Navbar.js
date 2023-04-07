import { useAuthContext } from "../hooks/useAuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./Navbar.css"

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = signOut(auth);
      // check res is valid or not
      if (!res) {
        throw new Error("Couldn't Sign the user");
      }
      navigate("/login");
      setCurrentUser(null);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="nav">
      <h2>Hey, {currentUser.displayName}</h2>
      <button className="btn btn_logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default Navbar;
