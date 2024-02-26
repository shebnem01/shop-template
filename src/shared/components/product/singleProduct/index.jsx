import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom";
const SingleProduct = ({ product }) => {
  const { price, name, imgUrl,id } = product;
  return (
    <div className="product-box">
      <div className="box-top-content">
        <div className="add-wishlist">
          <button>
            <GoHeart size={18} />
          </button>
          <button className="hidden">
            <GoHeart size={18} />
          </button>
        </div>
        <div className="box-badge">Discount 20%</div>
        <img src={imgUrl} className="product-image" alt="product-image" />
      </div>
      <div className="product-rating">
        <div className="rating"></div>
      </div>

      <div className="product-box-footer">
        <div className="book-author-name">
          <Link to={`/product-details/${id}`} className="book-name">
            {name}
          </Link>
        </div>

        <div className="book-price">${price}</div>
      </div>
      <div className="view-btn">add to bag</div>
    </div>
  );
};

export default SingleProduct;
