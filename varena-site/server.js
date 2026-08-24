import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, "public");
const pagesDir = path.join(__dirname, "pages");
const dataDir = path.join(__dirname, "data");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(publicDir));

// Home
app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
});

// Website pages
const pages = [
    "stay",
    "experiences",
    "dining",
    "maison",
    "membership",
    "journal"
];

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(pagesDir, `${page}.html`));
    });
});

// API — Rooms
app.get("/api/rooms", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Garden Room",
            price: 2400,
            currency: "MAD"
        },
        {
            id: 2,
            name: "Signature Suite",
            price: 5800,
            currency: "MAD"
        },
        {
            id: 3,
            name: "Private Residence",
            price: 14000,
            currency: "MAD"
        }
    ]);
});

// API — Products
app.get("/api/products", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Field Jacket",
            category: "Apparel",
            price: 2800
        },
        {
            id: 2,
            name: "Heavyweight Hoodie",
            category: "Apparel",
            price: 1500
        },
        {
            id: 3,
            name: "Performance Protein",
            category: "Nutrition",
            price: 280
        },
        {
            id: 4,
            name: "Signature No.01",
            category: "Drink",
            price: 65
        }
    ]);
});

// Booking
app.post("/api/bookings", (req, res) => {

    const booking = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
    };

    const file = path.join(dataDir, "db.json");

    let database = {
        bookings: [],
        orders: [],
        memberships: []
    };

    if (fs.existsSync(file)) {
        database = JSON.parse(fs.readFileSync(file, "utf8"));
    }

    database.bookings.push(booking);

    fs.writeFileSync(
        file,
        JSON.stringify(database, null, 2)
    );

    res.json({
        success: true,
        booking
    });
});

// Membership
app.post("/api/membership", (req, res) => {

    const membership = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
    };

    const file = path.join(dataDir, "db.json");

    let database = {
        bookings: [],
        orders: [],
        memberships: []
    };

    if (fs.existsSync(file)) {
        database = JSON.parse(fs.readFileSync(file, "utf8"));
    }

    database.memberships.push(membership);

    fs.writeFileSync(
        file,
        JSON.stringify(database, null, 2)
    );

    res.json({
        success: true,
        membership
    });
});

// Orders
app.post("/api/orders", (req, res) => {

    const order = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
    };

    const file = path.join(dataDir, "db.json");

    let database = {
        bookings: [],
        orders: [],
        memberships: []
    };

    if (fs.existsSync(file)) {
        database = JSON.parse(fs.readFileSync(file, "utf8"));
    }

    database.orders.push(order);

    fs.writeFileSync(
        file,
        JSON.stringify(database, null, 2)
    );

    res.json({
        success: true,
        order
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`VARENA running at http://localhost:${PORT}`);
});