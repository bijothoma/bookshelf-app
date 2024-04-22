import React,{useState} from "react";
import "../styles/bookshelf.css";
import ResultItem from "./resultItem";
import search_icon from "../assets/search.png";
import { books } from "../api/data";
import { searchBooks } from "../services/searchBooks";

const SearchBar = () => {
    const [input, setInput] = useState('')
    const handleInputChange = (e) => {
        setInput(e.target.value);
        searchBooks(input);
    }
  return (
    <>
      <div className="searchBooks">
        <img src={search_icon} alt="" />
        <input type="text" placeholder="Search books" value={input} onChange={handleInputChange} />
      </div>
      <div className="listBooks">
        {books.map((book) => (
          <ResultItem
            key={book.id}
            title={book.title}
            author={book.author}
            thumbnail={book.thumb_nail}
          />
        ))}
      </div>
    </>
  );
};

export default SearchBar;
