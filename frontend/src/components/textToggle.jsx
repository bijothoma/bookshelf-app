import React, { useState } from 'react';

const TextToggle = ({ text, maxLength }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Split the text by '<p>' tags
  const paragraphs = text.split('<p>');

  return (
    <div>
      {showMore ? (
        <>
          {paragraphs.map((paragraph, index) => (
            // Only render the first paragraph
            index === 0 && <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
          <button onClick={toggleShowMore}>Less</button>
        </>
      ) : (
        <>
          {paragraphs[0] && paragraphs[0].length > maxLength ? (
            // If the first paragraph's length exceeds maxLength, display truncated text and a "More" button
            <>
              {paragraphs[0].slice(0, maxLength)}
              <button onClick={toggleShowMore}>More</button>
            </>
          ) : (
            // Otherwise, display the full first paragraph
            <p dangerouslySetInnerHTML={{ __html: paragraphs[0] }} />
          )}
        </>
      )}
    </div>
  );
};

export default TextToggle;