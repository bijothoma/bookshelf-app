# Bookshelf App

This project contains a Bookshelf App created using MERN stack. Please follow the instructions to set it up.  

**Features**

1. Ability to add books from the vast collection of google books to your bookshelf.
2. Makes use of the easy to use Google API to retrieve the books.
3. Dynamic search with various details like thumbnail, authors, title  etc displayed while searching.
4. Ability to change the status of the book from to-read, to currently reading or read.
5. Ability to rate the book using a rating meter.
6. We could add custom review for each book in our shelf. 
7. Another important feature is to create a reading group where you can add friends to your list.
8. Each time a friend reads a book and review it, you get an update in your dashboard with his review and other details of the book.
9. Similarly if you are on their friend list, they could see your reviews in their updates. 
10. Ability to monitor the progress of your reading and also able to finish it so that it could be taken out of the currently reading list. 

[Working Demo](https://bookshelf-app-frontend.onrender.com/)

### Instruction for setup

1. Clone the repo and run ``npm install``
2. From the app folder run ``npm start``

---

**Explanation of the code**

1. The search box in the My Bookshelf menu will pull books from the google books using google books api. 
2. Once you select the book, this book id is added to the books collection in mongodb, with blank ratings and review. The defualt shell value would be 0 which points to "to-read" section.
3. The collection of books would be shown in My Bookshelf and we can rate and change the shelve status from there.
4. We can also remove the books from our bookshelf from here. 
5. Once the shelve value is changed to currently reading, we can see the book in the dashboard. 
6. From the dashboard, we can update the details of progres such as current page number, review or if you've finished reading, it will be moved from this shelf to the "read" shelf.
7. A list of other users are displayed in the friends list and we can add them as friends.
8. Once we've added them as friends, we can see the books that they've reviewed in our dashboard under the 'Updates' section.
9. Login, logout options will authenticate users. 

