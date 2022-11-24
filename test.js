function getUsername() {
    fetch("https://webhelprequest.deta.dev/users")
        .then(response => response.json())
        .then(data => console.log(data))
}
console.log(getUsername())

function getTickets() {
    fetch("https://webhelprequest.deta.dev/tickets")
        .then(response => response.json())
        .then(data => console.log(data))
}
console.log(getTickets());

function disableTickets() {
    fetch("https://webhelprequest.deta.dev/tickets/1")
        .then(response => response.json())
        .then(data => console.log(data))
}
console.log(disableTickets());