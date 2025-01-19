let coins = parseInt(localStorage.getItem("coins")) || 0;

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
    coins++;
    document.getElementById("message").textContent = `Tuxumni bosganingiz uchun sizda ${coins} tanga bor!`;
    localStorage.setItem("coins", coins);
}

// Sahifani ochish
function navigateTo(page) {
    if (page === "earn") {
        alert("Referal: https://mygame.com?ref=" + user.first_name);
    } else if (page === "upgrade") {
        alert("Kuchaytirish imkoniyatlari mavjud!");
    } else if (page === "rating") {
        alert("Sizning reytingingiz: " + coins);
    }
}