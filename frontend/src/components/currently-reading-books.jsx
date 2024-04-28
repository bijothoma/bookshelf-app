import React, { useEffect, useState } from "react";
import CurrentlyReading from "./currently-reading";
import { books } from "../api/data";
import { fetchQueryData, UpdateBookFromShelf, fetchReviewedBooks } from "../services/searchBooks";
import "../styles/dashboard.css";
import { useUser } from "../services/userContext";
import SocialCard from "./socialCard";
const CurrentlyReadingBooks = () => {
  const {userId, setUser} = useUser();
  const [data, setData] = useState([]);
  const [reviewedBooks,setReviewedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const queryData = {
    userId: userId,
    shelves: 1,
  };

  const fetchCurrentlyReading = () => {
    fetchQueryData(queryData, setData, setLoading);
  };

  const fetchSocialCardBooks = () => {
    fetchReviewedBooks(userId,setReviewedBooks, setLoading);
  }

  const updateCurrentlyReading = async (id, updateData) => {
    setLoading(true);
    UpdateBookFromShelf(id,userId, updateData, setLoading);
    fetchCurrentlyReading();
  };

  useEffect(() => {
    fetchCurrentlyReading();
    //fetchSocialCardBooks();
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
      <div className="socialCard">
      {loading ? (
        <div>loading..</div>
      ) : (
        <>
        <div className="title">Updates</div>
        <div className="updates">
          {reviewedBooks.map((book) => {
            <SocialCard 
            key={book.id}
            id={book.id}
            friend={book.name}
            title={book.title}
            author={book.authors}
            thumbnail={book.thumbnail}
            mediumPic={book.mediumPic}
            pageCount={book.pageCount}
            currentPage={book.currentPage}
            review={book.review}
            rating={book.rating}
            
            />
          })}
        </div>        
        </>

      )
    }
      </div>
    </div>
  );
};

export default CurrentlyReadingBooks;
