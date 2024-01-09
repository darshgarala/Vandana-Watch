import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEye } from "@fortawesome/free-solid-svg-icons";
import "./pro.css";
import { Link } from "react-router-dom";
import DataProvider from "../context/DataProvider";
import Updateps from "../updateps/Updateps";

const eye = <FontAwesomeIcon icon={faEye} />;
const Pro = ({ account, setAccount }) => {
  // const {account,setAccount} = useContext(DataProvider);

  const [user, setUser] = useState([]);

  const param = useParams();
  console.log("uname = ", param.username);
  const uname = param.username;

  useEffect(() => {
    const doSomething1 = async () => {
      let data = await axios.get(`http://localhost:8001/user/${uname}`);
      console.log("data = ", data.data);
      setUser(data.data);
    };

    doSomething1();
  }, []);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="pro1">
      <div className="pro11">
        <FontAwesomeIcon
          icon={faCircleUser}
          // fade
          style={{ color: "#7c9dd5", height: "150px" }}
        />
      </div>
      <div className="pro12">
        <p>Usrename &nbsp; :&nbsp; {user.username}</p>
        <p>Firstname &nbsp; :&nbsp; {user.firstname}</p>
        <p>Lastname &nbsp;&nbsp; :&nbsp; {user.lastname}</p>
        <p>Email &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;{user.email}</p>
        <p>Phone No.&nbsp;&nbsp; :&nbsp;&nbsp; {user.phone}</p>
        <p>Password : </p>
        <input type={passwordShown ? "text" : "password"}>
          {/* Password : {user.password} */}
        </input>
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
        <br />
        <Link
          className="change_pass"
          style={{ textDecoration: "none" }}
          to={`/profile`}
        >
          <span style={{ marginLeft: "48px" }}>change Password</span>
        </Link>
        <br />
        <br />

        <Link
          style={{ textDecoration: "none" }}
          className="change_pass"
          to={`/order/${account}`}
        >
          <span style={{ marginLeft: "68px" }}>My Order</span>
        </Link>
      </div>
    </div>
  );
};

export default Pro;
