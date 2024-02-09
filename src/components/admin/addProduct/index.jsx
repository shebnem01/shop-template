import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
const AddProduct = () => {
  const navigate = useNavigate();
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      imgURL: null,
      price: 0,
      category: "",
      brand:"",
      desc: "",
    },
    onSubmit: () => {
      const { name, imgURL, price, category, desc,brand } = values;
      try {
        const productRef = addDoc(collection(db, "products"), {
          name: name,
          imgURL: imgURL,
          price: price,
          category: category,
          brand:brand,
          desc: desc,
          createdAt: new Date().getTime(),
        });
        navigate("/admin/all-product");
        console.log(values)
      } catch (error) {
        console.log(error);
  
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be greater than or equal to 0"),
      category: Yup.string().required("Category is required"),
      brand: Yup.string().required("Brand is required"),
      desc: Yup.string().max(255, "Description must be at most 255 characters"),
      imgURL: Yup.string()
        .required("Image URL is required")
        .url("Please enter a valid URL for the image"),
    }),
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const productsRef = ref(storage, `images/${Date.now() + file.name}`);
    const uploadTask = uploadBytesResumable(productsRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFieldValue("imgURL", downloadURL);
        
        });
      }
    );
  };
  return (
    <div className="p-3 w-[70%]">
      <form onSubmit={handleSubmit}>
        <input
          required
          className="mb-3 outline-0 bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Product name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <div className="text-red-500 text-sm mt-2">{errors.name}</div>
        )}
        <input
          required
          className="mb-3 outline-0 bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="file"
          accept="image/*"
          placeholder="Product image"
          name="imgURL"
          onChange={(e) => handleImageChange(e)}
        />
        <input
          required
          type="number"
          name="price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Product price"
        />
        {errors.price && touched.price && (
          <div className="text-red-500 text-sm mt-2">{errors.price}</div>
        )}
        <select
          required
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          name="category"
          className="mb-3 outline-0 bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Category 1">Category</option>
          <option value="Category 2">Category</option>
          <option value="Category 3">Category</option>
          <option value="Category 4">Category</option>
        </select>
        <select
          required
          value={values.brand}
          onChange={handleChange}
          onBlur={handleBlur}
          name="brand"
          className="mb-3 outline-0 bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Category 1">Brand 1</option>
          <option value="Brand 2">Brand 2</option>
          <option value="Brand 3">Brand 3</option>
          <option value="Brand 4">Category 4</option>
        </select>
        {errors.brand && touched.brand && (
          <div className="text-red-500 text-sm mt-2">{errors.brand}</div>
        )}
        <textarea
          value={values.desc}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mb-3 outline-0 bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="desc"
          cols="30"
          rows="10"
          placeholder="Product description"
        ></textarea>
        {errors.desc && touched.desc && (
          <div className="text-red-500 text-sm mt-2">{errors.desc}</div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddProduct;
