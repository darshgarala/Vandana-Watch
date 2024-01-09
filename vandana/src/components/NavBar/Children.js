import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./man.css";
import { Link, useParams } from "react-router-dom";

const Children = () => {
  const params = useParams();
  const lin1 = params.username;
  // console.log('man = = ',params)
  const [data, setData] = useState([]);

  useEffect(() => {
    const doSomething1 = async () => {
      let brand11 = await axios.get("http://localhost:8001/products");
      setData(brand11.data.products);
      console.log("man = ", data);
    };

    doSomething1();
  }, []);

  return (
    <>
      <div className="man_main">
        {data.map((item, key) =>
          item.tagline == "children" ? (
            <Link className="link_man" to={`/products/${lin1}/${item.id}`}>
              <div className="man_con">
                <div className="img_div111">
                  <img className="img_de" src={item.url} alt="" />
                </div>
                <div className="man_text">
                  <p style={{ fontWeight: "bold" }}>{item.shortTitle}</p>
                  <p>{item.longTitle}</p>
                  <p style={{ fontWeight: "bold" }}> ₹ {item.mrp}</p>
                </div>
              </div>
            </Link>
          ) : (
            <></>
          )
        )}
      </div>
    </>
  );
};
export default Children;
