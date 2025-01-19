const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Home sahifasi
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Portni tanlash
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ishlamoqda, port: ${PORT}`);
});