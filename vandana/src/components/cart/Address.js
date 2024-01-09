import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./address.css";
const d = new Date();
var date = d.getDate();
var month = d.getMonth();
var year = d.getFullYear();

var full = new Date(year, month, date);

const defaultaddress = {
  line1: "",
  line2: "",
  pincode: "",
  village: "",
  state: "",
  district: "",
};
const defaultvalue = {
  username: "",
  id: "",
  url: "",
  shortTitle: "",
  longTitle: "",
  size: "",
  mrp: "",
  quantity: "",
};

const Address = ({ open, setOpen, un, id1, idd }) => {
  const token = localStorage.getItem("token");
  const navigator = useNavigate();
  const params = useParams();
  console.log("object = ", params);

  const [detailofadd, setDetailofadd] = useState(defaultaddress);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [data, setdata] = useState(defaultvalue);

  const handeledata = () => {
    if (!line1 || !line2 || !village || !pincode || !district || !state) {
      toast("All fields are required.");
      return;
    }

    return true;
  };

  const onValueChange = (e) => {
    setDetailofadd({ ...detailofadd, [e.target.name]: e.target.value });
  };
  // remove
  const remove = async (id) => {
    console.log("id = ", id);
    console.log(data);
    try {
      const item = await axios.post(
        "http://localhost:8001/api/remove-from-cart",
        { id }
      );
      // getData();
      toast("Remove To Cart");
      console.log("item = ", item);
      console.log("Remove item");
    } catch (error) {
      console.log("error = > =>", error);
    }
  };

  const doSomething1 = async () => {
    let brand11 = await axios.get(
      `http://localhost:8001/get-data-of-cartSchema/${params.username}/${params.id}`
    );
    console.log("obrand11 = ", brand11.data.message);
    setdata(brand11.data.message);
    brand11.data.message.map((item) => {
      setdata(item);
    });
    console.log("data = ", data);
  };

  useEffect(() => {
    doSomething1();
  }, []);

  const buyOrder = async () => {
    const yse = handeledata();
    if (yse) {
      const uname = params.username;
      console.log("uname = ", uname);
      const ttdata = await axios.post("http://localhost:8001/api/buy-order", {
        uname,
        detailofadd,
        data,
      });
      console.log("id = ", params.id);
      console.log("Qut  = ", data.quantity);
      const t = await axios.get(
        `http://localhost:8001/products/${params.id}/${data.quantity}`
      );
      console.log("t = ", t);
      console.log("ttdata =", ttdata.data.message);
      if (ttdata.data.message == "Add data to buy_order") {
        toast("Order Place Successfully...!");
        console.log("remove = ", params.id);
        remove(params.id);
        navigator(`/order/${uname}`);
      } else if (ttdata.data.message == "Order Fail...!") {
        toast("Order Fail...!");
        toast("try Again...!");
      }
    } else {
    }
  };

  return (
    <>
      <p className="address_detail">Address Details </p>
      <div className="login1" style={{ height: "500px" }}>
        {/*  */}
        <div
          className="img_add"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <img className="address_img" src={data.url} alt="" />
          <div className="add_text">
            <p>{data.shortTitle}</p>
            <p>{data.longTitle}</p>
            <p>₹ {data.mrp}</p>
            <p>Qut : {data.quantity}</p>
            <p>Total Price : {data.quantity * data.mrp}</p>
          </div>
        </div>
        <div className="add_of_main">
          <div>
            <hr />
            <label htmlFor="Line1">Address Line1:</label>&nbsp;
            <input
              type="text"
              id="Line1"
              name="line1"
              value={line1}
              onChange={(e) => {
                onValueChange(e);
                setLine1(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="Line2">Address Line2:</label>&nbsp;
            <input
              type="text"
              id="Line2"
              name="line2"
              value={line2}
              onChange={(e) => {
                onValueChange(e);
                setLine2(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="pin">Pin Code : </label>&nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp;
            <input
              type="text"
              id="pin"
              name="pincode"
              value={pincode}
              onChange={(e) => {
                onValueChange(e);
                setPincode(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="village">Village :</label>&nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              id="village"
              name="village"
              value={village}
              onChange={(e) => {
                onValueChange(e);
                setVillage(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="dis">District :</label>&nbsp; &nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              id="dis"
              name="district"
              value={district}
              onChange={(e) => {
                onValueChange(e);
                setDistrict(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="state">State :</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={(e) => {
                onValueChange(e);
                setState(e.target.value);
              }}
            />
          </div>
          {/* button Pay */}
          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              color: "rgb(96, 96, 96)",
            }}
          >
            Current Date :{" "}
            <span style={{ color: "rgb(96, 96, 96)" }}>
              {" "}
              {date} / {month + 1} / {year}
            </span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button
              className="update_btn update_btn1"
              onClick={() => {
                doSomething1();
                buyOrder();
              }}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
