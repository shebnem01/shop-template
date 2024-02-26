import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { GoHeart } from "react-icons/go";
import { db } from "../../firebase/config";

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState(null);
  const { id } = useParams();
  const getProductDetail = async () => {
    try {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const obj = {
          id,
          ...productSnap.data(),
        };
        setProductDetail(obj);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, [id]);
  return (
    <div className="product-details-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="product-detail-img">
              <img src={productDetail?.imgUrl} alt={productDetail?.name} />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="product-detail-text-content">
              <div className="product-detail-heading border-top">
                <div className="product-name">
                  <div className="name">{productDetail?.name}</div>
                </div>
                <div className="product-info-top">
                  <div className="product-price">{productDetail?.price} ₼</div>

                  <div className="add-wishlist">
                    <button>
                      <GoHeart size={24} />
                    </button>
                    <button className="hidden bg-red">
                      <GoHeart size={24} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="features border-top">
                <div className="features-title">features</div>
                <ul className="f-list">
                  <li>Author: Fyodor M. Dostoyevski</li>
                  <li>Genre: Psychological</li>
                  <li>Language: English</li>
                  <li>Number of page: 456</li>
                  <li>Publication date: xx xx xx</li>
                </ul>
              </div>
              <div className="product-detail-accordion border-top">
                <div className="product-detail-accordion-header">
                  <span>Delivery</span>

                  <div className="accordion-arrow"></div>
                </div>
                <div className="product-detail-accordion-desc">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Laboriosam doloremque impedit beatae!
                </div>
              </div>
              <div className="product-detail-accordion border-top border-bottom">
                <div className="product-detail-accordion-header">
                  <span>Payment method</span>
                  <div className="accordion-arrow"></div>
                </div>
                <div className="product-detail-accordion-desc">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Laboriosam doloremque impedit beatae!
                </div>
              </div>
              <div className="product-detail-footer">
                <div className="counter">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <button className="add-to-cart">add to bag</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-rewievs-desc">
        <div className="container">
          <ul className="product-tabs">
            <li className="active">description</li>
            <li>rewievs(10)</li>
          </ul>
          <div className="product-tab-sections">
            <section className="product-tab-section show">
              <div className="product-description-text">
              {productDetail?.desc}
              </div>
            </section>
            <section className="product-tab-section">
              <div className="product-rewievs-area">
                <div className="row">
                  <div className="col-xl-9 col-lg-8">
                    <ul className="rewievs-list">
                      <li>
                        <div className="name">Custom name</div>
                        <div className="rewievs-point"></div>
                        <div className="rewievs-content">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Cupiditate natus molestiae a! Lorem ipsum dolor
                          sit amet consectetur adipisicing elit. Cupiditate
                          natus molestiae a!
                        </div>
                      </li>
                      <li>
                        <div className="name">Custom name</div>
                        <div className="rewievs-point"></div>
                        <div className="rewievs-content">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Cupiditate natus molestiae a! Lorem ipsum dolor
                          sit amet consectetur adipisicing elit. Cupiditate
                          natus molestiae a!
                        </div>
                      </li>
                      <li>
                        <div className="name">Custom name</div>
                        <div className="rewievs-point"></div>
                        <div className="rewievs-content">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Cupiditate natus molestiae a!
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-xl-3 col-lg-4">
                    <div className="write-rewievs">
                      <div className="title_1">rewievs this product</div>
                      <span>Share your thoughts with other customers</span>
                      <div className="write-rw-btn">write a rewiev</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
