function split_url() {
    const input = document.getElementById("url").value;
    const url_parts = document.getElementById("url_parts");

    try {
        const url = new URL(input);

        url_parts.innerHTML = `
            <p><strong>Hash:</strong> ${url.hash}</p>
            <p><strong>Host:</strong> ${url.host}</p>
            <p><strong>Hostname:</strong> ${url.hostname}</p>
            <p><strong>Href:</strong> ${url.href}</p>
            <p><strong>Origin:</strong> ${url.origin}</p>
            <p><strong>Pathname:</strong> ${url.pathname}</p>
            <p><strong>Protocol:</strong> ${url.protocol}</p>
            <p><strong>Search:</strong> ${url.search}</p>
        `;
    } catch (error) {
        url_parts.innerHTML = `<p style="color:red;">Invalid URL</p>`;
    }
}

function showNetworkInfo() {
    const url_parts = document.getElementById("url_parts");

    if (!navigator.connection) {
        url_parts.innerHTML += `<p style="color:orange;">Network Information API not supported in this browser.</p>`;
        return;
    }

    const connection = navigator.connection;

    url_parts.innerHTML += `
        <h3>Network Information</h3>
        <p><strong>Effective Type:</strong> ${connection.effectiveType}</p>
        <p><strong>Downlink:</strong> ${connection.downlink} Mb/s</p>
        <p><strong>RTT:</strong> ${connection.rtt} ms</p>
        <p><strong>Save Data:</strong> ${connection.saveData}</p>
    `;
}

if (navigator.connection) {
    navigator.connection.addEventListener("change", showNetworkInfo);
}


document.getElementById("submit_url_btn").addEventListener("click", (e) => {
    e.preventDefault();
    split_url()
    showNetworkInfo();
});
