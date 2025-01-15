// Random names from a pool of American names
const randomNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", 
    "William", "Elizabeth", "David", "Susan", "Joseph", "Jessica", "Charles", 
    "Sarah", "Thomas", "Karen", "Christopher", "Nancy", "Daniel", "Betty", 
    "Matthew", "Helen", "Anthony", "Sandra", "Donald", "Ashley", "Mark", 
    "Dorothy", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Rachel", 
    "Joshua", "Deborah", "Kenneth", "Sharon", "Kevin", "Michelle", "Brian", 
    "Laura", "George", "Lisa", "Timothy", "Carol", "Ryan", "Betty", "Gregory"
];

let username = localStorage.getItem("username");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;
let referralLink = `https://yourwebsite.com/referral/${generateRandomUsername()}`;

// Show page based on clicked button
function showPage(page) {
    document.querySelectorAll(".page").forEach(el => el.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
}

// Show profile modal to change name
function showProfileModal() {
    if (!username) {
        document.getElementById("username-modal").classList.remove("hidden");
    } else {
        document.getElementById("profile-modal").classList.remove("hidden");
        document.getElementById("user-id").textContent = username;
    }
}

// Close profile modal
function closeProfileModal() {
    document.getElementById("username-modal").classList.add("hidden");
    document.getElementById("profile-modal").classList.add("hidden");
}

// Generate random username
function generateRandomUsername() {
    return randomNames[Math.floor(Math.random() * randomNames.length)];
}

// Save username
function saveUsername() {
    const input = document.getElementById("username-input").value.trim();
    if (input) {
        username = input;
        localStorage.setItem("username", username);
        closeProfileModal();
        alert("Your name has been saved!");
    } else {
        alert("Please enter a valid name!");
    }
}

// Update stats (coins, energy)
function updateStats() {
    document.getElementById("coins").textContent = "Coins: " + coins;
    document.getElementById("energy").textContent = "Energy: " + energy;
    localStorage.setItem("coins", coins);
    localStorage.setItem("energy", energy);
}

// Click egg and earn coins and reduce energy
function clickEgg() {
    if (energy > 0) {
        coins++;
        energy--;
        updateStats();
    } else {
        alert("Not enough energy!");
    }
}

// Referral link generation
function generateReferralLink() {
    document.getElementById("referral-link").textContent = referralLink;
}

// Upgrade click functionality
function upgradeClick() {
    if (coins >= 3500) {
        coins -= 3500;
        alert("Click upgraded!");
        updateStats();
    } else {
        alert("Not enough coins for upgrade!");
    }
}

// Upgrade energy functionality
function upgradeEnergy() {
    if (coins >= 3500) {
        coins -= 3500;
        energy += 500;
        alert("Energy upgraded!");
        updateStats();
    } else {
        alert("Not enough coins for upgrade!");
    }
}

// Ranking function (for demonstration purposes)
function showRanking() {
    let rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = `
        <li>1. User1 - 5000 Coins</li>
        <li>2. User2 - 4000 Coins</li>
        <li>3. User3 - 3000 Coins</li>
    `;
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
    if (!username) {
        username = generateRandomUsername();
        localStorage.setItem("username", username);
    }
    document.getElementById("user-id").textContent = username;
    generateReferralLink();
    updateStats();
    showPage("home");  // Show Home page by default
});