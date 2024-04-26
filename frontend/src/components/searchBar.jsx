import React, { useState } from "react";
import "../styles/bookshelf.css";
import ResultItem from "./resultItem";
import search_icon from "../assets/search.png";
import { books } from "../api/data";
import { searchBooks } from "../services/searchBooks";

const SearchBar = ({ selectBook }) => {
  const [input, setInput] = useState("");
  const [listDisplay, setListDisplay] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const handleInputChange = (e) => {
    setListDisplay(true)
    setInput(e.target.value);
    if (input != "") {
      searchBooks(input, setSearchData);
      console.log(searchData?.items);
    }
  };
  const hideListDiv = () => {
    setListDisplay(false);
  };

  return (
    <>
      <div className="searchBooks">
        <img src={search_icon} alt="" />
        <input
          type="text"
          placeholder="Search books"
          value={input}
          onChange={handleInputChange}
        />
      </div>
      <div className='listBooks'>
        {input && listDisplay &&
          searchData?.items
            ?.slice(0, 5)
            .map((book) => (
              <ResultItem
                key={book.id}
                id={book.id}
                title={book.volumeInfo?.title}
                author={book.volumeInfo?.authors?.join(", ")}
                thumbnail={book.volumeInfo?.imageLinks?.thumbnail}
                selectBook={selectBook}
                hideListDiv = {hideListDiv}
              />
            ))}
      </div>
    </>
  );
};

export default SearchBar;
