import React, {useState} from "react";
import '../styles/updateProgress.css'
const UpdateProgress = ({ id, currentPage, pageCount, review , displayUpdateProgressToggle, updateCurrentlyReading}) => {
  const [cPage, setCPage] = useState(currentPage);
  const [reviewText, setReviewText] = useState(review);
  const [shelves, setShelves] = useState(1)
  const currentPageChange = (event) => {
    setCPage(event.target.value);
  };
  const handleReviewTextChange = (event) => {
    console.log(reviewText)
    setReviewText(event.target.value);
  }
  const handleFinished = () => {
    setShelves(2)
  };
  const handleUpdateProgess = () => {
    console.log("review : ", review);
    const updateData = {
      currentPage : cPage,
      shelves : shelves,
      review : reviewText
    }
    updateCurrentlyReading(id, updateData);
  };
  const handleUpdateCancel = () => {
    displayUpdateProgressToggle();
  };
  return (
    <div className="updateProgress">
      <div className="progressHeader">
        <div>
          Currently on
          <input
            type="text"
            className="currentPage"
            value={cPage}
            max={pageCount}
            onChange={currentPageChange}
          />
          of {pageCount}
        </div>
        <div className="finished" onClick={handleFinished}>I'm finished!</div>
      </div>
      <div>
        <textarea className="review" value={reviewText} onChange={handleReviewTextChange} />
      </div>
      <div className="progressFooter">
        <div className="charactersLeft">
            {420-reviewText.length} characters left
        </div>
        <div className="progressButtons">
            <button className="cancel" onClick={handleUpdateCancel}>Cancel</button>
            <button className="update" onClick={handleUpdateProgess}>Update Progress</button>
        </div>
      </div>

    </div>
  );
};

export default UpdateProgress;
