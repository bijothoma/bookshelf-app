import axios from "axios";
export const searchBooks = async (txt, setSearchData) => {
  await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${txt}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => setSearchData(json));
};

export const searchBooksById = async (id, setSelectedBook) => {
  await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then((response) => response.json())
    .then((json) => setSelectedBook(json));
};

const fetchBookById = async (bookId) => {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${bookId}:`, error);
    return null;
  }
};

// Function to fetch multiple books by IDs
export const fetchBooksByIds = async (bookIds) => {
  try {
    // Map bookIds to array of promises for fetching individual book details
    const promises = bookIds.map((bookId) => fetchBookById(bookId));
    // Execute promises concurrently and wait for all to resolve
    const booksData = await Promise.all(promises);
    return booksData.filter((book) => book !== null); // Filter out any null results
  } catch (error) {
    console.error("Error fetching books by IDs:", error);
    return [];
  }
};

//function to add a book to mongodb
export const AddBookToMyShelf = async (id, userId) => {
  try {
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/mybooks`;
    const { data: res } = await axios.post(url, {
      id: id,
      userId: userId,
    });
  } catch (error) {
    console.log("Error in adding this book.." + error);
  }
};

//function to delete a book

export const RemoveBookFromShelf = async (id, userId) => {
  try {
    const queryData = {
      id: id,
      userId: userId,
    };
    const queryParams = new URLSearchParams(queryData).toString();
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/mybooks/delete?${queryParams}`;
    const response = await axios.delete(url);
  } catch (error) {
    console.log("Error in deleting this book.." + error);
  }
};

//function to update a book

export const UpdateBookFromShelf = async (
  id,
  userId,
  updateData,
  setLoading
) => {
  try {
    const paramData = {
      id: id,
      userId: userId,
    };
    const queryParams = new URLSearchParams(paramData).toString();
    // Make PUT request to the API endpoint with the item ID and update data
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/mybooks/update?${queryParams}`;
    await axios.put(url, updateData).then((response) => {
      console.log("Response data:", response.data);
    });
  } catch (error) {
    console.log("Error in updating this book.." + error);
  } finally {
    setLoading(false);
  }
};

export const fetchMergedData = async (userId, setMyBooks, setLoading) => {
  try {
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/mybooks/getAllMerged/${userId}`;
    const response = await axios.get(url).then((res) => {
      return res;
    });
    return setMyBooks(response.data);
  } catch (error) {
    console.log("Error in getting merged books..");
  } finally {
    setLoading(false);
  }
};

export const fetchQueryData = async (
  queryData,
  setCurrentlyReading,
  setLoading
) => {
  try {
    const queryParams = new URLSearchParams(queryData).toString();
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/mybooks/getMergedBy?${queryParams}`;
    const response = await axios.get(url).then((res) => {
      return res;
    });
    return setCurrentlyReading(response.data);
  } catch (error) {
    console.log("Error in getting query data..");
  } finally {
    setLoading(false);
  }
};

export const fetchReviewedBooks = async (userId,setReviewedBooks, setLoading) => {
  try {
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/mybooks/getAllinArray/${userId}`;
    const response = await axios.get(url).then((res) => {
      return res;
    });
    //return setReviewedBooks(response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting reviewed book data..");
  } finally {
    setLoading(false);
  }
};

export const fetchNotFriends = async (userId, setNotFriends, setLoading) => {
  try {
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/friends/getNotFriends/${userId}`;
    const response = await axios.get(url).then((res) => {
      return res;
    });
    setNotFriends(response.data);
  } catch (error) {
    console.log("Error in getting reviewed book data..");
  } finally {
    setLoading(false);
  }
};

export const fetchFriends = async (userId,setFriends, setLoading) => {
  try {
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/friends/getAll/${userId}`;
    const response = await axios.get(url).then((res) => {
      return res;
    });
    setFriends(response.data);
  } catch (error) {
    console.log("Error in getting reviewed book data..");
  } finally {
    setLoading(false);
  }
};


export const AddFriend = async (userId, friendId) => {
  try {
    const friendData = {
      userId: userId,
      friendId : friendId
    }
    const queryParams = new URLSearchParams(friendData).toString();
    const url = `${process.env.REACT_APP_RENDER_PATH}/api/friends?${queryParams}`;
    const { data: res } = await axios.post(url);
  } catch (error) {
    console.log("Error in adding this friend.." + error);
  }
};