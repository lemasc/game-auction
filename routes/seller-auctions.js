const express = require("express");
const router = express.Router();
const games = require("../data/games");
const auctions = require("../data/auctions");

router.get("/auctions", (req, res) => {
  // Filter auctions by the logged-in seller (userId)
  const userAuctions = auctions.filter(
    (auction) => auction.userId === req.session.userId
  );

  res.render("pages/seller-auctions", {
    title: "My Auctions",
    auctions: userAuctions,
    games, // Pass games list for creating auctions
  });
});

router.post("/auctions/create", (req, res) => {
  const { gameId, amount } = req.body;

  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  // Validation
  if (!gameId || !amount) {
    return res
      .status(400)
      .json({ success: false, message: "Game and amount are required." });
  }

  const game = games.find((g) => g.slug === gameId);
  if (!game) {
    return res.status(404).json({ success: false, message: "Game not found." });
  }

  // prevent duplicate auctions for the same game
  const existingAuction = auctions.find(
    (auction) =>
      auction.gameId === gameId && auction.userId === req.session.userId
  );
  if (existingAuction) {
    return res.status(400).json({
      success: false,
      message: "Auction for this game already exists.",
    });
  }

  const newAuction = {
    id: Date.now().toString(), // Unique ID for auction
    gameId,
    userId: req.session.userId,
    amount: parseFloat(amount),
    dateTime: new Date().toISOString(),
  };

  auctions.push(newAuction);
  res.json({
    success: true,
    message: "Auction created successfully.",
    auction: newAuction,
  });
});

router.post("/auctions/delete", (req, res) => {
  const { id } = req.body;

  // Validation
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Auction ID is required." });
  }

  const auctionIndex = auctions.findIndex(
    (auction) => auction.id === id && auction.userId === req.session.userId
  );
  if (auctionIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Auction not found or not authorized to delete.",
    });
  }

  const deletedAuction = auctions.splice(auctionIndex, 1)[0];
  const game = games.find((g) => g.slug === deletedAuction.gameId) ?? {
    title: "Game",
  };
  res.json({
    success: true,
    message: `Auction for "${game.title}" deleted successfully.`,
  });
});

module.exports = router;
