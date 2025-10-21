let credits = parseInt(localStorage.getItem("credits")) || 0;
let keys = JSON.parse(localStorage.getItem("keys") || "[]");
let currentKey = "";

function save() {
  localStorage.setItem("credits", credits);
  localStorage.setItem("keys", JSON.stringify(keys));
}

function purchase(amount) {
  alert("Payment processed successfully!");
  credits += amount;
  save();
}

function redeem() {
  if (credits < 1) {
    alert("Not enough credits!");
    return;
  }
  credits--;
  currentKey = generateKey();
  keys.push(currentKey);
  save();
  document.getElementById("keyBox").innerText = "Your Key: " + currentKey;
  document.getElementById("keyBox").classList.remove("hidden");
  document.getElementById("copyBtn").classList.remove("hidden");
}

function generateKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const random = () => Array(4).fill().map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `BDL-${random()}-${random()}-${random()}`;
}

function copyKey() {
  navigator.clipboard.writeText(currentKey);
  alert("Key copied!");
}

window.onload = () => {
  if (document.getElementById("credits"))
    document.getElementById("credits").innerText = credits;
  if (document.getElementById("keyList"))
    document.getElementById("keyList").innerHTML = keys.map(k => `<li>${k}</li>`).join("");
};
