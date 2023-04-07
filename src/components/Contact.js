import { useState } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

// css
import "./Contact.css";
const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) {
      alert("Please validate the captcha");
      return;
    }
    const feedback = {
      name,
      email,
      message,
    };
    // SendFeedback(feedback);
    let templateParams = {
      to_name: "Sambhav Sharma",
      from_name: feedback.name,
      message: feedback.message,
    };
    // Step 1: Send the email using EmailJS
    emailjs
      .send(
        "service_zorf9ap",
        "template_k4e07ne",
        templateParams,
        "OHvt5SBkFTQAzWRTu"
      )
      .then((res) => {
        alert("Email sent successfully");
      })
      .catch((err) => {
        console.log("Error occurred: ", err);
      });
    // clear field
    setName("");
    setEmail("");
    setMessage("");
    // open the message box
    setIsOpen(!isOpen);
  };

  const onChange = (v) => {
    if (v) setValue(v);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="page-title">Contact</h2>
      <label>
        <span>Name</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Message</span>
        <textarea
          required
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
      </label>
      <ReCAPTCHA
          sitekey="6LfYZ2IlAAAAAFSlNtHj-HNO-NaJ-DOwgo24XFBc"
          onChange={onChange}
        />
      <button className="btn btn_contact">Submit</button>
    </form>
  );
};
export default Contact;
