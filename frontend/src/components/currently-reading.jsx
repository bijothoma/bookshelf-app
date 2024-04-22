import React from "react";

const CurrentlyReading = ({ id, title, author, thumbnail }) => {
  return (
    <div className="currently-reading">
      <div className="thumb-nail">
        <img
          src={thumbnail}
          alt=""
          className="thumbnail"
        />
      </div>
      <div className="gr-book_details">
        <div className="gr-book_title">
          {title}
        </div>
        <div className="gr-book_author">by {author}</div>
        <div className="gr-book-progress">
          <button className="progress">Update Progress</button>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyReading;
