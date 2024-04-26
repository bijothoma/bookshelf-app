import React, { useState } from "react";
import ProgressBar from "./progressBar";
import UpdateProgress from "./updateProgress";

const CurrentlyReading = ({
  id,
  title,
  author,
  mediumPic,
  pageCount,
  currentPage,
  review,
  updateCurrentlyReading
}) => {
  const [progressDisplay, setProgressDisplay] = useState(false);
  const displayUpdateProgressToggle = () => {
    setProgressDisplay(!progressDisplay);
  };
  const handleUpdateProgressClick = () => {
    displayUpdateProgressToggle();
  };
  return (
    <div className="currently-reading">
      <div className="cr-thumb-nail">
        <img src={mediumPic} alt="" className="cr-thumbnail" />
      </div>
      <div className="cr-gr-book_details">
        <div className="gr-book_title">{title}</div>
        <div className="gr-book_author">by {author}</div>
        {currentPage > 0 ? (
          <ProgressBar
            pageCount={pageCount}
            currentPage={currentPage}
          ></ProgressBar>
        ) : (
          <></>
        )}

        <div className="gr-book-progress">
          <button className="progress" onClick={handleUpdateProgressClick}>
            Update Progress
          </button>
          {progressDisplay && (
            <UpdateProgress
              id={id}
              currentPage={currentPage}
              pageCount={pageCount}
              review={review}
              displayUpdateProgressToggle={displayUpdateProgressToggle}
              updateCurrentlyReading ={updateCurrentlyReading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentlyReading;
