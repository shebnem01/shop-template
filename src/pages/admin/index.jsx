import React from "react";
import Navbar from "../../components/admin/navbar";
import { Route, Routes } from "react-router";
import AllProduct from "../../components/admin/allProduct";
import { AddProduct } from "../../components/admin/addProduct";
const Admin = () => {
  return (
    <div className="flex gap-3 px-10">
      <Navbar />
      <Routes>
        <Route path="add-product/:id" element={<AddProduct />} />
        <Route path="all-product" element={<AllProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
