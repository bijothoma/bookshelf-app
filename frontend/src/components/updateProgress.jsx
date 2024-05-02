import React, { useEffect, useState } from "react";
import "../styles/updateProgress.css";
const UpdateProgress = ({
  id,
  currentPage,
  pageCount,
  review,
  displayUpdateProgressToggle,
  updateCurrentlyReading,
  fetchCurrentlyReading,
}) => {
  const [cPage, setCPage] = useState(currentPage);
  const [reviewText, setReviewText] = useState(review);
  const [shelves, setShelves] = useState(1);
  const currentPageChange = (event) => {
    if (Number(event.target.value) > pageCount) {
      setCPage(pageCount);
    } else {
      setCPage(event.target.value);
    }
    if (Number(event.target.value) < 0) {
      setCPage(0);
    } else {
      setCPage(event.target.value);
    }    
  };
  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };
  const handleFinished = () => {
    setShelves(2);
  };
  const handleUpdateProgess = () => {
    const updateData = {
      currentPage: cPage,
      shelves: shelves,
      review: reviewText,
      reviewedOn: new Date(),
    };
    updateCurrentlyReading(id, updateData);
  };
  const handleUpdateCancel = () => {
    displayUpdateProgressToggle();
  };
  useEffect(() => {
    fetchCurrentlyReading();
  }, []);
  return (
    <div className="updateProgress">
      <div className="progressHeader">
        <div>
          Currently on
          <input
            type="number"
            className="currentPage"
            min={0}
            value={cPage}
            max={pageCount}
            onChange={currentPageChange}
            style={{ width: "50px" }}
          />
          of {pageCount}
        </div>
        <div className="finished" onClick={handleFinished}>
          I'm finished!
        </div>
      </div>
      <div>
        <textarea
          className="review"
          value={reviewText}
          onChange={handleReviewTextChange}
        />
      </div>
      <div className="progressFooter">
        <div className="charactersLeft">
          {420 - reviewText.length} characters left
        </div>
        <div className="progressButtons">
          <button className="cancel" onClick={handleUpdateCancel}>
            Cancel
          </button>
          <button className="update" onClick={handleUpdateProgess}>
            Update Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgress;
