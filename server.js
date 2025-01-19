// server.js
const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, 'public'))); // Public papkasidagi fayllarga kirish imkoniyati beradi

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Asosiy sahifa
});

// 404 page
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});