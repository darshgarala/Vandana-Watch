import axios from "axios";

const URL = "http://localhost:8001";
export const authenticateSignup = async (data) => {
  try {
    let result = await axios.post(`${URL}/signup`, data);
    return result;
  } catch (error) {
    console.log("error => signup api", error);
    return { message: "Please try Again" };
  }
};

export const authenticateLogin = async (data) => {
  try {
    console.log("data = ", data);
    if (data != null) {
      const data1 = await axios.post(`http://localhost:8001/login`, data);
      console.log("data1 = ", data1);
      
      if (data1.data == "Invalid Login") {
        return;
      } else {
        localStorage.setItem("token", data1.data.token);
        return data1.data.data;
      }
    }
  } catch (error) {
    console.log("error => login api", error);
  }
};

export const updatePasswordnow = async (data) => {
  console.log("update = ", data);
  try {
    let result = await axios.post(
      `http://localhost:8001/api/updatePassword`,
      data
    );
    console.log("= = ", result);
    return result;
  } catch (error) {
    console.log("error => update api", error);
    return { message: "Please try Again" };
  }
};
