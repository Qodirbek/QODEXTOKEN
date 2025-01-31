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

    // Coin effect
    const coinEffect = document.getElementById("coin-effect");
    coinEffect.style.opacity = 1;
    coinEffect.style.animation = "none";
    void coinEffect.offsetHeight; // Trigger reflow
    coinEffect.style.animation = null;
}

// Sahifani ochish
function navigateTo(page) {
    if (page === "earn") {
        alert("Referal: https://mygame.com?ref=" + document.getElementById("user-name").textContent);
    } else if (page === "upgrade") {
        alert("Kuchaytirish imkoniyatlari mavjud!");
    } else if (page === "rating") {
        alert(`Sizning reytingingiz: ${coins}`);
    }
}

// Tugma bosilganda animatsiya
document.querySelectorAll('footer button').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = "scale(1.1)";
        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 300);
    });
});