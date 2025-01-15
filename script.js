let username = localStorage.getItem("username");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;

// Foydalanuvchi ismini saqlash
function saveUsername() {
    const input = document.getElementById("username-input").value.trim();
    if (input) {
        username = input;
        localStorage.setItem("username", username);
        document.getElementById("username-modal").classList.add("hidden");
        alert("Ismingiz saqlandi: " + username);
    } else {
        alert("Ism kiritilmadi! Iltimos, ismingizni kiriting.");
    }
}

// Profil oynasini yopish (Orqaga)
function closeProfileModal() {
    document.getElementById("username-modal").classList.add("hidden");
}

// Profil oynasini ko'rsatish
function showProfileModal() {
    if (!username) {
        document.getElementById("username-modal").classList.remove("hidden");
    } else {
        alert("Sizning ismingiz: " + username);
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

// Dastlabki holatni tekshirish
if (!username) {
    showProfileModal();
} else {
    alert("Xush kelibsiz, " + username);
    updateStats();
}