let abc = printUserInfos()

function printUserInfos() {
    fetch("https://webhelprequest.deta.dev/users")
        .then((response) => response.json())
        .then(function (data) {
            (arrayData = data.data), //console.log(arrayData)})//
                //tableau avec userId et name
                userList(arrayData);
                return arrayData
        });
}
console.log(abc);

const sub = document.getElementById("subTick");
const click = document.getElementById("clickTick");
const chooseName = document.getElementById("selectUser");

let keys = [];

chooseName.addEventListener("input", (e) => {
    const who = e.target[e.target.selectedIndex].label;
    const userKey = getId(who);
    keys.push(userKey)
    //console.log(keys)
    postData(keys)
});

function postData(keys, userTicket) {
    const formData = {
        subject: `${userTicket}`, //récupérer l'input à partir de l'eventListener
        userId: `${keys}`, //id correspondant à l'eventListener du clic - faire le lien entre le name et le userId
    };
    console.log(formData);
    //return formData;

}


function getId(who) {
    fetch("https://webhelprequest.deta.dev/users")
        .then((response) => response.json())
        .then(function (data) {
            (arrayData = data.data)
        });
    for (i = 0; i < arrayData.length; i++) {
        if (who === arrayData[i].username) {
            let userKey = arrayData[i].key;
            console.log(userKey);
            return userKey;
        }
    }
    //postData(userKey);
}


/* sub.addEventListener("submit", (event) => {
    event.preventDefault();
    const requestUser = document.getElementById("userTick");
    let userTicket = requestUser.value;
    console.log(userTicket);
    postData(keys, userTicket);
    postTicket(tableauUsers);
}); */

click.addEventListener("click", () => {
    const requestUser = document.getElementById("userTick");
    let userTicket = requestUser.value;
    console.log(userTicket);
    const a = postData(formData);
    postTicket(a);
});

function userList(arrayData) {
    for (let i = 0; i < arrayData.length; i++) {
        const userName = document.getElementById("selectUser");
        const nextOption = document.createElement("option");
        userName.appendChild(nextOption);
        nextOption.textContent = arrayData[i].username;
    }
}



function postTicket(formData) {
    postData();
    fetch("https://webhelprequest.deta.dev/tickets", {
        "method": "POST",
        "body": new URLSearchParams(formData),
        "headers": { "Content-Type": "application/x-www-form-urlencoded" }
    })
    fetch("https://webhelprequest.deta.dev/tickets")
        .then((response) => response.json())
        .then(function (data) {
            (ticketsData = data.data); //tableau avec sujet (subject) et userId (users_id)
                //console.log(ticketsData, tableauUsers),
                const tableauUsers = printUserInfos("https://webhelprequest.deta.dev/users")
                regroupInfos(ticketsData, tableauUsers);
        });
}
function regroupInfos(ticketsData, tableauUsers) {
    for (let i = 0; i < ticketsData.length; i++) {
        if (ticketsData[i].users_id === tableauUsers[0].key) {
            Object.assign(ticketsData[i], { username: tableauUsers[0].username });
        } else if (ticketsData[i].users_id === tableauUsers[1].key) {
            Object.assign(ticketsData[i], { username: tableauUsers[1].username });
        } else if (ticketsData[i].users_id === tableauUsers[2].key) {
            Object.assign(ticketsData[i], { username: tableauUsers[2].username });
        } else if (ticketsData[i].users_id === tableauUsers[3].key) {
            Object.assign(ticketsData[i], { username: tableauUsers[3].username });
        } else {
            Object.assign(ticketsData[i], { username: tableauUsers[4].username });
        }
    }
    createElements(ticketsData);
    console.log(ticketsData);
    /* disableTickets();
      console.log(ticketsData); */
}
//postTicket(arrayData); // en attente du eventlistner
function createElements(ticketsData) {
    for (let i = 0; i < ticketsData.length; i++) {
        const tableau = document.getElementById("tBod");
        const newLigne = document.createElement("tr");
        const tdIdTicket = document.createElement("td");
        const tdName = document.createElement("td");
        const tdDescription = document.createElement("td");
        const tdPass = document.createElement("td");
        const checkBox = document.createElement("input");
        tdIdTicket.textContent = i + 1;
        tdName.textContent = ticketsData[i].username;
        tdDescription.textContent = ticketsData[i].subject;
        tableau.appendChild(newLigne);
        newLigne.appendChild(tdIdTicket);
        newLigne.appendChild(tdName);
        newLigne.appendChild(tdDescription);
        newLigne.appendChild(tdPass);
        tdPass.appendChild(checkBox);
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("class", "form-check-input");
    }
}

/* function disableTickets() {
    fetch(`https://webhelprequest.deta.dev/tickets/1`, {
        "method": "PATCH",
        "body": new URLSearchParams({})
    })
} */