import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
const AddProduct = () => {
  const initialState = {
    name: "",
    imgURL: null,
    price: 0,
    category: "",
    desc: "",
  };
  const [product, setProduct] = useState(initialState);
  const handleImageChange = (e) => {
    const file = e.target.files[0].name;
    const productsRef = ref(storage, `images/${Date.now()+file}`);
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
          setProduct({ ...product, imgURL: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imgURL: product.imgURL,
        price: product.price,
        category: product.category,
        desc: product.desc,
        createdAt: new Date().getTime(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 w-[70%]">
      <form onSubmit={handleSubmit}>
        <input
          className="mb-3 outline-0 bg-gray-50 border border-gray-300
                   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                    focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Product name"
          name="name"
          value={product.name}
          onChange={(e) => handleChange(e)}
        />
        <input
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
          type="number"
          value={product.price}
          name="price"
          onChange={(e) => handleChange(e)}
          placeholder="Product price"
        />
        <select
          value={product.category}
          onChange={(e) => handleChange(e)}
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
        <textarea
          value={product.desc}
          onChange={(e) => handleChange(e)}
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddProduct;
