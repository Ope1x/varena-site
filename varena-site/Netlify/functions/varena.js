import express from "express";
import serverless from "serverless-http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/rooms", (req, res) => {
  res.json([
    { id: 1, name: "Garden Room", price: 2400, currency: "MAD" },
    { id: 2, name: "Signature Suite", price: 5800, currency: "MAD" },
    { id: 3, name: "Private Residence", price: 14000, currency: "MAD" }
  ]);
});

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Field Jacket", category: "Apparel", price: 2800 },
    { id: 2, name: "Heavyweight Hoodie", category: "Apparel", price: 1500 },
    { id: 3, name: "Performance Protein", category: "Nutrition", price: 280 },
    { id: 4, name: "Signature No.01", category: "Drink", price: 65 }
  ]);
});

app.post("/api/bookings", (req, res) => {
  res.json({
    success: true,
    booking: {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    }
  });
});

app.post("/api/membership", (req, res) => {
  res.json({
    success: true,
    membership: {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    }
  });
});

app.post("/api/orders", (req, res) => {
  res.json({
    success: true,
    order: {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    }
  });
});

export const handler = serverless(app);