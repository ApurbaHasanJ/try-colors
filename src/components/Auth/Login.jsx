import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const { login, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      e.target.email.focus();
      return;
    } else if (passwordError) {
      e.target.password.focus();
      return;
    }

    // login
    login(email, password).then((result) => {
      const user = result.user;
      setUser(user);
      navigate(location.state.pathname || "/");
    });
  };

  // Uncontrolled component => controlled component
  const handleEmail = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        emailInput
      )
    ) {
      setEmailError("Please provide a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePassword = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    if (passwordInput.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else if (!/.+[A-Z]/.test(passwordInput)) {
      setPasswordError("Password must contain at least one capital letter");
    } else {
      setPasswordError("");
    }
  };
  return (
    <form className="mt-20" onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0  peer ${
            email
              ? emailError
                ? "border-red-500"
                : "border-green-500"
              : "border-gray-300 focus:border-blue-600"
          } `}
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email Address
        </label>
        {emailError && <span className="error">{emailError}</span>}
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0  peer ${
            password
              ? passwordError
                ? "border-red-500"
                : "border-green-500"
              : "border-gray-300 focus:border-blue-600"
          }`}
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
        {passwordError && <span className="error">{passwordError}</span>}
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>

      <p>
        Don&apos;t have an account? <Link to="/register" state={location.state}>Register here</Link>
      </p>
    </form>
  );
};

export default Login;
