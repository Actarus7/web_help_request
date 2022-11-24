function test() {
    fetch("https://webhelprequest.deta.dev/")
        .then(async(response) => response.json())
        .then(json => console.log(json))
}
console.log(test());