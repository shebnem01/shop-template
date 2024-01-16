import React from "react";
import ReactDOM from "react";
const Loader = () => {
  return ReactDOM.createPortal(
    <div>Loader....</div>,
    document.getElementById("loader")
  );
};

export default Loader;
