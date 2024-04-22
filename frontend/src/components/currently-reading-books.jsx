import React, { useEffect, useState } from 'react'
import CurrentlyReading from './currently-reading'
import { books } from "../api/data";

const CurrentlyReadingBooks = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        // Define a function to fetch data
        const fetchData = async () => {
          try {
            // Perform API call or any asynchronous operation
            // const response = await fetch('https://api.example.com/data');
            // const result = await response.json();
            // Update state with fetched data
            setData(books);
            console.log("getting data...")
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the fetchData function
        fetchData();
    
        // Optionally, return a cleanup function to clean up resources (e.g., event listeners)
        return () => {
          // Cleanup code here if needed
        };
      }, []);
  return (
    <div className="container">
        <div>CURRENTLY READING</div>
        <div className="current">
          {data.map((book) => (
            <CurrentlyReading
              key={book.id}
              title={book.title}
              author={book.author}
              thumbnail={book.thumb_nail}
            />
          ))}
        </div>
    </div>
  )
}

export default CurrentlyReadingBooks