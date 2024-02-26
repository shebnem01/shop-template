import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import SuggestSearch from "../suggestSearch";
import { useNavigate } from "react-router";

const Search = ({
  search,
  searchProduct,
  setShowSearchResult,
  showSearchResult,
}) => {
  const navigation=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigation("/all-products")
  };
  return (
    <div className="search">
      <form action="" onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            onChange={searchProduct}
            value={search}
            type="text"
            placeholder="Axtar..."
          />{" "}
          <button className="d-flex align-items-center justify-content-center">
            <LuSearch size={30} />
          </button>
        </div>

        {showSearchResult && (
          <SuggestSearch setShowSearchResult={setShowSearchResult} />
        )}
      </form>
    </div>
  );
};

export default Search;
