import React, { useEffect, useState } from "react";
import CurrentlyReading from "./currently-reading";
import { books } from "../api/data";
import { fetchQueryData, UpdateBookFromShelf } from "../services/searchBooks";
import "../styles/dashboard.css";
import { useUser } from "../services/userContext";
const CurrentlyReadingBooks = () => {
  const {userId, setUser} = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const queryData = {
    userId: userId,
    shelves: 1,
  };

  const fetchCurrentlyReading = () => {
    fetchQueryData(queryData, setData, setLoading);
  };

  const updateCurrentlyReading = async (id, updateData) => {
    setLoading(true);
    await UpdateBookFromShelf(id, updateData, setLoading);
    await fetchCurrentlyReading();
  };

  useEffect(() => {
    fetchCurrentlyReading();
    console.log("User id : ", userId)
  }, []);
  return (
    <div className="container">
      {loading ? (
        <div>loading..</div>
      ) : (
        <div className="dashboard">
          <div className="currentlyReading">
            <div className="title">CURRENTLY READING</div>
            <div className="current">
              {data.map((book) => (
                <CurrentlyReading
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.authors}
                  thumbnail={book.thumbnail}
                  mediumPic={book.mediumPic}
                  pageCount={book.pageCount}
                  currentPage={book.currentPage}
                  review={book.review}
                  updateCurrentlyReading={updateCurrentlyReading}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="socialCard"></div>
    </div>
  );
};

export default CurrentlyReadingBooks;
