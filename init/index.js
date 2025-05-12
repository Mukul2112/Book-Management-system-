const mongoose = require("mongoose");


const initData = require("./data.js");
const Listing = require("../models/bookslisting.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/books";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}



const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData);
  console.log("data was initialized");
};

initDB();