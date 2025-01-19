let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;

// Telegram Web App API bilan integratsiya
if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Fullscreen rejimini yoqish
    tg.expand();

    // Foydalanuvchi ma'lumotlarini olish
    const user = tg.initDataUnsafe?.user;

    if (user) {
        document.getElementById("user-name").textContent = user.first_name;
        document.getElementById("user-image").src = user.photo_url;
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
    document.querySelectorAll("#game-container > section").forEach(el => el.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
}

// Dastlabki sozlamalar
updateStats();