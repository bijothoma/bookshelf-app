import React from 'react'
import '../styles/tablerow.css'
const TableRowHead = () => {
  return (
    <div className="resultItemTable" style={{ border:"none", fontWeight:"bold",fontSize:"14px" }}>
      <div className="thumb-nail">
        Cover
      </div>
      <div className="book_title" style={{ fontSize:"14px" }}>Title</div>
      <div className="book_authors">Author</div>
      <div className="book_avRating">Average Rating</div>
      <div className="book_rating">
        Rating
      </div>
      <div className="book_shelves">Shelves</div>
      <div className="book_addedDate">Date Added</div>
      <div className="book_close">
        
      </div>
    </div>
  )
}

export default TableRowHead