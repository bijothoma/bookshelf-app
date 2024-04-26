import React, { useState } from 'react'

const BookDetails = (book) => {
  const [thisBook, setThisBook] = useState(null)
//   useState(() => {
//     setThisBook(book)
//     console.log("teh value changed")
//   },[book])
  return (
    <div>
        <h1>This is the details page</h1>
        <h3>{book?.volumeInfo?.title}</h3>
        {/* <img src={book?.volumeInfo?.imageLinks?.extraLarge} alt="" />
        <div>{book?.volumeInfo?.title}</div>
        {book?.volumeInfo?.description}
        {book?.volumeInfo?.authors?.join(", ")} */}

    </div>
  )
}

export default BookDetails