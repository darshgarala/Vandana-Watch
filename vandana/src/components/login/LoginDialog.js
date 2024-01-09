import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import "./LoginDialog.css";
import { Link, useNavigate } from "react-router-dom";
import photo from "./logo1.jpg";
import { authenticateSignup, authenticateLogin } from "../../server/api";
import { DataContext } from "../context/DataProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const accountIntitialValues = {
  login: {
    view: "login",
    heading: "Login",
  },
  signup: {
    view: "signup",
    heading: "SignUp",
  },
};

const signupIntitialvalues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

const LoginDialog = ({ open, setOpen }) => {
  const navigator = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // hide and show password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  // end

  const handleSignup = () => {
    if (!isValidUsername(username)) {
      toast("Username must only contain letters, numbers, and underscores");
      return;
    }
    if (!isValidEmail(email)) {
      toast("Invalid email address");
      return;
    }

    if (!isValidPassword(password)) {
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      toast("Invalid phone number");
      return;
    }

    if (!email || !password || !phone || !username) {
      toast("All fields are required.");
      return;
    }
    setFirstname("");
    setLastname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setPhone("");
    return true;
  };

  function isValidEmail(email) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const atpos = email.indexOf("@");
    const dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos - atpos < 2) {
      toast("Please enter correct email ID");
      return emailRegex.test(email);
    }

    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    if (password.length < 8) {
      toast("Password must be at least 8 characters");
      return false;
    } else if (password.search(/[a-z]/) < 0) {
      toast("Password must contain at least one lowercase letter");
      return false;
    } else if (password.search(/[A-Z]/) < 0) {
      toast("Password must contain at least one uppercase letter");
      return false;
    } else if (password.search(/[0-9]/) < 0) {
      toast("Password must contain at least one number");
      return false;
    }
    return true;
  }

  function isValidPhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }

  function isValidUsername(username) {
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    return usernameRegex.test(username);
  }

  const [account, toggleAccount] = useState(accountIntitialValues.login);
  const [error, setError] = useState(false);
  const { setAccount } = useContext(DataContext);

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountIntitialValues.login);
    setError(false);
  };

  const toggleSignup = () => {
    toggleAccount(accountIntitialValues.signup);
  };

  const signupTologin = () => {
    toggleAccount(accountIntitialValues.login);
  };

  const [signup, setSignup] = useState(signupIntitialvalues);

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let check = handleSignup();
    if (check) {
      let response = await authenticateSignup(signup);
      console.log("=> ", response);
      // console.log(' r = ',response);
      if (response.message === "Please try Again") {
        toast("Usrename Or Email is Already Exits!");
        return;
      } else {
        toggleAccount(accountIntitialValues.login);
        toast("SignUp Successfully...");
      }
    }
  };

  const [login, setLogin] = useState(loginInitialValues);
  const [response, setResponse] = useState({});

  useEffect(() => {
    async function getData() {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token !== null) {
        const data = await axios.post("http://localhost:8001/token", { token });
        // console.log(data);
        if (data.data == "Server Error") {
          return;
        }
        console.log(" = = ", data.data.data);
        setResponse(data.data.data);
        setError(false);
        handleClose();
        setAccount(data.data.data.username);
      }
    }
    getData();
  }, []);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    const data = await authenticateLogin(login);
    // console.log(data);

    if (data === "Admin") {
      navigator("/admin");
      setAccount(login.username);
      handleClose();

      return;
    }
    setResponse(data);
    console.log("res = ", response);
    if (!response || localStorage.length == 0) {
      toast("Plase enter valid username or password");
      setError(true);
    } else {
      toast("login Successfully...");
      setError(false);
      handleClose();
      setAccount(login.username);
    }
  };
  // forget password
  const [forget, setForget] = useState(false);

  const forget_password = () => {
    setForget(true);
    handleClose();
    console.log("forget = ", forget);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className="dialog">
        <div className="login">
          <div className="logni_img">
            <img src={photo} className="logo1" alt="className login_img" />
            <p className="text">{account.heading}</p>
          </div>
          {account.view === "login" ? (
            <div className="login_data">
              {/* {error && <p className="error_msg">Plase enter valid username or password</p>} */}
              <label className="email" htmlFor="user">
                Username
              </label>
              <input
                onChange={(e) => onValueChange(e)}
                name="username"
                type="text"
                id="user"
                placeholder="Enter username"
              />
              <br />
              <label className="password" htmlFor="password">
                Passsword
              </label>
              <input
                onChange={(e) => onValueChange(e)}
                name="password"
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
              />
              <i
                style={{
                  color: "#303030",
                  marginTop: "-26px",
                  marginLeft: "270px",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisiblity}
              >
                {eye}
              </i>
              <br />
              <button className="login_btn" onClick={() => loginUser()}>
                Login
              </button>
              <p className="or">OR</p>
              <Link
                to={`forgetpassword`}
                className="login_OTP"
                onClick={() => forget_password()}
              >
                Forget Password
              </Link>
              <br />
              <Link onClick={() => toggleSignup()} className="login_new_acc">
                New to Vandana ? Create an Account
              </Link>
            </div>
          ) : (
            <div className="signup">
              {/* first name */}
              <div className="signup_data">
                <label className="fname" htmlFor="fname">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="fname"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => {
                    onInputChange(e);
                    setFirstname(e.target.value);
                  }}
                />
                <br />
                {/* last name */}
                <label className="lname" htmlFor="lname">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lname"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => {
                    onInputChange(e);
                    setLastname(e.target.value);
                  }}
                />
                <br />

                {/* u name */}
                <label className="uname" htmlFor="uname">
                  UserName
                </label>
                <input
                  type="text"
                  name="username"
                  id="uname"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    onInputChange(e);
                    setUsername(e.target.value);
                  }}
                />
                <br />

                {/* email */}
                <label className="email" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => {
                    onInputChange(e);
                    setEmail(e.target.value);
                  }}
                />
                <br />

                {/* pass  */}
                <label className="password" htmlFor="password">
                  Passsword
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    onInputChange(e);
                    setPassword(e.target.value);
                  }}
                />
                <i
                  style={{
                    color: "#303030",
                    marginTop: "-26px",
                    marginLeft: "270px",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisiblity}
                >
                  {eye}
                </i>
                <br />

                {/* phone */}
                <label className="phone" htmlFor="phone">
                  Phone No.
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => {
                    onInputChange(e);
                    setPhone(e.target.value);
                  }}
                />
                <br />

                {/* btn */}
                <button
                  className="signup_btn"
                  onClick={() => {
                    signupUser();
                  }}
                >
                  Continue
                </button>
                <Link onClick={() => signupTologin()} className="signuptologin">
                  Go To Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};
export default LoginDialog;
