import React from "react";
import axios from "axios";
import { useState } from "react";
import "./Aadd.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const defVlaue = {
  pid: "",
  shortTitle: "",
  link: "http://localhost:8001/photo/",
  longTitle: "",
  mrp: null,
  cost: null,
  quantity: null,
  description: "",
  discount: "",
  gender: "",
};
const Aadd = () => {
  const navigator = useNavigate();
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState("");
  const [data, setData] = useState(defVlaue);
  const [pid, setPid] = useState("");
  const [shortTitle, setStitle] = useState("");
  const [longTitle, setLtitle] = useState("");
  const [description, setDescrip] = useState("");
  const [discount, setDiscount] = useState("");
  const [gender, setGender] = useState("");
  const [mrp, setMrp] = useState();
  const [cost, setcost] = useState();
  const [quantity, setQut] = useState();
  //   const [fl, setFl] = useState("");

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleData = () => {
    if (
      !pid ||
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
      //   toast("All field is Require...!");
      return true;
    }
  };
  const btnOfSub = async () => {
    if (!image1) {
      toast("Please Upload the file");
      return;
    }
    let f1 = handleData();
    if (f1) {
      console.log("dat = = = = = = = =", data);
      //   console.log("gjfht",image1);
      const data1 = await axios.post(
        `http://localhost:8001/admin/create-item`,
        {
          data,
          image1,
        }
      );
      console.log("object = ", data1);
      if (data1.data.success == true) {
        toast("Add Item Successfully...");
        navigator("/admin");
      } else {
        toast("Not Item Added");
      }
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast("Image Upload successfully....");
      console.log("Image uploaded:", response.data.imagePath);
      let s = response.data.imagePath;
      s = s.split("\\")[1];
      console.log("s = ", s);
      setImage1(s);
      console.log("image1 = ", image1);
    } catch (error) {
      toast("Please Select Image!");
    }
  };
  return (
    <>
      <div className="main_add">
        <div className="A_A">Add Item Details</div>
        <div className="Add1">
          <div className="A_add">
            <div>
              <label htmlFor="pid">Product ID : </label>
              <input
                type="text"
                name="pid"
                id="pid"
                value={pid}
                onChange={(e) => {
                  onValueChange(e);
                  setPid(e.target.value);
                }}
              />
            </div>

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
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleImageUpload} />
              <button type="submit">Upload image</button>
            </form>
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
              onClick={() => btnOfSub()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Aadd;
