import React, { useState } from 'react'

const BookDetails = (book) => {
  const [thisBook, setThisBook] = useState(null)
  return (
    <div>
        <h1>This is the details page</h1>
        <h3>{book?.volumeInfo?.title}</h3>
    </div>
  )
}

export default BookDetails