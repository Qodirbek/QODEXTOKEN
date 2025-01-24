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

    const egg = document.getElementById("egg");
    egg.style.boxShadow = "0 0 20px 10px rgba(255, 255, 0, 0.8)";

    setTimeout(() => {
        egg.style.boxShadow = "none";
    }, 300);
}

// Tugmalarni bosish
function navigateTo(page) {
    if (page === "earn") {
        alert("Referal: https://mygame.com?ref=" + coins);
    } else if (page === "upgrade") {
        alert("Kuchaytirish imkoniyatlari mavjud!");
    } else if (page === "rating") {
        alert("Sizning reytingingiz: " + coins);
    }
}

// Foydalanuvchi profiliga bosilganda
function openProfile() {
    alert("Foydalanuvchi profiliga tashrif buyurish.");
}