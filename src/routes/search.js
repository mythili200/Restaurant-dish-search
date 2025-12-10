const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
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

router.get("/dishes", async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;

    if (!name || !minPrice || !maxPrice) {
      return res.status(400).json({
        error: "Missing required parameters: name, minPrice, maxPrice",
      });
    }

    const [rows] = await pool.query(
      `SELECT 
         r.id AS restaurantId,
         r.name AS restaurantName,
         r.city,
         m.dish_name AS dishName,
         m.price AS dishPrice,
         COUNT(o.id) AS orderCount
       FROM menu_items m
       JOIN restaurants r ON r.id = m.restaurant_id
       LEFT JOIN orders o ON o.menu_item_id = m.id
       WHERE m.dish_name LIKE ?
         AND m.price BETWEEN ? AND ?
       GROUP BY r.id, m.id
       ORDER BY orderCount DESC
       LIMIT 10`,
      [`%${name}%`, Number(minPrice), Number(maxPrice)]
    );

    res.json({ restaurants: rows });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
