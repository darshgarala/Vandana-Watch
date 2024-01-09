import { colors } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Aorder.css";
const Aorder = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data1 = await axios.get("http://localhost:8001/admin/order");
    // console.log("daat1 ======", data1);
    setData(data1.data.data);
    // console.log("data = ", data);
  };

  return (
    <>
      <div className="A_order">Admin Order</div>
      <div>
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <>
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
                      <div
                        className="textbox"
                        style={{
                          fontStyle: "oblique",
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "20px",
                        }}
                      >
                        <div
                          className="f1"
                          style={{ color: "grey", fontWeight: "bold" }}
                        >
                          <p>username : {item.username}</p>
                          <p>Product id : {item.id}</p>
                          <p>longTitle : {item.longTitle}</p>
                          <p>mrp :{item.mrp}</p>
                          <p>Qut : {item.quantity}</p>
                          <p>Total Amount : {item.TotalPrice}</p>
                        </div>
                        <div
                          className="f2"
                          style={{
                            marginLeft: "30px",
                            fontWeight: "bold",
                            color: "grey",
                          }}
                        >
                          <p>Address Line1 : {item.addressLine1}</p>
                          <p>Address Line2 : {item.addressLine2}</p>
                          <p>Pin code: {item.pincode}</p>
                          <p>Village : {item.village}</p>
                          <p>State : {item.state}</p>
                          <p>District : {item.district}</p>
                          <p>Date : {item.date}</p>
                        </div>
                      </div>
                    </div>

                    <div></div>
                  </div>
                  <div></div>
                </>
              </>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Aorder;
