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
        document.getElementById("coins").textContent = coins;
        document.getElementById("energy-fill").style.width = `${energy / 10}%`;
        document.getElementById("energy-text").textContent = energy;
        localStorage.setItem("coins", coins);
    } else {
        alert("Energiya tugadi!");
    }
}

// Navigatsiya
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');

    if (page === 'earn') {
        const referralLink = `https://mygame.com?ref=${document.getElementById("user-name").textContent}`;
        document.getElementById("referral-link").value = referralLink;
    }

    if (page === 'rating') {
        const ratingList = document.getElementById("rating-list");
        ratingList.innerHTML = `<p>${document.getElementById("user-name").textContent}: ${coins} tanga</p>`;
    }
}