import React from "react";

const About = () => {
  return (
    <div
      className="about"
      style={{
        fontSize: "24px",
        width: "1000px",
        margin: "0 auto",
        lineHeight: "1.5",
        marginTop: "100px",
        textAlign: "justify",
      }}
    >
      <p style={{ fontWeight: "bold", margin: "20px 0" }}>About</p>
      <p>
        This is an application that aims to improve your reading experience.
      </p>
      <p>
        You can add books from the Google Books catalog to your bookshelf, add
        ratings, currently-reading information, and reviews, and share this data
        with your friends. This helps to expand your collective reading
        landscape and make reading a more social experience.
      </p>

      <p style={{ fontWeight: "bold", margin: "20px 0" }}>How does it work?</p>

      <p>
        You can make an account using any e-mail address. You'll be presented
        with your Bookshelf, to whch you can add books you plan to read or are
        currently reading. The Currently Reading title will be displayed on your
        home page along with your progress. To update your progress, click the
        "Progress update" button and add the current page. You can also add your
        review here. You can go to the Friends page to add friends from the
        drop-down list. Once you have reviewed a book, your review will appear
        as an automatic update on your friends’ home pages. They can add the
        book to their bookshelf by clicking the "Want to Read" button.
      </p>
    </div>
  );
};

export default About;
