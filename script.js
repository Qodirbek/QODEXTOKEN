let username = localStorage.getItem("username");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;
let rank = 1; // Reytingni boshlang'ich o'rni

// Telegram Web App API bilan integratsiya
if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Fullscreen rejimini faollashtirish
    tg.expand();

    // Foydalanuvchi ma'lumotlarini olish
    const user = tg.initDataUnsafe?.user;

    // Telegramdan foydalanuvchi ma'lumotlarini olish
    if (user) {
        username = user.username || user.first_name; // Foydalanuvchi nomi
        localStorage.setItem("username", username);
        alert(`Xush kelibsiz, ${username}!`);
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

// Profil tugmasi bosilganda foydalanuvchi ismini ko'rsatish
function showProfileModal() {
    alert("Sizning ismingiz: " + username);
}

// Foydalanuvchining reytingini yangilash
function updateLeaderboard() {
    document.getElementById("user-name").textContent = username;
    document.getElementById("user-coins").textContent = coins;
    document.getElementById("user-rank").textContent = rank;
}

// Dastlabki holatni tekshirish
if (!username) {
    username = "Guest";
    localStorage.setItem("username", username);
    alert("Sizga random ism berildi: " + username);
} else {
    alert("Xush kelibsiz, " + username);
}

updateStats();

// Har 1 sekundda energiyani oshirish va tanga yangilash
setInterval(() => {
    energy++; // Energiyani 1 tadan oshirish
    updateStats();
}, 1000);

// Foydalanuvchi reytingini yangilash
updateLeaderboard();