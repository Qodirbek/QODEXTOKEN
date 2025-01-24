let coins = parseInt(localStorage.getItem("coins")) || 0;

// Telegram integratsiyasi
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
    document.getElementById("coins").textContent = coins;
    localStorage.setItem("coins", coins);

    // Tanga atrofiga nur effekti qo‘shish
    const egg = document.getElementById("egg");
    egg.style.boxShadow = "0 0 20px yellow";
    setTimeout(() => {
        egg.style.boxShadow = "none";
    }, 300);
}

// Reyting sahifasini o‘chirish
function clearRating() {
    alert("Reyting sahifasi o‘chirildi!");
}

// Sahifani ochish
function navigateTo(page) {
    alert(`${page} sahifasiga o'tildi!`);
}