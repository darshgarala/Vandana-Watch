import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./cart.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import { faBolt } from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
let count;

const Cart = () => {
  const navigator = useNavigate();

  const token = localStorage.getItem("token");
  const [data, setdata] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [idd, setIdd] = useState("");
  const [un, setUn] = useState();
  const param = useParams();
  const [newid, setNewid] = useState([]);

  const uname = param.username;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const product = await axios.post("http://localhost:8001/api/cartProduct", {
      token,
    });
    setdata(product.data.data);
    let d = 0;
    product.data.data.map((item) => {
      d = item.mrp*item.quantity + d;
      setNewid(item);
    });
    setCnt(d);
  }

  // remove
  const remove = async (id) => {
    console.log("id = ", id);
    console.log(data);
    try {
      const item = await axios.post(
        "http://localhost:8001/api/remove-from-cart",
        { id }
      );
        
      getData();
      toast("Remove To Cart");
      console.log("item = ", item);
      console.log("Remove item");
    } catch (error) {
      console.log("error = > =>", error);
    }
  };

  // buy
  const order = async (itemid,quantity) => {

    const product = await axios.get(`http://localhost:8001/products/${itemid}`);
    console.log("pppppppppp", product.data.quantity);
    console.log("sgshsh",data.quantity);
    if (product.data.quantity >= quantity) {
      setUn(param.username);
      navigator(`/cart/${uname}/${itemid}`);
    }
    else{
      toast("Please select valid quantity")
    }
    // console.log('id1 = ',idd)
    // return ;
  };

  const buyOrder = async (id) => {
    // const uname = param.username;
    
    const pro = await axios.get(`http://localhost:8001/products/${id}`);
    // console.log("pro", pro);

    const data1 = pro.data;
    const ttdata = await axios.post("http://localhost:8001/api/buy-order", {
      uname,
      ...data1,
    });
    console.log("ttdata =", ttdata.data.message);
    if (ttdata.data.message == "Add data to buy_order") {
      toast("Order Place Successfully...!");
    } else if (ttdata.data.message == "Order Fail...!") {
      toast("Order Fail...!");
      toast("try Again...!");
    }
  };

  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className="main_empty">
      {/* <Address open={open} setOpen={setOpen} un={un} idd={idd} id1={id1} /> */}
      {data.length > 0 ? (
        data.map((item) => {
          return (
            <>
              <div
                className="main_div_of_cart"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <img
                  src={item.url}
                  style={{ height: "200px", width: "200px" }}
                  alt=""
                />
                {/* div colum */}
                <div
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "850px",
                  }}
                >
                  <div className="textbox" style={{ fontStyle: "oblique" }}>
                    <p>{item.shortTitle}</p>
                    <p>{item.longTitle}</p>
                    <p>Qty : {item.quantity}</p>
                    <p>Size : {item.size}</p>
                    <p>MRP : {item.mrp}</p>
                    <p>Total Price : {item.mrp * item.quantity}</p>
                  </div>
                </div>

                <div>
                  <button
                    className="btn_of_remove_cart"
                    onClick={(e) => {
                      // setId(e.target.value);
                      remove(item.id);
                    }}
                    style={{
                      height: "40px",
                      // marginTop: "25px",
                      // marginLeft: "110px",
                    }}
                  >
                    <FontAwesomeIcon
                      className="icon_remove"
                      icon={faTrashCan}
                    />
                    <p style={{ marginLeft: "10px", marginTop: "10px" }}>
                      REMOVE
                    </p>
                  </button>
                  <button
                    className="btn_of_remove_cart"
                    onClick={(e) => {
                      // setIdd(item.id);
                      order(item.id,item.quantity);
                    }}
                    style={{
                      height: "40px",
                    }}
                  >
                    <FontAwesomeIcon
                      className="buy_icon"
                      style={{ marginTop: "10px" }}
                      icon={faBolt}
                    />
                    <p style={{ marginLeft: "10px", marginTop: "10px" }}>BUY</p>
                  </button>
                </div>
              </div>
              <div></div>
            </>
          );
        })
      ) : (
        <>
          <div className="out_empty">
            <div className="empty">
              <FontAwesomeIcon
                className="em_cart"
                icon={faCartArrowDown}
                style={{ fontSize: "50px", color: "#558DEC" }}
                fade
              />
              <h1 className="text_em">Cart is Empty</h1>
              <div className="shopping">
                <Link to="/" className="shopping_now">
                  Shopping Now
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      <div style={{ backgroundColor: "#f3f3f3" }}>
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginLeft: "950px",
            marginTop: "20px",
            height: "60px",
            backgroundColor: "#f3f3f3",
          }}
        >
          <p style={{}}>
            Total Amount :
            <span
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginTop: "40px",
                color: "red",
              }}
            >
              {" "}
              {cnt}
            </span>
          </p>
        </p>
      </div>
    </div>
  );
};

export default Cart;
