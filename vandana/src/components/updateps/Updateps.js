import React, { useState } from "react";
import { Dialog } from "@mui/material";
import "./updateps.css";
import axios from "axios";
import { toast } from "react-toastify";
import { updatePasswordnow } from "../../server/api";
import LoginDialog from "../login/LoginDialog";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const defaultValue = {
  username: "",
  password: "",
  cpassword: "",
};

const Updateps = ({ account, setAccount }) => {
  // hide and show password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  // end

  //
  const navigate = useNavigate();

  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [update, setUpdate] = useState(defaultValue);

  const onInputChange1 = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handeleUpdate = () => {
    if (!isValidUsername(username)) {
      toast("Username must only contain letters, numbers, and underscores");
      return false;
    }
    if (!isValidPassword(cpassword)) {
      return false;
    }
    if (!password || !username || !cpassword) {
      toast("All fields are required.");
      return false;
    }
    // setUsername("");
    // setPassword("");
    setCpassword("");
    return true;
  };

  function isValidPassword(pass) {
    if (pass.length < 8) {
      toast("Password must be at least 8 characters");
      return false;
    } else if (pass.search(/[a-z]/) < 0) {
      toast("Password must contain at least one lowercase letter");
      return false;
    } else if (pass.search(/[A-Z]/) < 0) {
      toast("Password must contain at least one uppercase letter");
      return false;
    } else if (pass.search(/[0-9]/) < 0) {
      toast("Password must contain at least one number");
      return false;
    } else {
      return true;
    }
  }

  function isValidUsername(username) {
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    return usernameRegex.test(username);
  }

  const upadtePassword = async () => {
    let ans = handeleUpdate();
    console.log(ans);
    if (ans) {
      let response = await updatePasswordnow(update);
      console.log("=> ", response.data.message);

      if (response.data.message == "User password update...!") {
        toast("Password Change Successfully...!");
        toast("Again Login...!");
        logoutUser();
        navigate("/");
        // openDialog();
      } else if (response.data.message == "User password Not update...!") {
        toast("Old Password Not Match!");
        return;
      }
    }
    // else
    // {

    // }
  };
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(true);
  //   // setOn(true);
  // };
  const logoutUser = () => {
    localStorage.clear();
    setAccount("");
  };

  return (
    <>
      <div>
        <div className="profileup">
          <h1
            style={{ marginLeft: "510px", marginTop: "60px", color: "#3f3f3f" }}
          >
            Change Password
          </h1>
          <div className="pro" style={{display:"flex" , flexDirection:"column"}}>
            <label style={{ marginLeft: "500px" }} htmlFor="uname">
              Username :
            </label>
            <input
              style={{ marginLeft: "500px" }}
              type="text"
              id="uname"
              name="username"
              value={username}
              onChange={(e) => {
                onInputChange1(e);
                setUsername(e.target.value);
              }}
            />

            <br />
            <br />
            <label style={{ marginLeft: "500px" }} htmlFor="password">
              Old Password :
            </label>
            <input
              style={{ marginLeft: "500px" }}
              type={passwordShown ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                onInputChange1(e);
                setPassword(e.target.value);
              }}
            />
            <i
              style={{
                color: "#303030",
                marginTop: "-26px",
                marginLeft: "770px",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisiblity}
            >
              {eye}
            </i>
            <br />
            <br />

            <label style={{ marginLeft: "500px" }} htmlFor="cpassword">
              New Password :
            </label>
            <input
              style={{ marginLeft: "500px" }}
              type="password"
              id="cpassword"
              name="cpassword"
              value={cpassword}
              onChange={(e) => {
                onInputChange1(e);
                setCpassword(e.target.value);
              }}
            />
            <br />
            <br />

            <div className="cont">
              <button
                className="update_btn update_btn1"
                style={{ marginLeft: "550px" }}
                onClick={(e) => {
                  upadtePassword(e);
                  // openDialog();
                }}
              >
                Submit
              </button>
              <LoginDialog open={open} setOpen={setOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updateps;
