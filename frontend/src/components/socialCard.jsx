import React from "react";
import ReactStars from "react-rating-stars-component";

const SocialCard = (
  id,
  friend,
  thumbnail,
  title,
  authors,
  description,
  rating,
  review
) => {
  const ratingChanged = (newRating) => {};
  const handleRead = () => {}
  return (
    <div>
      <div sc_title>Updates</div>
      <div className="socialCard">
        <div className="header">
          <div className="friend">{friend}</div> reviewed
          <div className="title">{title}</div>
        </div>
        <div className="rating">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            value={rating}
            size={32}
            activeColor="#FA604A"
          />
        </div>
        <div className="review">{review}</div>
        <div className="details">
          <div className="thumbnail">
            <img src={thumbnail} alt={title} />
          </div>
          <div className="sc_details">
            <div className="title">{title}</div>
            by <div className="authors">{authors}</div>
            <button className="wanttoread" onClick={handleRead}>Want to Read</button>
            <div className="description">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
