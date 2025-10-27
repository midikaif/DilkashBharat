if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server is listening on ${port}`);
});
