const express = require("express");
const router = express.Router();

const users = []; // In-memory storage for user data

/**
 * GET /register - Render registration page
 */
router.get("/register", (req, res) => {
  res.render("pages/register", { title: "Register", error: null });
});

/**
 * POST /register - Handle user registration
 */
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("pages/register", {
      title: "Register",
      error: "Both fields are required!",
    });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.render("pages/register", {
      title: "Register",
      error: "Username is already taken!",
    });
  }

  users.push({ username, password });
  res.redirect("/login");
});

/**
 * GET /login - Render login page
 */
router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login", error: null });
});

/**
 * POST /login - Handle user login
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("pages/login", {
      title: "Login",
      error: "Both fields are required!",
    });
  }

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.render("pages/login", {
      title: "Login",
      error: "Invalid username or password!",
    });
  }

  // Set user session in cookies
  res.cookie("session", { username }, { httpOnly: true, maxAge: 3600000 }); // 1-hour expiry
  res.redirect("/dashboard");
});

/**
 * GET /dashboard - Render dashboard for logged-in user
 */
router.get("/dashboard", (req, res) => {
  const session = req.cookies.session;

  if (!session || !session.username) {
    return res.redirect("/login");
  }

  res.send(`<h1>Welcome, ${session.username}!</h1>
            <a href="/logout">Logout</a>`);
});

/**
 * GET /logout - Clear session and redirect to login
 */
router.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

module.exports = router;
