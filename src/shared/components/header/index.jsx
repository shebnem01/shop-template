import React, { useState } from "react";
import logo from "../../../assets/logo.svg";
import { GoHeart } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi2";
import { PiShoppingCartLight } from "react-icons/pi";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { SEARCH_FILTER } from "../../../redux/slices/filterProductSlice";
import { selProducts } from "../../../redux/slices/productSlice";
import Search from "../../../features/components/header/search";

const Header = () => {
  const products = useSelector(selProducts);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const handleMegaMenu = () => {
    setShowMegaMenu(!showMegaMenu);
  };
  const searchProduct = (e) => {
    const searchText = e.target.value; 
    setSearch(searchText);
    setShowSearchResult(true);
    dispatch(SEARCH_FILTER({ search: searchText, products })); // Aramayı filtrele
  };

  return (
    <header className="general-header">
      <div className="header-top">
        <div className="container-fluid">
          <div className="d-flex justify-content-end align-items-center gap-30">
            <a className="email-address" href="mailto:info@gmail.com">
              info@gmail.com
            </a>
            <span className="phone">(+994) 50 000 00 00</span>
            <ul className="lang-select">
              <li className="position-relative drop_down-header">
                <div className="d-flex align-items-center">
                  EN
                  <FiChevronDown />
                </div>
                <ul className="lang-dropdown shadow">
                  <li>
                    <a href="">AZ</a>
                  </li>
                  <li>
                    <a href="">RU</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-middle">
        <div className="container">
          <div className="d-flex justify-content-lg-center justify-content-between align-items-center gap-24">
            <Link to="/" className="header-logo">
              <img src={logo} alt="header-logo" />
            </Link>
            <Search
              showSearchResult={showSearchResult}
              setShowSearchResult={setShowSearchResult}
              searchProduct={searchProduct}
              search={search}
            />
            <div className="header-actions">
              <div className="d-flex align-items-center gap-24">
                <div className="basket">
                  <Link to="/basket">
                    <PiShoppingCartLight size={30} />
                    <span className="basket-count">0</span>
                  </Link>
                </div>
                <div className="mobile-open-menu d-lg-none d-block"></div>
                <div className="wishlist">
                  <a href="wishlist.html">
                    <GoHeart size={26} />
                  </a>
                </div>
                <div className="login">
                  <div className="dropdown-header">
                    <HiOutlineUser size={25} />
                  </div>
                  <div className="login-dropdown shadow">
                    <li className="show-sign-in">Sign in</li>
                    <li className="show-sign-up">Sign up</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="d-flex justify-content-between">
            <nav className="left-nav">
              <ul className="nav-list gap-58">
                <li className="dropdown has-megamenu" onClick={handleMegaMenu}>
                  <Link to="/all-products"
                    className="nav-link dropdown-toggle"
                    
                    data-bs-toggle="dropdown"
                  >
                    Books
                  </Link>
                  {showMegaMenu && (
                    <ul className="dropdown-menu megamenu" role="menu">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="col-title">category 1</div>
                            <ul>
                              <li>
                                <Link to="/all-product">new book</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </ul>
                  )}
                </li>
                <li>
                  <a href="" className="nav-link">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="" className="nav-link">
                    Authors
                  </a>
                </li>

                <li>
                  <a href="" className="nav-link">
                    Others
                  </a>
                </li>
              </ul>
            </nav>
            <nav className="right-nav">
              <ul className="nav-list gap-58">
                <li>
                  <a href="" className="nav-link">
                    Discount
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="search d-lg-none d-block">
          <form action="">
            <div className="d-flex">
              <button>
                <img src="./assets/images/search.svg" alt="search-img" />
              </button>
              <input type="text" placeholder="Axtar..." />
            </div>

            <div className="suggest-search-item">
              <div className="container">
                <ul>
                  <li>
                    <a href="product_details.html">
                      <div className="pr-img">
                        <img src="./assets/images/slider-book-2.png" alt="" />
                      </div>
                      <div className="pr-info">
                        <div className="name">Book name</div>
                        <div className="author-name">Author name</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="product_details.html">
                      <div className="pr-img">
                        <img src="./assets/images/slider-book-2.png" alt="" />
                      </div>
                      <div className="pr-info">
                        <div className="name">Book name</div>
                        <div className="author-name">Author name</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="product_details.html">
                      <div className="pr-img">
                        <img src="./assets/images/slider-book-2.png" alt="" />
                      </div>
                      <div className="pr-info">
                        <div className="name">Book name</div>
                        <div className="author-name">Author name</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
