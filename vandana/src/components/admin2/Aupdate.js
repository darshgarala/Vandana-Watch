import axios from "axios";
import React from "react";
import { useState } from "react";
import "./Aupdate.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const defVlaue1 = {
  shortTitle: "",
  longTitle: "",
  mrp: null,
  cost: null,
  quantity: null,
  description: "",
  discount: "",
  gender: "",
};
const Aupdate = () => {
  const [pid, setPid] = useState("");
  const [data2, setData] = useState(defVlaue1);
  const [da, setDa] = useState("");
  const [yse, setYse] = useState(false);
  //
  const [shortTitle, setStitle] = useState("");
  const [longTitle, setLtitle] = useState("");
  const [description, setDescrip] = useState("");
  const [discount, setDiscount] = useState("");
  const [gender, setGender] = useState("");
  const [mrp, setMrp] = useState();
  const [cost, setcost] = useState();
  const [quantity, setQut] = useState();
  //
  const onValueChange = (e) => {
    setData({ ...data2, [e.target.name]: e.target.value });
  };

  const handleData = () => {
    if (
      !shortTitle ||
      !longTitle ||
      !description ||
      !discount ||
      !gender ||
      !mrp ||
      !cost ||
      !quantity
    ) {
      toast("All field is Require...!");
      return false;
    } else {
      return true;
    }
  };

  const navigator = useNavigate();

  const btnUpdate = async () => {
    let f = handleData();
    console.log("object1234 = ", data2);
    if (f) {
      const data1 = await axios.post(
        "http://localhost:8001/admin/update-item",
        {
          pid,
          ...data2,
        }
      );
      console.log("data1 = ", data1);
      if (data1.data.success == true) {
        toast("Product Detail Updated successfully...!");
        navigator(`/admin`);
      } else {
        toast("Update Detail Not successfully...!");
      }
    } else {
      toast("Product Not Update");
    }
  };

  const btnAns = async () => {
    console.log("pid", pid);
    if (pid != "") {
      const data = await axios.get(`http://localhost:8001/products-id/${pid}`);
      console.log("data = ", data.data);
      if (data.data.success == false) {
        toast("Not found Produt");
      } else {
        setDa(data.data);
        setYse(true);
      }
    } else {
      toast("Enter the Product ID");
    }
  };
  return (
    <>
      <div className="show_up">
        <div
          style={{ marginTop: "30px", marginLeft: "30px" }}
          className="rem_A"
        >
          <div>
            <label htmlFor="pid">Product ID :</label>&nbsp;&nbsp;
            <input
              type="text"
              name="pid"
              id="pid"
              value={pid}
              onChange={(e) => {
                // onValueChange(e);
                setPid(e.target.value);
              }}
            />
          </div>
          <button
            style={{
              marginTop: "30px",
              textDecoration: "none",
              border: "2px solid grey",
              borderRadius: "20px",
              padding: "10px",
              cursor: "pointer",
              color: "rgb(57, 56, 56)",
              fontWeight: "bold",
            }}
            onClick={() => btnAns()}
          >
            Show Product
          </button>
        </div>
        {/* start */}
        <div>
          {yse ? (
            <>
              <div style={{ marginTop: "80px", marginLeft: "80px" }}>
                <div
                  className="img_add"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <img className="address_img" src={da.url} alt="" />
                  <div
                    className="add_text"
                    style={{ width: "400px", marginTop: "-80px" }}
                  >
                    <p>shortTitle : {da.shortTitle}</p>
                    <p>longTitle : {da.longTitle}</p>
                    <p>description : {da.description}</p>
                    <p>discount : {da.discount}</p>
                    <p>MRP : {da.mrp}</p>
                    <p>cost : {da.cost}</p>
                    <p>Qut : {da.quantity}</p>
                    <p>tagline : {da.tagline}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        {/* end */}
        <hr style={{ color: "gold" }} />
        {/* stert */}
        <div className="up_detail">
          {yse ? (
            <>
              <div>
                <div className="Add1">
                  <div className="A_A" style={{ marginLeft: "-300px" }}>
                    Update Product Details
                  </div>
                  <div className="A_add">
                    <div>
                      <label htmlFor="st">shortTitle : </label>&nbsp;&nbsp;
                      <input
                        type="text"
                        name="shortTitle"
                        value={shortTitle}
                        id="st"
                        onChange={(e) => {
                          onValueChange(e);
                          setStitle(e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="lt">longTitle : </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="text"
                        name="longTitle"
                        id="lt"
                        value={longTitle}
                        onChange={(e) => {
                          onValueChange(e);
                          setLtitle(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="mrp1">mrp : </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="number"
                        name="mrp"
                        value={mrp}
                        id="mrp1"
                        onChange={(e) => {
                          onValueChange(e);
                          setMrp(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="cost1">cost : </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="number"
                        name="cost"
                        value={cost}
                        id="cost1"
                        onChange={(e) => {
                          onValueChange(e);
                          setcost(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="qty1">quantity : </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="number"
                        name="quantity"
                        id="qty1"
                        value={quantity}
                        onChange={(e) => {
                          onValueChange(e);
                          setQut(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="desc1">description : </label>&nbsp;
                      <input
                        type="text"
                        name="description"
                        id="desc1"
                        value={description}
                        onChange={(e) => {
                          onValueChange(e);
                          setDescrip(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="dis1">discount : </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="text"
                        name="discount"
                        id="dis1"
                        value={discount}
                        onChange={(e) => {
                          onValueChange(e);
                          setDiscount(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="sex">Gender : </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input
                        type="text"
                        name="gender"
                        id="sex"
                        value={gender}
                        onChange={(e) => {
                          onValueChange(e);
                          setGender(e.target.value);
                        }}
                      />
                    </div>
                    <p></p>

                    {/*  */}
                  </div>
                  <div>
                    <button
                      className="update_btn update_btn1"
                      style={{
                        marginLeft: "-350px",
                        marginTop: "20px",
                        marginBottom: "30px",
                      }}
                      onClick={() => btnUpdate()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* end */}
      </div>
    </>
  );
};

export default Aupdate;
