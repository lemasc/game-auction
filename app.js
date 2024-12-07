/**
 * Main application file.
 */

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const sellerGameRoutes = require("./routes/seller-games");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(authRoutes);
app.use("/seller", sellerGameRoutes);

app.get("/", (req, res) => {
  res.render("pages/home", { title: "Home" });
});
app.get("/products/:id", (req, res) => {
  res.render("pages/product-view", { title: "Home" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
