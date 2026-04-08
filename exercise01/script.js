const obj = { name: "Dinis", surname: "Santos", age: 20, email: "dinis_santos@eticalarve.com"}
const jsToJson = JSON.stringify(obj, null, 2);

const jsonToJs = JSON.parse(jsToJson)
console.log(jsToJson, jsonToJs)

let data = fetch("data.json")
    .then(response => response.json())
    .then(data => {console.log(data)})