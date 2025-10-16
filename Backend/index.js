require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./model/UserModel");


const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// Allow credentials so browsers can send/receive cookies between frontend and backend
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Dashboard dev
      "http://localhost:5174", // Frontend dev
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

const verifyToken = (req, res, next) => {
  // Prefer Authorization header, fallback to cookie named 'token'
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

app.get("/addHoldings", verifyToken, async (req, res) => {
  const allHoldings = await HoldingsModel.find({ userId: req.userId }); // filter by logged-in user
  res.json(allHoldings);
});

// Compute current holdings from user's orders (buys and sells)
app.get('/computedHoldings', verifyToken, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId }).sort({ _id: 1 });

    const map = new Map();

    for (const o of orders) {
      const name = o.name;
      if (!map.has(name)) {
        map.set(name, {
          name,
          qty: 0,
          totalCost: 0, // total amount spent on existing shares
          lastPrice: 0,
        });
      }

      const entry = map.get(name);
      // treat BUY as adding shares, SELL as removing shares
      if (o.mode === 'BUY') {
        entry.totalCost += o.price * o.qty;
        entry.qty += o.qty;
        entry.lastPrice = o.price;
      } else if (o.mode === 'SELL') {
        // use average cost to reduce totalCost proportionally
        const avgPer = entry.qty > 0 ? entry.totalCost / entry.qty : 0;
        const qtyToRemove = Math.min(entry.qty, o.qty);
        entry.totalCost = Math.max(0, entry.totalCost - avgPer * qtyToRemove);
        entry.qty = entry.qty - qtyToRemove;
        entry.lastPrice = o.price;
      }

      map.set(name, entry);
    }

    // Build holdings array from map (only include positive qty)
    const holdings = Array.from(map.values())
      .filter((e) => e.qty > 0)
      .map((e) => ({
        name: e.name,
        qty: e.qty,
        avg: e.qty > 0 ? e.totalCost / e.qty : 0,
        price: e.lastPrice || 0,
      }));

    res.json(holdings);
  } catch (err) {
    console.error('Error computing holdings:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/addPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// Compute active positions for a user. Prefer PositionsModel entries if they exist (e.g., intraday positions),
// otherwise derive from orders by aggregating open (net) quantities per symbol.
app.get('/computedPositions', verifyToken, async (req, res) => {
  try {
    // Try to get from PositionsModel with userId (if stored)
    let pos = await PositionsModel.find({ userId: req.userId });

    if (!pos || pos.length === 0) {
      // Fallback: compute from orders (net qty) and treat non-zero net as open position
      const orders = await OrdersModel.find({ userId: req.userId }).sort({ _id: 1 });
      const map = new Map();
      for (const o of orders) {
        const name = o.name;
        if (!map.has(name)) map.set(name, { name, qty: 0, totalCost: 0, lastPrice: 0 });
        const e = map.get(name);
        if (o.mode === 'BUY') {
          e.qty += o.qty;
          e.totalCost += o.qty * o.price;
        } else if (o.mode === 'SELL') {
          const remove = Math.min(e.qty, o.qty);
          const avg = e.qty > 0 ? e.totalCost / e.qty : 0;
          e.totalCost = Math.max(0, e.totalCost - avg * remove);
          e.qty -= remove;
        }
        e.lastPrice = o.price;
        map.set(name, e);
      }

      pos = Array.from(map.values())
        .filter((e) => e.qty !== 0)
        .map((e) => ({
          product: 'CNC',
          name: e.name,
          qty: e.qty,
          avg: e.qty ? e.totalCost / e.qty : 0,
          price: e.lastPrice || 0,
          net: e.qty && e.avg ? ((e.lastPrice - e.avg) / e.avg * 100).toFixed(2) + '%' : '0%',
          day: '0.00%',
          isLoss: e.avg && e.lastPrice && e.lastPrice < e.avg,
        }));
    }

    // Compute header summary
    let totalExposure = 0;
    let unrealized = 0;
    let totalQty = 0;
    for (const p of pos) {
      totalExposure += p.price * Math.abs(p.qty);
      unrealized += (p.price - p.avg) * p.qty;
      totalQty += Math.abs(p.qty);
    }

    // Simple margin estimation: assume 20% margin requirement on exposure
    const marginUsed = totalExposure * 0.2;

    res.json({
      positions: pos,
      summary: {
        totalExposure,
        unrealized,
        marginUsed,
        totalQty,
      },
    });
  } catch (err) {
    console.error('Error computing positions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/newOrder", verifyToken, async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("UserID from token:", req.userId);

    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
      userId: req.userId,
    });

    await newOrder.save();
    console.log("Order saved successfully.");

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


app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) return res.status(400).send("User already exists");

  const newUser = new UserModel({ name, email, password }); 
  await newUser.save();

  res.send("User registered successfully");
});


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

    // Set token as an httpOnly cookie so it is available to the browser on subsequent requests
    // and not accessible to JS (recommended). Frontend should use credentials: 'include'.
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true if using HTTPS in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json("Internal Server Error");
  }
});

// Optional logout endpoint to clear cookie
app.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.json({ ok: true });
});

// Return basic user info from token
app.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select('_id name email');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});