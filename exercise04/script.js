async function getProducts() {
    try {
        const amount = document.getElementById("amount").value;
        const API_URL = `https://jsonplaceholder.typicode.com/posts?_limit=${amount}`;

        const response = await fetch(API_URL);
        const data = await response.json();

        const productList = document.getElementById("product-list");
        productList.innerHTML = "";

        data.forEach(post => {
            const item = document.createElement("ul");
            item.classList.add("product-title");
            item.textContent = post.title;
            productList.appendChild(item);
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

document.getElementById("submit_btn").addEventListener("click", (e) => {
    e.preventDefault();
    getProducts();
});
