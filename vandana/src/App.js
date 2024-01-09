import "./App.css";
import Search from "./components/Search/Search";
import Navbar from "./components/NavBar/Navbar";
import Home from "./components/home/Home";
import DetailView from "./components/Details/DetailView";
import Cart from "./components/cart/Cart.js";
import Admin from "./components/admin/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loading from "./components/loading/Loading";
import Updateps from "./components/updateps/Updateps";
import Forget from "./components/forget/Forget.js";
import { useContext } from "react";
import { DataContext } from "./components/context/DataProvider";
import Otp from "./components/opt/Otp";
import Pass from "./components/opt/Pass.js";
import Pro from "./components/pro/Pro";
import Order from "./components/Order/Order";
import Address from "./components/cart/Address";
import Man from "./components/NavBar/Man";
import Women from "./components/NavBar/Women";
import Children from "./components/NavBar/Children";
import Contact from "./components/contact/Contact";
import SearchList from "./components/Search/SearchList";
import Aorder from "./components/admin2/Aorder";
import Aproducts from "./components/admin2/Aproducts";
import Aadd from "./components/admin2/Aadd";
import Aremove from "./components/admin2/Aremove";
import Aupdate from "./components/admin2/Aupdate";
function App() {
  // const [id, setId] = useState([]);
  const [product, setProduct] = useState([]);
  const [network, setNetwork] = useState(false);

  useEffect(() => {
    const doSomething1 = async () => {
      let brand11 = await axios.get(`http://localhost:8001/products`);
      //  setId(brand11.data.id);
      // console.log(brand11.data.message);
      if (brand11.data.message == "Network Loss!") {
        setNetwork(false);
        return;
      } else {
        setNetwork(true);
        setProduct(brand11.data);
      }
      // console.log(brand11);
    };
    doSomething1();
  }, []);

  const { account, setAccount } = useContext(DataContext);
  console.log("account = ", account);

  // search
  const [resu, setResu] = useState([]);

  return (
    <>
      {network ? (
        account === "darshgarala" ? (
          <BrowserRouter>
            <Search />
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminOrder" element={<Aorder />} />
              <Route path="/adminProducts" element={<Aproducts />} />
              <Route path="/adminAdd" element={<Aadd />} />
              <Route path="/adminRemove" element={<Aremove />} />
              <Route path="/adminUpdate" element={<Aupdate />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={1100}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnHover={false}
              pauseOnFocusLoss
              draggable
              theme="dark"
            />
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Search />
            {/* <SearchList resu={resu} /> */}
            <Navbar account={account} setAccount={setAccount} />
            <Routes>
              <Route
                path="/"
                element={<Home account={account} setAccount={setAccount} />}
              />
              <Route path="/products/:username" element={<Man />} />
              <Route path="/products_w/:username" element={<Women />} />
              <Route path="/products_c/:username" element={<Children />} />
              <Route path="/cart/:username/:id" element={<Address />} />
              <Route
                path="/order/:username"
                element={<Order account={account} setAccount={setAccount} />}
              />
              <Route path="/products/:username/:id" element={<DetailView />} />
              <Route path="/cart/:username" element={<Cart />} />
              <Route
                path="/profile"
                element={<Updateps account={account} setAccount={setAccount} />}
              />
              <Route
                path="/pro/:username"
                element={<Pro account={account} setAccount={setAccount} />}
              />
              <Route path="/forgetpassword" element={<Forget />} />
              <Route path="/forgetpassword/otp/:username" element={<Otp />} />
              <Route
                path="/forgetpassword/otp/:username/pass"
                element={<Pass />}
              />
              <Route path="/contactUs" element={<Contact />} />
            </Routes>

            <ToastContainer
              position="top-right"
              autoClose={1100}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </BrowserRouter>
        )
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Loading />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
