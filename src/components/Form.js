import ReCAPTCHA from "react-google-recaptcha";

const Form = () => {
    const onChange = (value)=>{
        console.log("Captcha value:", value);
    }
  return (
    <form className="login_form">
      <h2 className="title">Login</h2>
      <div className="user_info">
        <label className="info">
          <span className="text">Email</span>
          <input type="email" className="user_email" />
        </label>
        <label className="info">
          <span className="text">Password</span>
          <input type="password" className="user_pass" />
        </label>
        <ReCAPTCHA 
            sitekey="6LfYZ2IlAAAAAFSlNtHj-HNO-NaJ-DOwgo24XFBc"
            onChange={onChange}
        />
      </div>
      <button className="btn">Login</button>
    </form>
  );
};
export default Form;
