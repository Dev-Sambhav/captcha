const Form = () => {
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
      </div>
      <button className="btn">Login</button>
    </form>
  );
};
export default Form;
