function printUserInfos(url) {
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            arrayData = data.data,//console.log(arrayData)})//
            postTicket(arrayData)})      
}
(printUserInfos("https://webhelprequest.deta.dev/users"))

function postTicket(tableau) {
    const formData = {
        subject : "Test 42",
        userId : tableau[0].key,
    };
    const userName = tableau[0].username;
    fetch("https://webhelprequest.deta.dev/tickets", {
        "method": "POST",
        "body": new URLSearchParams(formData),
        "headers": {"Content-Type": "application/x-www-form-urlencoded"}})
    fetch("https://webhelprequest.deta.dev/tickets")
        .then(response => response.json())
        .then(data => console.log(data))
        createElements(formData.subject, userName)
    }
    /* .then(response => response.json())
        .then(data => console.log(data)) */

function createElements(sujet, userName) {
    const tableau = document.getElementById("tableauId");
    const tr = document.createElement("tr");
    tr.setAttribute("id", "ticketId");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    tableau.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td1.textContent = 58;
    td2.textContent = userName;
    td3.textContent = sujet;
}









/* function getTickets() {
    fetch("https://webhelprequest.deta.dev/tickets")
        .then(response => response.json())
        .then(data => console.log(data))
} */
//console.log(getTickets());


/* const formData = {
    username : "jay",
    password : "test"
}
function addUser() {
    fetch("https://webhelprequest.deta.dev/users", {
        "method": "POST",
        "body": new URLSearchParams(formData),
        "headers": {"Content-Type": "application/x-www-form-urlencoded"}
    })
    .then(response => response.json())
        .then(data => console.log(data))
}
addUser()
 */

/* const formData = {
    subject : "Au Secours !!!",
    userId : "dgbsdfsdfbsdfbs",
}
function addTickets() {
    fetch("https://webhelprequest.deta.dev/tickets", {
        "method": "POST",
        "body": new URLSearchParams(formData),
        "headers": {"Content-Type": "application/x-www-form-urlencoded"}
    })
    .then(response => response.json())
        .then(data => console.log(data))
}
addTickets()
 */



/* 
function disableTickets() {
    fetch("https://webhelprequest.deta.dev/tickets/1")
        .then(response => response.json())
        .then(data => console.log(data))
}
console.log(disableTickets()); */