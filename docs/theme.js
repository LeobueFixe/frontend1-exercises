const body = document.body;
const checkbox = document.getElementById("checkboxInput");

checkbox.addEventListener("change", toggleTheme);

function toggleTheme() {
  body.classList.toggle("dark");

  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  checkbox.checked = true; 
}

