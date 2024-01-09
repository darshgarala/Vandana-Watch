import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import DataProvider from "./components/context/DataProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <DataProvider>
      <App />
    </DataProvider>
  </Provider>
);

