async function loadBreeds() {
    const select = document.getElementById("breed_selector");
    const API_URL = "https://dog.ceo/api/breeds/list/all";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        select.innerHTML = "";

        const breeds = Object.keys(data.message);

        breeds.forEach(breed => {
            const option = document.createElement("option");
            option.value = breed;
            option.textContent = breed;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading breeds:", error);
    }
}

async function getDog() {
    try {
        const breed = document.getElementById("breed_selector").value;
        const img = document.getElementById("img");
        const API_URL = `https://dog.ceo/api/breed/${breed}/images/random`;

        fetch(API_URL)
        .then(r => r.json())
        .then(data => img.src = data.message);

        img.src = data.message;

    } catch (error) {
        console.error("Error fetching dog image:", error);
    }
}

document.getElementById("submit_btn").addEventListener("click", (e) => {
    e.preventDefault();
    getDog();
});

loadBreeds();
