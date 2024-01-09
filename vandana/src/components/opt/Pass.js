import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

const eye = <FontAwesomeIcon icon={faEye} />;

const defaultValue = {
  password: "",
  cpassword: "",
};
const Pass = () => {
  const param = useParams();
  const uname = param.username;
  console.log(param.username);
  // hide and show password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  // end
  const [update, setUpdate] = useState(defaultValue);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const onInputChange1 = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };
  const handeleUpdate = () => {
    if (!isValidPassword(password)) {
      return;
    }
    if (!password || !cpassword) {
      toast("All fields are required.");
      return;
    }
    if (password !== cpassword) {
      toast("password is Not a match...!");
      return;
    }
    setPassword("");
    setCpassword("");
    return true;
  };
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
    } else {
      return true;
    }
  }
  const navigate = useNavigate();
  const newPass = async () => {
    let yes = handeleUpdate();
    if (yes) {
      console.log(update);
      const data = await axios.post(
        "http://localhost:8001/api/find-uname-pass",
        {
          update,
          uname,
        }
      );
      console.log(data);
      if (data.data.message == "Forget Password Successfully") {
        toast("Update Password Successfully");
        toast("Please Do Login Again...!");
        navigate("/");
      } else if (data.data.message == "Forget Password Not Successfully") {
        toast("Password Dose Not Update");
      }
    } else {
      toast("Error...!");
    }
  };

  return (
    <>
      <div>
        {/*  */}
        <h1
          style={{ marginLeft: "510px", marginTop: "60px", color: "#3f3f3f" }}
        >
          Forget Password
        </h1>
        {/*  */}
        <br />
        <br />
        <label style={{ marginLeft: "500px" }} htmlFor="password">
          New Password :
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
            marginLeft: "-30px",
            cursor: "pointer",
          }}
          onClick={togglePasswordVisiblity}
        >
          {eye}
        </i>
        <br />
        <br />
        <label style={{ marginLeft: "500px" }} htmlFor="cpassword">
          Confirm Password :
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
            onClick={() => {
              newPass();
              // openDialog();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default Pass;
