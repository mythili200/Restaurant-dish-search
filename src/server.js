const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const searchRoutes = require("./routes/search");
app.use("/search", searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
