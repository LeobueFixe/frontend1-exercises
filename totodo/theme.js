const body = document.body;
const checkbox = document.getElementById("checkboxInput");

checkbox.addEventListener("change", toggleTheme);

function toggleTheme() {
  body.classList.toggle("dark");
}
