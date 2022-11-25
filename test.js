function printUserInfos(url) {
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            arrayData = data.data,//console.log(arrayData)})//
                postTicket(arrayData) //tableau avec userId et name
        })
}

function postTicket(tableauUsers) {
    ;
    /* const formData = {
        subject: "Test 50", //récupérer l'input à partir de l'eventListener
        userId: tableauUsers[0].key, //id correspondant à l'eventListener du clic - faire le lien entre le name et le userId
    };
    fetch("https://webhelprequest.deta.dev/tickets", {
        "method": "POST",
        "body": new URLSearchParams(formData),
        "headers": { "Content-Type": "application/x-www-form-urlencoded" }
    }) */
    fetch("https://webhelprequest.deta.dev/tickets")
        .then(response => response.json())
        .then(function (data) {
            ticketsData = data.data, //tableau avec sujet (subject) et userId (users_id)
                //console.log(ticketsData, tableauUsers),
                regroupInfos(ticketsData, tableauUsers)})

}
function regroupInfos(ticketsData, tableauUsers) {
    for (let i = 0; i < ticketsData.length; i++) {
        if (ticketsData[i].users_id === tableauUsers[0].key) {
            Object.assign(ticketsData[i], { username: tableauUsers[0].username })
        }
        else if (ticketsData[i].users_id === tableauUsers[1].key) {
            Object.assign(ticketsData[i], { username: tableauUsers[1].username })
        }
        else if (ticketsData[i].users_id === tableauUsers[2].key) {
            Object.assign(ticketsData[i], { username: tableauUsers[2].username })
        }
        else if (ticketsData[i].users_id === tableauUsers[3].key) {
            Object.assign(ticketsData[i], { username: tableauUsers[3].username })
        }
        else {
            Object.assign(ticketsData[i], { username: tableauUsers[4].username })
        }
    }
    createElements(ticketsData);
    console.log(ticketsData);
    /* disableTickets();
    console.log(ticketsData); */
}

function createElements(ticketsData) {
    for (let i = 0; i < ticketsData.length; i++) {
        const tableau = document.getElementById("tBod");
        const newLigne = document.createElement("tr");
        const tdIdTicket = document.createElement("td");
        const tdName = document.createElement("td");
        const tdDescription = document.createElement("td");
        const tdPass = document.createElement("td");
        const checkBox = document.createElement("input");
        tdIdTicket.textContent = i+1;
        tdName.textContent = ticketsData[i].username;
        tdDescription.textContent = ticketsData[i].subject;
        tableau.appendChild(newLigne);
        newLigne.appendChild(tdIdTicket);
        newLigne.appendChild(tdName);
        newLigne.appendChild(tdDescription);
        newLigne.appendChild(tdPass);
        tdPass.appendChild(checkBox);
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("class", "form-check-input")
    }

}

/* function disableTickets() {
    fetch(`https://webhelprequest.deta.dev/tickets/1`, {
        "method": "PATCH",
        "body": new URLSearchParams({})
    })
} */

(printUserInfos("https://webhelprequest.deta.dev/users"))