import React from "react";
import { Link, useParams } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <div className="main_nav">
        <Link to={`/adminOrder`} className="nav_b1" type="button">
          Order
        </Link>
        <Link to={`/adminAdd`} className="nav_b1" type="button">
          Add
        </Link>
        <Link to={`/adminRemove`} className="nav_b1" type="button">
          Remove
        </Link>
        <Link to={`/adminProducts`} className="nav_b1" type="button">
          Product`s
        </Link>
        <Link to={`/adminUpdate`} className="nav_b1" type="button">
          Update
        </Link>
      </div>
    </div>
  );
};
export default Admin;
