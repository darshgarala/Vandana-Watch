import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Aorder.css";
const Aproducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data1 = await axios.get("http://localhost:8001/products");
    // console.log("daat1 ======", data1);
    setData(data1.data.products);
    console.log("data = ", data);
  };

  return (
    <>
      <div>
        <div className="A_products">All Products</div>
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
                          style={{ width: "600px", height: "250px" ,color:"black",fontWeight:"lighter" }}
                        >
                          <p>
                            Product id : <span style={{color:"grey",fontWeight:"bold"}}> {item.id}</span>
                          </p>
                          <p>
                            shortTitle : <span style={{color:"grey",fontWeight:"bold"}}> {item.shortTitle}</span>
                          </p>
                          <p>
                            longTitle :<span style={{color:"grey",fontWeight:"bold"}}>{item.longTitle}</span>
                          </p>
                          <p>
                            mrp :<span style={{color:"grey",fontWeight:"bold"}}>{item.mrp}</span>
                          </p>
                          <p>
                            Qut : <span style={{color:"grey",fontWeight:"bold"}}>{item.quantity}</span>
                          </p>
                          <p>
                            Discount :<span style={{color:"grey",fontWeight:"bold"}}>{item.discount}</span>
                          </p>
                          <p>
                            Gender : <span style={{color:"grey",fontWeight:"bold"}}>{item.tagline}</span>
                          </p>
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

export default Aproducts;
