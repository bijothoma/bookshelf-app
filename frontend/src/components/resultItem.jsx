import React from "react";
import "../styles/resultItem.css";

const ResultItem = ({ key, thumbnail, title, author }) => {
  return (
    <div className="resultItem">
      <div className="thumb-nail">
        <img src={thumbnail} alt="" className="thumbnail" />
      </div>
      <div className="book_details">
        <div className="book_title">{title}</div>
        <div className="gr-book_author">by {author}</div>
      </div>
    </div>
  );
};

export default ResultItem;
