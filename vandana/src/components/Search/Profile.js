import { useState } from "react";
import Menu from "@mui/material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuItem from "@mui/material/MenuItem";
import { Button, colors } from "@mui/material";
import "./Profile.css";
import Updateps from "../updateps/Updateps";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = ({ account, setAccount }) => {
  const [open, setOpen] = useState(false);

  const [on, setOn] = useState(true);
  const [yes, setyes] = useState(false);
  
  const openDialog1 = () => {
    setOn(true);
    setyes(true);
  };

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    // setOn(true);
  };

  const logoutUser = () => {
    localStorage.clear();
    setAccount("");
    toast("Logout Successfully...!")
  };

  return (
    <>
      <div onClick={handleClick} className="out_acc">
        <div className="acc">{account}</div>
      </div>

      <Menu
        className="main_menu"
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem className="menu">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              onClick={() => {
                handleClose();
                logoutUser();
              }}
              className="btn_logout"
            >
              <Link className="profil_update1" to={`/`}>
                Logout
              </Link>
            </button>
            {/* <Link
              className="profil_update"
              to={`/profile`}
              onClick={handleClose}
            >
              Profile
            </Link> */}
            <Link
              className="profil_update"
              to={`/pro/${account}`}
              onClick={handleClose}
            >
              Profile
            </Link>
            {/* <button
            to="/"
              onClick={() => {
                openDialog1();
                // handleClose();
              }}
              className="btn_logout1"
              style={{ marginTop: "5px", cursor: "progress" }}
            >
              Profile
            </button> */}
            {/* <Updateps on={on} setOn={setOn} /> */}
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
