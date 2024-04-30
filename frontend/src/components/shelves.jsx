import { useState } from "react";
import React from "react";
const shelveValues = ["to-read", "currently-reading", "read"];

const Shelves = ({ value, updateShelves }) => {
  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState(value);
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle radio button change
  const handleRadioButtonChange = (event) => {
    const val = Number(event.target.value);
    setSelectedValue(val);
  };
  const handleVisibility = (event) => {
    setIsVisible(!isVisible);
  };
  const handleClose = (event) => {
    setIsVisible(false);
    if (value !== selectedValue) {
      updateShelves("shelves", selectedValue);
    }
  };
  return (
    <div>
      {shelveValues[selectedValue]}
      <div onClick={handleVisibility} style={{ cursor: "pointer" }}>
        [edit]
      </div>
      {isVisible && (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px",
            width: "180px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            onClick={handleClose}
            style={{
              cursor: "pointer",
              width: "100%",
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            close
          </div>
          <label>
            <input
              type="radio"
              value="0"
              checked={selectedValue === 0}
              onChange={handleRadioButtonChange}
              style={{ margin: "5px" }}
            />
            to-read
          </label>
          <label>
            <input
              type="radio"
              value="1"
              checked={selectedValue === 1}
              onChange={handleRadioButtonChange}
              style={{ margin: "5px" }}
            />
            currently-reading
          </label>
          <label>
            <input
              type="radio"
              value="2"
              checked={selectedValue === 2}
              onChange={handleRadioButtonChange}
              style={{ margin: "5px" }}
            />
            read
          </label>
        </div>
      )}
    </div>
  );
};

export default Shelves;
