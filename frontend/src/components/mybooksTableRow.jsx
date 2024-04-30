import React from "react";
import "../styles/tablerow.css";
import close from "../assets/close.png";
import ReactStars from "react-rating-stars-component";
import Shelves from "./shelves";

const MyBooksTableRow = ({
  id,
  thumbnail,
  title,
  author,
  avRating,
  rating,
  shelves,
  removeBook,
  updateBook,
  dateAdded,
}) => {
  const handleRemove = () => {
    removeBook(id);
  };
  const updateTable = (name, value) => {
    const updateData = {
      [name]: value,
    };
    updateBook(id, updateData);
  };
  const ratingChanged = (newRating) => {
    updateTable("rating", newRating);
  };
  // Format the date as "MMM dd, yy"
  const date = new Date(dateAdded);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return (
    <div className="resultItemTable">
      <div className="thumb-nail">
        <img src={thumbnail} alt="" className="thumbnail" />
      </div>
      <div className="book_title">{title}</div>
      <div className="book_authors">by {author}</div>
      <div className="book_avRating">{avRating}</div>
      <div className="book_rating">
        <ReactStars
          count={5}
          onChange={ratingChanged}
          value={rating}
          size={32}
          activeColor="#ffd700"
        />
      </div>
      <div className="book_shelves">
        <Shelves value={shelves} updateShelves={updateTable} />
      </div>
      <div className="book_addedDate">{formattedDate}</div>
      <div className="book_close" onClick={handleRemove}>
        <img
          src={close}
          alt=""
          title="remove from my shelves"
          className="close"
        />
      </div>
    </div>
  );
};

export default MyBooksTableRow;
