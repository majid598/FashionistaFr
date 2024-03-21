import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import LocomotiveScroll from "locomotive-scroll";
import { store } from "./redux/store.js";

const locomotiveScroll = new LocomotiveScroll();

export const user = {
  _id: Math.random(),
  name: "Majid ali",
  username: "raju",
  email: "jalkdfjaldjfadsdf",
  profile: "./assets/4.jpg",
  gender: "female",
  role: "admin",
  phone: "0342342348",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
