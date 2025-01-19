let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = 1000;

// Telegram Web App bilan integratsiya
if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand();
    const user = tg.initDataUnsafe?.user;

    if (user) {
        document.getElementById("user-name").textContent = user.first_name;
        document.getElementById("user-avatar").src = user.photo_url || "https://via.placeholder.com/50";
    }
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

// Sahifalar o'zgartirish
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
}

// Statistikani yangilash
function updateStats() {
    document.getElementById("coins").textContent = coins;
    document.getElementById("energy-fill").style.width = `${energy / 10}%`;
    document.getElementById("energy-text").textContent = energy;
    localStorage.setItem("coins", coins);
}

// Har sekundda energiya oshirish
setInterval(() => {
    if (energy < 1000) {
        energy++;
        updateStats();
    }
}, 1000);

// Dastlabki statistikalarni yuklash
updateStats();