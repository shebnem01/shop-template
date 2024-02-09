import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
const AllProduct = () => {
  const [products,setProducts]=useState([]);
  const getProducts = () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts)
        console.log(products)
      });
     
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
          </tr>
        </thead>
        <tbody>
        {products?.map((product)=>(
          
          <tr key={product.id}>
            <td className="border-t text-headerLight px-4 py-5">
              <div className="w-10">
                <img
                  className="w-10"
                  src={product.imgURL}
                  alt="pr_img"
                />
              </div>
            </td>
            <td className="border-t text-headerLight px-4 py-5">{product.name}</td>
            <td className="border-t text-headerLight px-4 py-5">${product.price}</td>
            <td className="border-t text-headerLight px-4 py-5">{product.category}</td>
            <td className="border-t text-headerLight px-4 py-5">{product.brand}</td>
            <td className="border-t text-headerLight px-4 py-5">
           {product.desc}
            </td>
          </tr>
        ))}
     
        
        </tbody>
      </table>
    </div>
  );
};

export default AllProduct;
