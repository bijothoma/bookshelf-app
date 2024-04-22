import React from 'react'

import '../styles/bookshelf.css'
import SearchBar from '../components/searchBar'

const Bookshelf = () => {
  return (
    <div className="bookshelf_container">
      <SearchBar />
    </div>
  )
}

export default Bookshelf