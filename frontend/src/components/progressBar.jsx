import React from "react";

const ProgressBar = ({ pageCount, currentPage }) => {
  return (
    <div className="progressBar">
      <progress
        className="progressElement"
        id="file"
        max={pageCount}
        value={currentPage}
      >
     
      </progress>
      <div>
        {currentPage}/{pageCount}
      </div>
      <div>
        ({parseInt(currentPage*100/pageCount)}%)
      </div>
    </div>
  );
};

export default ProgressBar;
