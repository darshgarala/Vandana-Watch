import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate , useParams} from "react-router-dom";
import axios from "axios";
import OtpTimer from "otp-timer";
import { toast } from "react-toastify";
const INITIAL_COUNT = 300;

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const username = useParams();
  const otpSubmit = async () => {
    const data = await axios.post("http://localhost:8001/api/find-opt", {
      otp,
    });

    console.log(" => data ", data);
    if (data.data.message == "true") {
      toast("OTP Match Successfullt...!");
      navigate(`/forgetpassword/otp/${username.username}/pass`);
    } else if (data.data.message == "false") {
      toast("Not A Match OTP...!");
    } else if (data.data.message == "server error...!") {
      toast("retry Send OTP...!");
    }
  };


  return (
    <>
      <div>
        <div className="profileup">
          <h1
            style={{ marginLeft: "620px", marginTop: "60px", color: "#3f3f3f" }}
          >
            OTP
          </h1>
          <div className="pro">
            <label style={{ marginLeft: "500px" }} htmlFor="otp">
              Enter OTP :
            </label>
            <input
              style={{ marginLeft: "500px" }}
              type="password"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => {
                // onInputChange1(e);
                setOtp(e.target.value);
              }}
            />
            <br />
            <br />
            <div className="cont">
              <button
                className="update_btn update_btn1"
                style={{ marginLeft: "550px" }}
                onClick={() => {
                  otpSubmit();
                }}
              >
                Submit
              </button>
            </div>
            {/* resend OTP */}
            <div>{/* Time left = <span id="timer"></span> */}</div>
            {/* end */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Otp;
