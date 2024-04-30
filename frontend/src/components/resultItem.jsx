import React from "react";
import "../styles/resultItem.css";

const ResultItem = ({
  id,
  thumbnail,
  title,
  author,
  selectBook,
  hideListDiv,
}) => {
  const handleClick = () => {
    selectBook(id);
    hideListDiv();
  };
  return (
    <div className="resultItemSearch" onClick={handleClick}>
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
