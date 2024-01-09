import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Navbar.css";
const Navbar = ({ account, setAccount }) => {
  console.log("navi = ", account);

  return (
    <>
      <div className="main_nav">
        <Link to={`/products/${account}`} className="nav_b1" type="button">
          Men
        </Link>
        <Link to={`/products_w/${account}`} className="nav_b1" type="button">
          Women
        </Link>
        <Link to={`/products_c/${account}`} className="nav_b1" type="button">
          Childrens
        </Link>
        <Link className="nav_b1" type="button">
          Brands
        </Link>
        <Link to={`/contactUs`} className="nav_b1" type="button">
          Contact Us
        </Link>
      </div>
    </>
  );
};

export default Navbar;
