export const searchBooks = async (txt) => {
  await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${txt}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => console.log(json));
};
