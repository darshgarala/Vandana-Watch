import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { getProductsReducer } from "./reducers/productReducer";
import { getBrandsReducer } from "./reducers/productReducer";
import { getProductDetails } from "./action/productAction";
import {cartReducer} from './reducers/cartReducer';
const reducer = combineReducers({
  getProducts: getProductsReducer,
  getBrands: getBrandsReducer,
  getProductDetails:getProductDetails,
  // cart:cartReducer
});

// middleware
const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
