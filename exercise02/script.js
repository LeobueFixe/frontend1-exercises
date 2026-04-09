function save() {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;

    localStorage.setItem("name", name);
    localStorage.setItem("surname", surname);
}

const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}
