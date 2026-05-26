import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running on port :", `${process.env.PORT}`);
    });
  })
  .catch((error) => {
    // DELETE THE EXTRA MSG WHEN READY TO BUILD
    console.log(
      "failed to establish connection with MONGO_database, msg from src/index.js",
      error,
    );
  });
