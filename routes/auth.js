const jwt = require("jsonwebtoken");
const express = require("express");
const { User } = require("../database");
const router = express.Router();
const { z } = require("zod");
const { SECRETKEY, authenticateJWT } = require("../middleware");

const inputsProp = z.object({
  username: z.string().email(),
  password: z.string().min(6).max(14),
});

router.post("/signup", async (req, res) => {
  const parseInput = inputsProp.safeParse(req.body);
  if (!parseInput.success) {
    return res.json({ msg: parseInput.error });
  }

  const user = await User.findOne({ username });
  if (user) {
    return res.status(403).json({ message: "User already exists" });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  const token = jwt.sign(
    { username: newUser.username, id: newUser._id },
    SECRETKEY,
    { expiresIn: "1h" }
  );
  return res.json({ message: "User registered successfully", token });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    const token = jwt.sign(
      { username: user.username, id: user._id },
      SECRETKEY,
      { expiresIn: "1h" }
    );
    return res.json({ message: "Login successfully", token });
  }
  return res.status(403).json({ message: "Invalid username or password" });
});

router.get("/me", authenticateJWT, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (user) {
    return res.json({ user });
  }
});

module.exports = router;
