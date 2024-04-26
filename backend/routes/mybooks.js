const router = require("express").Router();
require("isomorphic-fetch");
const { model } = require("mongoose");
const MyBooks = require("../models/mybooks");
const { query } = require("express");

router.post("/", async (req, res) => {
  try {
    const book = await MyBooks.findOne({ id: req.body.id, userId : req.body.userId });
    if (book)
      return res
        .status(409)
        .send({ message: "This book is already in your collection!" });

    await new MyBooks({ ...req.body }).save();
    res.status(201).send({ message: `This book added successfully.` });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const myBooks = await MyBooks.find({userId : req.body.userId});
    res.json(myBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

const mergeBooks = async (myBooks) => {
  try {
    const ids = myBooks.map((book) => book.id);
    const allGoogleBooks = await fetchBooksByIds(ids).then((books) => {
      return books;
    });
    const mergedBooks = myBooks.map((book) => {
      const details = allGoogleBooks.find((gBooks) => gBooks.id === book.id);
      //console.log(details);
      return {
        id: book.id,
        userId: book.userId,
        rating: book.rating,
        shelves: book.shelves,
        createdAt: book.createdAt,
        thumbnail: details.volumeInfo.imageLinks.thumbnail,
        mediumPic: details.volumeInfo.imageLinks.thumbnail,
        title: details.volumeInfo.title,
        authors: details.volumeInfo.authors?.join(", "),
        averageRating:
          details.volumeInfo.maturityRating === "NOT_MATURE"
            ? "N/A"
            : details.volumeInfo.averageRating,
        pageCount: details.volumeInfo.pageCount,
        currentPage: book.currentPage,
        review: book.review,
      };
    });
    return mergedBooks;
  } catch (error) {
       console.error(`Error fetching merged books`, error);
    return null; 
  }
};

router.get("/getAllMerged/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("user Id : ", userId);
    const myBooks = await MyBooks.find({userId:userId});
    const mBooks = mergeBooks(myBooks);
    mBooks.then(data => {
      res.json(data);
    })
  } catch (error) {
    console.error(`Error fetching merged books`, error);
    return null;
  }
});

router.get("/getMergedBy", async (req, res) => {
  try {
    const queryData = req.query;
    console.log("query data : ",queryData);
    const myBooks = await MyBooks.find(queryData).then(res => {return res});
    const mBooks = mergeBooks(myBooks);
    mBooks.then(data => {
      //console.log("merged by : ",data);
      res.json(data);
    })
  } catch (error) {
    console.error(`Error fetching merged books`, error);
    return null;
  }
});

router.delete("/delete", async (req, res) => {
  try {
    // Extract the ID of the item to be removed from the request parameters
    const queryData = req.query;
    //const itemId = req.params.id;

    // Find the book by ID and remove it from the database
    MyBooks.deleteOne(queryData).then((result) => {
      if (result.deletedCount === 1) {
        res.status(200).send("Item removed successfully");
      } else {
        res.status(404).send({ error: `Book with id ${id} not found` });
      }
    });
  } catch (err) {
    // Handle any errors
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/update", async (req, res) => {
  try {
    const queryData = req.query;
    const updateData = req.body; // Data to update, sent in the request body
    console.log("query data : ", queryData);
    console.log("update data : ", updateData);

    // Find the item by ID and update it
    // const updatedItem = await MyBooks.findByIdAndUpdate(itemId, updateData, { new: true });
    const updatedItem = await MyBooks.findOneAndUpdate(
      queryData,
      updateData
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem); // Send the updated item as a response
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
