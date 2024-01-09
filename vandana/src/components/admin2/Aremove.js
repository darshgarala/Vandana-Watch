import React from "react";
import { useState } from "react";
import "./Aorder.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Aremove = () => {
  const [pid, setPid] = useState("");
  const [data, setData] = useState("");
  const navigator = useNavigate();
  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleData = () => {
    if (!pid) {
      toast("All field is Require...!");
      return false;
    } else {
      return true;
    }
  };

  const btnOfSub = async () => {
    let f1 = handleData();
    if (f1) {
      console.log("dat = = = = = = = =", data);
      const data1 = await axios.post(
        `http://localhost:8001/admin/remove-item`,
        {
          data,
        }
      );
      console.log("object = ", data1);
      if (data1.data.message == "Not Found Product") {
        toast("Not Found Product");
      } else if (data1.data.success == true) {
        toast("Remove item Successfully");
        navigator(`/admin`);
      } else {
        toast("Not Remove item ");
      }
    }
  };
  return (
    <>
      <div>
        <div className="A_A" style={{ marginLeft: "520px" }}>
          Remove Product
        </div>
        <div className="rem_A">
          <div>
            <label htmlFor="pid">Product ID :</label>&nbsp;&nbsp;
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
        </div>
        <div style={{ marginTop: "30px", marginLeft: "560px" }}>
          <button className="update_btn update_btn1" onClick={() => btnOfSub()}>
            Remove
          </button>
        </div>
        <div></div>
      </div>
    </>
  );
};
export default Aremove;
