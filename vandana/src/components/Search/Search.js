import react from "react";
import { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action/productAction";
import IMG from "./logo.jpg";
import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import LoginDialog from "../login/LoginDialog";
import Profile from "./Profile";
import { DataContext } from "../context/DataProvider";
import { Button, colors } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Search = ({ setResu }) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const { account, setAccount } = useContext(DataContext);
  console.log("= = par", account);

  const { products } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // const [resu , setResu] =useState()
  const [iput, setIput] = useState("");
  const rf = useRef();

  const fechdata = async (value) => {
    // const API Call get method
    const data = await axios.get("http://localhost:8001/products");
    console.log("data ,", data);

    const result = data.data.products.filter((user) => {
      if (iput == "") {
        return user;
      } 
      else if (
        user.shortTitle.toLowerCase().includes(iput.toLocaleLowerCase())
      ){
        return user;
      }
    });
    setIput(result);
    setResu(result);
  };

  const handledata = (value) => {
    setIput(value);
    fechdata(value);
  };

  return (
    <>
      <div className="main_div">
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <img src={IMG} className="logo_img" alt="logo_vandana" />
        </Link>
        <input
          className="search"
          type="text"
          placeholder="Search Items"
          value={iput}
          // onChange={(e) => handledata(e.target.value)}
        />
        <FontAwesomeIcon className="search_icon" icon={faMagnifyingGlass} />
        <div className="heart_cart">
          <Link to={`/cart/${account}`}>
            <FontAwesomeIcon className="cart" icon={faCartPlus} />
          </Link>
          {account ? (
            <Profile account={account} setAccount={setAccount}></Profile>
          ) : (
            <button onClick={() => openDialog()} className="login_btn_2">
              Login
            </button>
          )}
          <LoginDialog open={open} setOpen={setOpen} />
          {/* <Button onClick={() => openDialog()} className="login_icon">
            Login
          </Button> */}
          {/* <FontAwesomeIcon
            onClick={() => openDialog()}
            className="login_icon"
            icon={faUser}
          /> */}
        </div>
      </div>
    </>
  );
};
export default Search;
