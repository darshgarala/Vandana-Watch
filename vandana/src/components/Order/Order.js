import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DataProvider from "../context/DataProvider";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const Order = ({ account, setAccount }) => {
  const [sdata, setSData] = useState([]);
  const param = useParams();
  const uname = param.username;
  console.log("uname = ", uname);

  useEffect(() => {
    const doSomething = async () => {
      let data = await axios.get(`http://localhost:8001/order/${uname}`);
      console.log(data.data.data);
      setSData(data.data.data);
      console.log(" = = ", sdata);
    };

    doSomething();
  }, []);

  return (
    <>
      <div>
        <h1 style={{marginLeft:"550px",color:"peru"}}>MY ORDER</h1>
        {sdata.length > 0 ? (
          sdata.map((item, key) => {
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
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      flexDirection: "column",
                      width: "850px",
                    }}
                  >
                    <div className="textbox" style={{ fontStyle: "oblique" }}>
                      <p>{item.longTitle}</p>
                      <p>Qty : {item.quantity}</p>
                      <p>MRP : {item.mrp}</p>
                      <p>Total Price : {item.TotalPrice}</p>
                      <p>Date : {item.date}</p>
                    </div>
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
                  beatFade
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
      </div>
    </>
  );
};
export default Order;
