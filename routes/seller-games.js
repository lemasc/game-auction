const express = require("express");
const router = express.Router();
const games = require("../data/games");

/**
 * GET /games - Render the game list page
 */
router.get("/games", (req, res) => {
  res.render("pages/seller-gameList", {
    title: "Game List",
    games,
  });
});

/**
 * POST /games - Add a new game
 */
router.post("/games", (req, res) => {
  const { slug, title, description, imageUrl } = req.body;

  if (!slug || !title || !imageUrl) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }

  const existingGame = games.find((game) => game.title === title);
  if (existingGame) {
    return res
      .status(400)
      .json({ success: false, message: "Game already exists!" });
  }

  // Add the new game
  games.push({ slug, title, description, imageUrl });
  return res.json({ success: true, message: "Game added successfully!" });
});

router.post("/games/edit", (req, res) => {
  const { slug, title, description, imageUrl } = req.body;

  // Validate required fields
  if (!slug || !title || !imageUrl) {
    return res.status(400).json({
      success: false,
      message: "Title, image URL, and slug are required.",
    });
  }

  // Find the game by slug
  const game = games.find((g) => g.slug === slug);
  if (!game) {
    return res.status(404).json({ success: false, message: "Game not found." });
  }

  // Update the game
  game.title = title;
  game.description = description || ""; // Optional field
  game.imageUrl = imageUrl;

  res.json({ success: true, message: "Game updated successfully.", game });
});

router.post("/games/delete", (req, res) => {
  const { slug } = req.body;

  // Validate slug
  if (!slug) {
    return res
      .status(400)
      .json({ success: false, message: "Slug is required to delete a game." });
  }

  // Find the index of the game
  const gameIndex = games.findIndex((g) => g.slug === slug);
  if (gameIndex === -1) {
    return res.status(404).json({ success: false, message: "Game not found." });
  }

  // Remove the game from the array
  const deletedGame = games.splice(gameIndex, 1)[0];

  res.json({
    success: true,
    message: `Game "${deletedGame.title}" deleted successfully.`,
    game: deletedGame,
  });
});

module.exports = router;
