/**
 * Main application file.
 */

const express = require("express");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const sellerGameRoutes = require("./routes/seller-games");
const sellerAuctionsRoutes = require("./routes/seller-auctions");
const games = require("./data/games");
const auctions = require("./data/auctions");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configure session middleware
app.use(
  session({
    secret: "yeahthisissecrethardcode", // A secret key for signing the session ID cookie
    resave: false, // Avoid resaving session if nothing changed
    saveUninitialized: false, // Only save sessions that are initialized
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hour session duration
      httpOnly: true, // Prevent client-side JS from accessing cookies
      secure: false, // Use 'true' if the site is served over HTTPS
    },
  })
);

// Middleware to populate req.session
app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = null; // Example: Initialize userId if not set
  }
  next();
});

app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  next();
});

app.use(authRoutes);
app.use("/seller", sellerGameRoutes);
app.use("/seller", sellerAuctionsRoutes);

app.get("/", (req, res) => {
  res.render("pages/product-list", { title: "Games", games });
});
app.get("/products/:id", (req, res) => {
  const game = games.find((game) => game.slug === req.params.id);
  if (!game) {
    return res.status(404).send("Game not found");
  }
  const gameAuction = auctions
    .filter((auction) => auction.gameId === game.slug)
    .sort((a, b) => b.currentBid - a.currentBid);
  res.render("pages/product-view", {
    title: game.title,
    game,
    auctions: gameAuction,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
