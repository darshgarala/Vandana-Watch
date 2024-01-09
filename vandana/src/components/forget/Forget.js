import React, { useState } from "react";
import "./forget.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const forgetInitialValues = {
  username: "",
  email: "",
};
const Forget = () => {
  const [forget, setForget] = useState(forgetInitialValues);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const onInputChange1 = (e) => {
    setForget({ ...forget, [e.target.name]: e.target.value });
  };

  const forgetPassword = async () => {
    console.log("f = > ", forget);
    const data = await axios.post(
      `http://localhost:8001/api/forget-password`,
      forget
    );
    if (data.data.message == "Message Send Successfully") {
      toast("OTP send Your Mail...!");
      gotoOtp();
    } else if (data.data.message == "Mail Does Not Send") {
      toast("Mail Does Not Send");
    } else if (data.data.message == "Email OR User Not Exits...!") {
      toast("Email OR User Not Exits...!");
    }
    console.log("data = ", data);
  };

  const navigate = useNavigate();

  const gotoOtp = () => {
    navigate(`/forgetpassword/otp/${username}`);
  };

  return (
    <>
      <div>
        <div className="profileup">
          <h1
            style={{ marginLeft: "510px", marginTop: "60px", color: "#3f3f3f" }}
          >
            Forget Password
          </h1>
          <div className="pro">
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
            <label style={{ marginLeft: "500px" }} htmlFor="email">
              Email :
            </label>
            <input
              style={{ marginLeft: "500px" }}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                onInputChange1(e);
                setEmail(e.target.value);
              }}
            />
            <br />
            <br />

            <div className="cont">
              <button
                className="update_btn update_btn1"
                style={{ marginLeft: "550px" }}
                onClick={() => {
                  forgetPassword();
                }}
              >
                Forget
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Forget;
