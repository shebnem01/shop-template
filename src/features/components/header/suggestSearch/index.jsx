import { useSelector } from "react-redux";
import { selFilteredProduct } from "../../../../redux/slices/filterProductSlice";
import { useNavigate } from "react-router";

const SuggestSearch = ({ setShowSearchResult }) => {
  const filteredProduct = useSelector(selFilteredProduct);
  console.log(filteredProduct);
  const navigate = useNavigate();
  const handleProduct = (id) => {
    navigate(`product-details/${id}`);
    setShowSearchResult(false);
  };
  return (
    <div className="suggest-search-item shadow">
      <div className="container">
        <ul>
          {filteredProduct?.map((product) => (
            <li key={product.id} onClick={() => handleProduct(product.id)}>
              <div className="pr-img">
                <img src={product.imgUrl} alt={product.name} />
              </div>
              <div className="pr-info">
                <div className="name">{product.name}</div>
                {/* <div className="author-name">Author name</div> */}
                <div className="pr-price">{product.price}</div>
              </div>
            </li>
          ))}
          {filteredProduct.length==0 && (
            <div className="text-center">No information was found for your request.</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SuggestSearch;
