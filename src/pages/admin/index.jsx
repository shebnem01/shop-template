import React from "react";
import Navbar from "../../components/admin/navbar";
import { Route, Routes } from "react-router";
import AddProduct from "../../components/admin/addProduct";
import AllProduct from "../../components/admin/allProduct";
import EditProduct from "../../components/admin/editProduct";

const Admin = () => {
  return (
    <div className="flex gap-3 px-10">
      <Navbar />
 <Routes>
        <Route path="add-product" element={<AddProduct />} />
        <Route path="/all-product" element={<AllProduct />} />
        <Route path="/edit-product" element={<EditProduct />} />
      </Routes>

    </div>
  );
};

export default Admin;
