import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DetailView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBolt,
  faCircle,
  faDroplet,
  faDisplay,
  faBacon,
  faPaintBrush,
  faPaintRoller,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { createContext } from "react";
import MyDialog from "./MyDialog";
import React from "react";
import "react-js-dialog-box/dist/index.css";

const DetailView = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});

  const paramas = useParams();
  console.log(paramas.id);
  useEffect(() => {
    getData();
  }, [data]);

  async function getData() {
    const c = await axios.get(`http://localhost:8001/products/${paramas.id}`);
    console.log("c.data = ", c.data);
    setData(c.data);
  }

  const additem = async () => {
    // console.log("data = ", { data, token });
    console.log("token = ", paramas);
    const un = paramas.username;
    try {
      if (data.quantity > 0) {
        let result = await axios.post("http://localhost:8001/api/add-to-cart", {
          data,
          token,
          un,
        });
        if (result.data.message == "Login Require") {
          toast("Login Require...!");
        } else {
          toast("Add To Cart");
        }
        // console.log("result", result);
        // console.log("add item");
      } else {
        toast("Out of Stock");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //
  //
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  };

  //
  const param = useParams();

  const buyOrder = async (id) => {
    console.log("_id = ", id);
    console.log("params =", param);
    const uname = param.username;
    console.log("uname", uname);

    const pro = await axios.get(`http://localhost:8001/products/${id}`);
    console.log("pro", pro);

    const data1 = pro.data;
    const ttdata = await axios.post("http://localhost:8001/api/buy-order", {
      uname,
      data1,
      id,
    });
    console.log(ttdata);
  };

  return (
    <>
      <div className="detail_main">
        {/*  */}
        <div className="detail_1">
          <div className="img_detail_zoom">
            <div className="img_zoom">
              <img className="detail_img" src={data.detailUrl} alt="" />
            </div>
          </div>
          {/*  */}
          <div className="btn_detail">
            <div className="cart_btn1">
              <FontAwesomeIcon className="shop_icon" icon={faCartShopping} />
              <button
                className="detail_cart"
                onClick={() => {
                  additem();
                }}
              >
                Add To Cart
              </button>
            </div>
            <div className="buy_btn1">
              <FontAwesomeIcon className="buy_icon" icon={faBolt} />
              <button
                className="detail_buy"
                onClick={(e) => {
                  // buyOrder(data.id);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="detail_2">
          <p className="detail_title1">{data.shortTitle}</p>
          <p className="detail_title" name="longTitle">
            {" "}
            {data.longTitle}
          </p>
          <hr />

          <div className="text_deteil">
            <span className="price">Price :</span>
            <span className="detail_mrp" name="mrp">
              {" "}
              {data.mrp}{" "}
            </span>
            <span className="detail_cost"> {data.cost}</span>
            <p>
              <span className="discount">Discount : </span>
              <span className="detail_discount"> {data.discount}</span>
            </p>
            {data.quantity > 0 ? null : (
              <p style={{ color: "red" }}>Out of Stock</p>
            )}
            <p>Size : {data.size}</p>
            <div className="detail_size">
              <div style={{ marginTop: "-10x" }}>
                <button onClick={() => openDialog()} className="deteil_size_in">
                  Size Chart
                </button>
              </div>
              <MyDialog open={open} setOpen={setOpen} />
            </div>
          </div>
        </div>
      </div>
      <div className="product_spe">
        {/* <p>Product Specifications</p>
        <div className="pro_speci">
          <div className="in_pro_speci">
            <FontAwesomeIcon
              className="icon_speci"
              icon={faCircle}
              style={{ fontSize: "35px" }}
            />
            <p>Case Shape</p>
          </div>
          <div className="in_pro_speci">
            <FontAwesomeIcon
              className="icon_speci"
              icon={faDroplet}
              style={{ fontSize: "35px" }}
            />
            <p>Case Color</p>
          </div>
          <div className="in_pro_speci">
            <FontAwesomeIcon
              className="icon_speci"
              icon={faDisplay}
              style={{ fontSize: "35px" }}
            />
            <p>Case Display</p>
          </div>
          <div className="in_pro_speci">
            <FontAwesomeIcon
              className="icon_speci"
              icon={faDisplay}
              style={{ fontSize: "35px" }}
            />
            <p>Case Display</p>
          </div>
          <div className="in_pro_speci">
            <FontAwesomeIcon
              className="icon_speci"
              icon={faBacon}
              style={{ fontSize: "35px" }}
            />
            <p>Strap Material</p>
          </div>
          <div className="in_pro_speci">
            <FontAwesomeIcon
              className="icon_speci"
              icon={faBacon}
              style={{ fontSize: "35px" }}
            />
            <p>Strap color</p>
          </div>
          <div className="in_pro_speci">
            <FontAwesomeIcon
              className="icon_speci"
              icon={faPaintRoller}
              style={{ fontSize: "35px" }}
            />
            <p>Strap Width</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DetailView;
