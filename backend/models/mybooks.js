const mongoose = require("mongoose");

const myBooksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Assuming 'User' is the name of the user model
    },
    id: { type: String, required: true },
    rating: { type: Number, required:false, default: 0 },
    shelves: { type: Number, required:false, default: 0 },
    review:{type:String, required:false,default:''},
    currentPage: {type:Number, required:false, default:0}
  },
  {
    timestamps: true,
  }
);

const MyBooks = mongoose.model("mybooks", myBooksSchema);

module.exports = MyBooks;
