//function to fetch singel bookid from google api
const fetchBookById = async (bookId) => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
    try {
      const response = await fetch(apiUrl).then((response) => {
        return response.json();
      });
      return response;
    } catch (error) {
      console.error(`Error fetching book with ID ${bookId}:`, error);
      return null;
    }
  };
  
  // Function to fetch multiple books by IDs
  const fetchBooksByIds = async (bookIds) => {
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

  module.exports = {fetchBookById, fetchBooksByIds};