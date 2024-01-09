import axios from "axios";
import * as actionTypes from "../constants/productConstant";

// this api is call by redux Bcos we use middleware ex: (async (dispatch)=>)
const URL = "http://localhost:8001";


export const getBrands = () => async (dispatch) => {
  try {
    const { data1 } = await axios.get(`http://localhost:8001/brands`);
    console.log('data1 = ',data1.data);
    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data1 });
  } catch (error) {
    dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
  }
};






// let obj = {
//     config:{},
//     data:[],
//     headers:{},
//     status:200,
//     message:''
// }

// obj.data
// {data } = obj;
