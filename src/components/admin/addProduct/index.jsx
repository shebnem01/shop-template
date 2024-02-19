import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../../../firebase/config";
import { useNavigate, useParams } from "react-router";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { selProducts } from "../../../redux/slices/productSlice";
import { useSelector } from "react-redux";
export const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector(selProducts);
  const findEditProduct = products.find((item) => item.id === id);

  const initialState = {
    name: "",
    price: "",
    desc: "",
    imgUrl: "",
    brand: "",
    category: "",
  };
  const detectForm = (id, f1, f2) => {
    if (id === "add") {
      return f1;
    } else {
      return f2;
    }
  };
  const [product, setProduct] = useState(() => {
    return detectForm(id, { ...initialState }, findEditProduct);
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
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
          const updatedProduct = { ...product, imgUrl: downloadURL };
          setProduct(updatedProduct);
          if (id !== "add" && downloadURL !== findEditProduct.imgUrl) {
            const imageRef = ref(storage, findEditProduct.imgUrl);
            deleteObject(imageRef)
              .then(() => {
                console.log("Eski resim başarıyla silindi.");
              })
              .catch((error) => {
                console.log("Eski resmi silme hatası:", error);
              });
          }
        });
      }
    );
  };
  const addProduct = async (e) => {
    e.preventDefault();
    const { name, imgUrl, price, category, desc, brand } = product;
    try {
      const productRef = await addDoc(collection(db, "products"), {
        name: name,
        imgUrl: imgUrl,
        price: price,
        category: category,
        brand: brand,
        desc: desc,
        createdAt: new Date().getTime(),
      });
      navigate("/admin/all-product");
    } catch (error) {
      console.log(error);
    }
  };
  const editProduct = async (e) => {
    e.preventDefault();
    const { name, imgUrl, price, category, desc, brand } = product;

    try {
      await setDoc(doc(db, "products", id), {
        name: name,
        imgUrl: imgUrl,
        price: price,
        category: category,
        brand: brand,
        desc: desc,
        createdAt: findEditProduct.createdAt,
        editedAt: new Date().getTime(),
      });
      navigate("/admin/all-product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#FAFBFE] w-full p-4">
      <div className="title mb-4">
        <h4 className="text-lg mb-1 text-[#092C4C] font-bold">
          {detectForm(id, "New product", "Edit product")}
        </h4>
        <h6 className="text-sm text-[#495057] font-thin">
          {detectForm(id, "Create new product", "")}
        </h6>
      </div>
      <div className="content bg-white-500">
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
          <div className="form-group mb-3 flex flex-col">
            <label className="text-sm text-[#5B6670] font-semibold mb-3">
              Product name
            </label>
            <input
              className="border border-solid border-gray-300 text-gray-700
       bg-white text-sm font-normal leading-normal rounded-sm py-2 px-3 focus:border-gray-100 focus:bg-white 
       focus:shadow-sm focus:outline-none"
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group mb-3 flex flex-col relative">
            <label className="text-sm text-[#5B6670] font-semibold mb-3 ">
              Product image
            </label>
            <input
              name="imgUrl"
              onChange={(e) => handleImageChange(e)}
              className="border border-solid border-gray-300 text-gray-700
       bg-white text-sm font-normal leading-normal rounded-sm py-2 px-3 focus:border-gray-100 focus:bg-white 
       focus:shadow-sm focus:outline-none"
              type="file"
              accept="image/*"
            />
          </div>
          <div className="form-group mb-3 flex flex-col relative">
            <label className="text-sm text-[#5B6670] font-semibold mb-3 ">
              Product price
            </label>
            <input
              className="border border-solid border-gray-300 text-gray-700
       bg-white text-sm font-normal leading-normal rounded-sm py-2 px-3 focus:border-gray-100 focus:bg-white 
       focus:shadow-sm focus:outline-none"
              type="text"
              name="price"
              onChange={(e) => handleChange(e)}
              value={product.price}
            />
          </div>
          <div className="form-group mb-3 flex flex-col relative">
            <label className="text-sm text-[#5B6670] font-semibold mb-3 ">
              Product category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={(e) => handleChange(e)}
              className="border border-solid border-gray-300 text-gray-700
       bg-white text-sm font-normal leading-normal rounded-sm py-2 px-3 focus:border-gray-100 focus:bg-white 
       focus:shadow-sm focus:outline-none"
            >
              <option>Choose</option>
              <option>Category 1</option>
              <option>Category 2</option>
            </select>
          </div>
          <div className="form-group mb-3 flex flex-col relative">
            <label className="text-sm text-[#5B6670] font-semibold mb-3 ">
              Product brand
            </label>
            <select
              name="brand"
              value={product.brand}
              onChange={(e) => handleChange(e)}
              className="border border-solid border-gray-300 text-gray-700
       bg-white text-sm font-normal leading-normal rounded-sm py-2 px-3 focus:border-gray-100 focus:bg-white 
       focus:shadow-sm focus:outline-none"
            >
              <option>Choose</option>
              <option>Brand 1</option>
              <option>Brand 2</option>
            </select>
          </div>
          <div className="form-group mb-3 flex flex-col relative">
            <label className="text-sm text-[#5B6670] font-semibold mb-3 ">
              Product description
            </label>
            <textarea
              name="desc"
              value={product.desc}
              onChange={(e) => handleChange(e)}
              cols="20"
              rows="6"
              className="border border-solid border-gray-300 text-gray-700
       bg-white text-sm font-normal leading-normal rounded-sm py-2 px-3 focus:border-gray-100 focus:bg-white 
       focus:shadow-sm focus:outline-none"
            ></textarea>
          </div>
          <button type="submit" className="bg-red-500 text-white px-4 py-2">
            {detectForm(id, "Save product", "Edit product")}
          </button>
        </form>
      </div>
    </div>
  );
};
