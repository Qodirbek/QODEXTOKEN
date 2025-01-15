let username = localStorage.getItem("username");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;

// Foydalanuvchiga random ism berish
function generateRandomUsername() {
    const randomNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas"];
    const randomNumber = Math.floor(Math.random() * 1000) + 1; // 1 dan 1000 gacha raqam
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    return randomName + randomNumber; // Ismga raqamni qo'shamiz
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

// Dastlabki holatni tekshirish
if (!username) {
    username = generateRandomUsername();
    localStorage.setItem("username", username);
    alert("Sizga random ism berildi: " + username);
} else {
    alert("Xush kelibsiz, " + username);
}

updateStats();