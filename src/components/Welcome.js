import "./Welcome.css";
import Contact from "./Contact";
import Navbar from "./Navbar";

const Welcome = () => {
  return (
    <div className="home_container">
      <Navbar />
      <Contact />
    </div>
  );
};
export default Welcome;
