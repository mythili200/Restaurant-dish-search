const express = require("express");
require("dotenv").config();
const pool = require("./db");

const app = express();
app.use(express.json());

const searchRoutes = require("./routes/search");
app.use("/search", searchRoutes);
app.get("/", async (req, res) => {
  try {
    const [dishes] = await pool.query(
      `SELECT 
          m.id,
          m.dish_name AS dishName,
          m.price,
          r.name AS restaurantName,
          r.city
       FROM menu_items m
       JOIN restaurants r ON r.id = m.restaurant_id`
    );

    res.json({
      message: "Welcome to the Restaurant Search API!",
      howToUse: {
        description:
          "You can search any dish using the /search/dishes route. The following three query parameters are mandatory:",
        requiredParams: {
          name: "Dish name (example: anything like 'Biryani', 'Chicken', 'Veg')",
          minPrice: "Minimum price (number)",
          maxPrice: "Maximum price (number)",
        },
        sampleFormat:
          "/search/dishes?name=<dish>&minPrice=<min>&maxPrice=<max>",
      },
      totalDishes: dishes.length,
      allDishes: dishes,
    });
  } catch (err) {
    console.error("Error loading dishes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/checkdb", async (req, res) => {
  const [rows] = await pool.query("SELECT DATABASE()");
  res.json(rows);
});
