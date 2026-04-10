let secretKey = "BananeProMaxed";
let btn = document.getElementById("submit_btn");

btn.addEventListener("click", (event) => {
    event.preventDefault(); 

    let student = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        grades: {
            backend: document.getElementById("backend").value,
            frontend: document.getElementById("frontend").value,
            design: document.getElementById("design").value
        },
        encryptedPassword: CryptoJS.AES.encrypt(
            document.getElementById("password").value,
            secretKey
        ).toString(),
    };

    student.decryptedPassword = CryptoJS.AES.decrypt(
        student.encryptedPassword,
        secretKey
    ).toString(CryptoJS.enc.Utf8);
    localStorage.setItem("Student", JSON.stringify(student));

    displayStudent(student);    
});

function displayStudent(student) {
    let div = document.getElementById("student-display");

    div.innerHTML = `
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Surname:</strong> ${student.surname}</p>
        <p><strong>Backend:</strong> ${student.grades.backend}</p>
        <p><strong>Frontend:</strong> ${student.grades.frontend}</p>
        <p><strong>Design:</strong> ${student.grades.design}</p>
        <p><strong>Encrypted Password:</strong> ${student.encryptedPassword}</p>
        <p><strong>Decrypted Password:</strong> ${student.decryptedPassword}</p>
    `;
}
