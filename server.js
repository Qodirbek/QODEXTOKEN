const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/telegram-user', async (req, res) => {
    const { userId, username } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
    }

    try {
        const response = await axios.get(`https://api.telegram.org/bot8164935831:AAEhJMW7D6YdcmPapiNcduwXXdFcknURRus/getUserProfilePhotos`, {
            params: { user_id: userId },
        });

        const photoUrl =
            response.data.result.photos.length > 0
                ? `https://api.telegram.org/file/bot8164935831:AAEhJMW7D6YdcmPapiNcduwXXdFcknURRus/${response.data.result.photos[0][0].file_path}`
                : 'https://raw.githubusercontent.com/Qodirbek/QODEXTOKEN/main/default.png';

        res.json({ username, photoUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user photo' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});