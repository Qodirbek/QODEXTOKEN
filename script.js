let username = localStorage.getItem("username");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;
let rank = 1; // Reytingni boshlang'ich o'rni
let avatar = ""; // Telegram avatar URL

// Telegram Web App API bilan integratsiya
if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Fullscreen rejimini faollashtirish
    tg.expand();

    // Foydalanuvchi ma'lumotlarini olish
    const user = tg.initDataUnsafe?.user;

    // Telegramdan foydalanuvchi ma'lumotlarini olish
    if (user) {
        username = user.first_name;
        avatar = user.photo_url || 'https://raw.githubusercontent.com/Qodirbek/QODEXTOKEN/main/default-avatar.png';
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
    } else {
        if (!username) {
            username = "Guest";
            localStorage.setItem("username", username);
        }
    }
}

// Statistika yangilash
function updateStats() {
    document.getElementById("coins").textContent = coins;
    document.getElementById("energy").textContent = energy;
    localStorage.setItem("coins", coins);
    localStorage.setItem("energy", energy);
}

// Tuxum bosilganda
function clickEgg() {
    if (energy > 0) {
        coins++;
        energy--;
        updateStats();
    } else {
        alert("Energiya tugadi!");
    }
}

// Sahifalarni ko'rsatish
function showPage(page) {
    document.querySelectorAll(".page").forEach(el => el.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
}

// Reytingni yangilash
function updateLeaderboard() {
    document.getElementById("user-name").textContent = username;
    document.getElementById("user-coins").textContent = coins;
    document.getElementById("user-rank").textContent = rank;
    document.getElementById("user-avatar").src = avatar;
}

updateStats();
updateLeaderboard();

// Har 1 sekundda energiyani oshirish va tanga yangilash
setInterval(() => {
    energy++; // Energiyani 1 tadan oshirish
    updateStats();
}, 1000);