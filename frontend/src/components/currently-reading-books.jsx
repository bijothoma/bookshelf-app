import React, { useEffect, useState } from "react";
import CurrentlyReading from "./currently-reading";
import {
  fetchQueryData,
  UpdateBookFromShelf,
  fetchReviewedBooks,
} from "../services/searchBooks";
import "../styles/dashboard.css";
import { useUser } from "../services/userContext";
import SocialCard from "./socialCard";
const CurrentlyReadingBooks = () => {
  const { userId, setUser } = useUser();
  const [friendsData, setFriendsData] = useState([]);
  const [data, setData] = useState([]);
  const [reviewedBooks, setReviewedBooks] = useState([]);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const queryData = {
    userId: userId,
    shelves: 1,
  };

  const fetchCurrentlyReading = () => {
    fetchQueryData(queryData, setData, setLoading1);
  };

  const fetchSocialCardBooks = async () => {
    const tmp = await fetchReviewedBooks(userId, setReviewedBooks, setLoading2);
    setFriendsData(tmp);
  };

  const updateCurrentlyReading = async (id, updateData) => {
    setLoading1(true);
    await UpdateBookFromShelf(id, userId, updateData, setLoading1);
    fetchCurrentlyReading();
  };

  useEffect(() => {
    fetchCurrentlyReading();
  }, []);

  useEffect(() => {
    fetchSocialCardBooks();
  }, []);
  return (
    <div className="dashboard_container">
      {loading1 ? (
        <div>loading..</div>
      ) : (
        <div className="dashboard">
          <div className="currentlyReading">
            <div className="title">{data?.length>0 ?"CURRENTLY READING" : "No books in Currently reading shelf. Please add some from my bookshelf menu and change the shelf to currently reading to see it here."}</div>
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
                  fetchCurrentlyReading={fetchCurrentlyReading}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="socialCard_dashboard">
        {loading2 ? (
          <div>loading..</div>
        ) : (
          <>
            <div className="title">{friendsData?.length > 0 ? "Updates" : "No updates yet. Please add friends from the friends menu. Once they review a book, you can see it here."}</div>
            <div>
              {friendsData?.map((book) => {
                return (
                  <SocialCard
                    key={book.id}
                    id={book.id}
                    friend={book.userName}
                    title={book.title}
                    author={book.authors}
                    thumbnail={book.thumbnail}
                    mediumPic={book.mediumPic}
                    pageCount={book.pageCount}
                    currentPage={book.currentPage}
                    review={book.review}
                    rating={book.rating}
                    description={book.description}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentlyReadingBooks;
