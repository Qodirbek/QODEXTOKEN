let username = localStorage.getItem("username");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;
let rank = 1; // Reytingni boshlang'ich o'rni

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

// Dastlabki holatni tekshirish
if (!username) {
    username = "Guest"; // Yangi foydalanuvchi ismni belgilang
    localStorage.setItem("username", username);
} else {
    alert("Xush kelibsiz, " + username);
}

updateStats();

// Har 1 sekundda energiyani oshirish va tanga yangilash
setInterval(() => {
    energy++; // Energiyani 1 tadan oshirish
    updateStats();
}, 1000);