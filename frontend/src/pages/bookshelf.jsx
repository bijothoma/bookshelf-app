import React, { useEffect, useState } from "react";
import "../styles/bookshelf.css";
import SearchBar from "../components/searchBar";
import {
  AddBookToMyShelf,
  fetchMergedData,
  RemoveBookFromShelf,
  UpdateBookFromShelf,
} from "../services/searchBooks";
import MyBooksTableRow from "../components/mybooksTableRow";
import Spinner from "../components/spinner";
import TableRowHead from "../components/tableRowHead";
import { useUser } from "../services/userContext";

const Bookshelf = () => {
  const { userId, setUser } = useUser();
  const [selectedBook, setSelectedBook] = useState(null);
  const [myBooks, setMyBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  //select book from the dropdown and add it to db. Also refresh the table.
  const selectBook = async (id) => {
    await AddBookToMyShelf(id, userId);
    refreshTable();
  };
  const removeBook = async (id) => {
    await RemoveBookFromShelf(id, userId);
    refreshTable();
  };
  const updateBook = async (id, updateObject) => {
    setLoading(true);
    await UpdateBookFromShelf(id, userId, updateObject, setLoading);
    refreshTable();
  };
  const refreshTable = async () => {
    setLoading(true);
    await fetchMergedData(userId, setMyBooks, setLoading);
  };

  useEffect(() => {
    refreshTable();
  }, []);

  return (
    <div className="bookshelf_container">
      <SearchBar selectBook={selectBook} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="tableRows">
          {myBooks?.length > 0 && <TableRowHead />}
          {myBooks?.map((book) => {
            return (
              <MyBooksTableRow
                key={book.id}
                id={book.id}
                thumbnail={book.thumbnail}
                title={book.title}
                author={book.authors}
                avRating={book.averageRating}
                rating={book.rating}
                shelves={book.shelves}
                removeBook={removeBook}
                updateBook={updateBook}
                dateAdded={book.createdAt}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
