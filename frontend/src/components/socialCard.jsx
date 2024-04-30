import React, { useState } from "react";
import "../styles/socialcard.css";
import ReactStars from "react-rating-stars-component";
import TextToggle from "./textToggle";
import { useUser } from "../services/userContext";
import { AddBookToMyShelf, UpdateBookFromShelf } from "../services/searchBooks";

const SocialCard = ({
  id,
  friend,
  title,
  author,
  thumbnail,
  mediumPic,
  pageCount,
  currentPage,
  review,
  rating,
  description,
  isInMyShelf
}) => {
  const { userId, setUserId } = useUser();
  const [bookAdded, setBookAdded] = useState(isInMyShelf);
  const ratingChanged = (newRating) => {};
  const addBook = async () => {
    await AddBookToMyShelf(id, userId);
  };
  const handleRead = () => {
    addBook();
    setBookAdded(true);
  };
  return (
    <>
      <div className="socialCard">
        <div className="sc_header">
          <div className="friend">{friend}</div> reviewed
          <div className="sc_title">{title}</div>
        </div>
        <div className="sc_rating">
          Rating
          <ReactStars
            count={5}
            onChange={ratingChanged}
            value={rating}
            size={26}
            activeColor="#FA604A"
          />
        </div>
        <div className="sc_review">{review}</div>
        <div className="sc_details_block">
          <div className="sc_thumbnail">
            <img src={thumbnail} alt={title} />
          </div>
          <div className="sc_details">
            <div className="sc_block_title">{title}</div>
            <div style={{ display: "flex", gap: "3px" }}>
              {" "}
              by <div className="sc_authors">{author}</div>
            </div>
            {!bookAdded ? (
              <button className="wanttoread" onClick={handleRead}>
                Want to Read
              </button>
            ) : (
              <div className="book_added">Book added</div>
            )}

            <TextToggle
              text={description.replace("<br>", "")}
              maxLength={800}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialCard;
