require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { OneTimeKeyModel } = require("./model/OneTimeKeyModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174",
  "http://localhost:3000",
  "https://trading-app3.onrender.com",  //frontend
  "https://trading-appd.onrender.com"   // dashboard
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



app.use(bodyParser.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  let token = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) return res.status(401).json("Unauthorized");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json("Token is invalid");
  }
};

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) return res.status(400).send("User already exists");

  const newUser = new UserModel({ name, email, password});
  await newUser.save();

  res.send("User registered successfully");
});

const isProd = process.env.NODE_ENV === "production";

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json("Invalid credentials (email)");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials (password)");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    // Create a short-lived, single-use oneTimeKey so clients that cannot
    // accept cross-site cookies can exchange it server-side from the dashboard.
    const crypto = require('crypto');
    const oneTimeKey = crypto.randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    try {
      await OneTimeKeyModel.create({ key: oneTimeKey, userId: user._id, expiresAt });
    } catch (err) {
      console.error('Error creating oneTimeKey:', err);
    }

    // Also return the token and the oneTimeKey in the JSON body as a fallback
    return res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
      oneTimeKey,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// Exchange endpoint: accepts a oneTimeKey and, if valid, sets the httpOnly cookie
// and returns the user. This allows the dashboard (different origin) to request
// the backend to set the cookie after a redirect containing the oneTimeKey.
app.post('/auth/exchange', async (req, res) => {
  try {
    const key = req.body?.key || req.query?.key;
    if (!key) return res.status(400).json({ error: 'Missing oneTimeKey' });

    const otk = await OneTimeKeyModel.findOne({ key });
    if (!otk) return res.status(404).json({ error: 'Invalid key' });
    if (otk.used) return res.status(410).json({ error: 'Key already used' });
    if (otk.expiresAt < new Date()) return res.status(410).json({ error: 'Key expired' });

    const user = await UserModel.findById(otk.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Mark used
    otk.used = true;
    await otk.save();

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Exchange error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "None" : "Lax", });
  res.json({ ok: true });
});

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("_id name email");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/newOrder", verifyToken, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
      userId: req.userId,
    });

    await newOrder.save();
    res.send("Order saved!");
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/allOrders", verifyToken, async (req, res) => {
  try {
    const userOrders = await OrdersModel.find({ userId: req.userId });
    res.json(userOrders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/computedHoldings", verifyToken, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId }).sort({ _id: 1 });
    const map = new Map();

    for (const o of orders) {
      if (!map.has(o.name)) {
        map.set(o.name, { name: o.name, qty: 0, totalCost: 0, lastPrice: 0 });
      }

      const entry = map.get(o.name);

      if (o.mode === "BUY") {
        entry.qty += o.qty;
        entry.totalCost += o.price * o.qty;
        entry.lastPrice = o.price;
      } else if (o.mode === "SELL") {
        const avgPer = entry.qty > 0 ? entry.totalCost / entry.qty : 0;
        const qtyToRemove = Math.min(entry.qty, o.qty);

        entry.realizedProfit = (entry.realizedProfit || 0) + (o.price - avgPer) * qtyToRemove;
        entry.totalCost = Math.max(0, entry.totalCost - avgPer * qtyToRemove);
        entry.qty -= qtyToRemove;
      }
    }

    const holdings = Array.from(map.values())
    .filter((e) => e.qty > 0 || (e.realizedProfit && e.realizedProfit !== 0))
    .map((e) => ({
      name: e.name,
      qty: e.qty,
      avg: e.qty > 0 ? e.totalCost / e.qty : 0,
      price: e.lastPrice || 0,  
      curValue: e.qty * (e.lastPrice || 0),
      realizedProfit: e.realizedProfit || 0,
      unrealizedProfit: e.qty > 0 ? (e.lastPrice - e.totalCost / e.qty) * e.qty : 0
    }));


    res.json(holdings);
  } catch (err) {
    console.error("Error computing holdings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/computedPositions", verifyToken, async (req, res) => {
  try {
    let pos = await PositionsModel.find({ userId: req.userId });

    if (!pos || pos.length === 0) {
      const orders = await OrdersModel.find({ userId: req.userId }).sort({ _id: 1 });
      const map = new Map();

      for (const o of orders) {
        if (!map.has(o.name)) map.set(o.name, { name: o.name, qty: 0, totalCost: 0, lastPrice: 0 });

        const e = map.get(o.name);
        if (o.mode === "BUY") {
          e.qty += o.qty;
          e.totalCost += o.qty * o.price;
        } else if (o.mode === "SELL") {
          const remove = Math.min(e.qty, o.qty);
          const avg = e.qty > 0 ? e.totalCost / e.qty : 0;
          e.totalCost = Math.max(0, e.totalCost - avg * remove);
          e.qty -= remove;
        }
        e.lastPrice = o.price;
        map.set(o.name, e);
      }

      pos = Array.from(map.values())
        .filter((e) => e.qty !== 0)
        .map((e) => ({
          product: "CNC",
          name: e.name,
          qty: e.qty,
          avg: e.qty ? e.totalCost / e.qty : 0,
          price: e.lastPrice || 0,
          net: e.qty && e.avg ? ((e.lastPrice - e.avg) / e.avg * 100).toFixed(2) + "%" : "0%",
          day: "0.00%",
          isLoss: e.avg && e.lastPrice && e.lastPrice < e.avg,
        }));
    }

    let totalExposure = 0;
    let unrealized = 0;
    let totalQty = 0;

    for (const p of pos) {
      totalExposure += p.price * Math.abs(p.qty);
      unrealized += (p.price - p.avg) * p.qty;
      totalQty += Math.abs(p.qty);
    }

    const marginUsed = totalExposure * 0.2;

    res.json({
      positions: pos,
      summary: { totalExposure, unrealized, marginUsed, totalQty },
    });
  } catch (err) {
    console.error("Error computing positions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/addHoldings", verifyToken, async (req, res) => {
  const allHoldings = await HoldingsModel.find({ userId: req.userId });
  res.json(allHoldings);
});

app.get("/addPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri)
    .then(() => console.log("DB connected!"))
    .catch((err) => console.error("DB connection error:", err));
});
