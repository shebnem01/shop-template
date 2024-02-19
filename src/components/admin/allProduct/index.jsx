import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../../firebase/config";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { SET_PRODUCTS } from "../../../redux/slices/productSlice";
import { Link } from "react-router-dom";
const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const getProducts = () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        dispatch(
          SET_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  const confirmDelete = (id, imgUrl) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "Are you sure you want to delete this product?",
      "Yes",
      "No",
      function okCb() {
        deleteProduct(id, imgUrl);
      },
      function cancelCb() {
        console.log("canceled");
      },
      {
        titleColor: "red",
        width: "320px",
        okButtonBackground: "red",
        borderRadius: "8px",
        // etc...
      }
    );
  };
  const deleteProduct = async (id, imgUrl) => {
    try {
        await deleteDoc(doc(db, "products", id));
        const imageRef = ref(storage, imgUrl);
        await deleteObject(imageRef);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="rounded-2xl w-full border">
      <table className="w-full">
        <thead>
          <tr className="text-labelLight text-xs uppercase ">
            <th className="text-left px-4 py-5"></th>
            <th className="text-left px-4 py-5">product name</th>
            <th className="text-left px-4 py-5">price</th>
            <th className="text-left px-4 py-5">category</th>
            <th className="text-left px-4 py-5">brand</th>
            <th className="text-left px-4 py-5">description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td className="border-t text-headerLight px-4 py-5">
                <div className="w-10">
                  <img className="w-10" src={product.imgUrl} alt="pr_img" />
                </div>
              </td>
              <td className="border-t text-headerLight px-4 py-5">
                {product.name}
              </td>
              <td className="border-t text-headerLight px-4 py-5">
                ${product.price}
              </td>
              <td className="border-t text-headerLight px-4 py-5">
                {product.category}
              </td>
              <td className="border-t text-headerLight px-4 py-5">
                {product.brand}
              </td>
              <td className="border-t text-headerLight px-4 py-5">
                {product.desc}
              </td>
              <td className="border-t text-headerLight px-4 py-5">
                <div className="flex gap-4">
                  <div className="border text-blue-700 cursor-pointer  border-gray-600 rounded-md hover:bg-blue-700 hover:text-white">
                    <Link
                      to={`/admin/add-product/${product.id}`}
                      className="flex w-full p-2"
                    >
                      <FaRegEdit size={12} />
                    </Link>
                  </div>
                  <div
                    onClick={() => confirmDelete(product.id, product.imgUrl)}
                    className="border text-red-600  border-gray-600 p-2 rounded-md  hover:text-white hover:bg-red-600 hover:border-red-600 cursor-pointer"
                  >
                    <FaRegTrashAlt size={12} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProduct;
