let User = class {
    constructor(key, username) {
        this.key = key;
        this.username = username;
    }
};

let Ticket = class {
    constructor(done, key, subject, users_id) {
        this.done = done;
        this.key = key;
        this.subject = subject;
        this.users_id = users_id;
    }
};

/* // Nouvel objet à priori useless grâce à la fonction regroupInfos qui modifie la 'table tickets'
let UserTicket = class {
    constructor(done, key, subject, users_id, username) {
        this.done = done;
        this.key = key;
        this.subject = subject;
        this.users_id = users_id;
        this.username = username;
    }
}; */



// CONSTRUCTION DE LA SELECTION DES USERS DANS LE MENU DEROULANT
/* const selectUser = document.getElementById();
selectUser.addEventListener('click' => () {}) */



let tableUsers = [];
let tableTickets = [];

// Récupère les données userId et username dans le GET users
// et les push dans le 'tableUsers'
fetch("https://webhelprequest.deta.dev/users")
    .then(response => response.json())
    .then(function (data) {
        arrayData = data.data;
        //console.log(arrayData);
        for (let i = 0; i < arrayData.length; i++) {
            let user = new User(arrayData[i].key, arrayData[i].username);
            tableUsers.push(user)
            //console.log(user)
        }
    })

console.log(tableUsers);


// Récupère les données done, key, subject et users_id dans le GET tickets
// et les push dans le 'tableTickets'
// lance la fonction regroupTicketsUsers (qui permet d'ajouter le username dans 'table tickets')
// lance la fonction CreateElements (qui permet de créer les lignes et cellules en fonction de 'table tickets' à jour)
fetch("https://webhelprequest.deta.dev/tickets")
    .then(response => response.json())
    .then(function (data) {
        ticketsData = data.data;
        //console.log(ticketsData);
        for (let i = 0; i < ticketsData.length; i++) {
            let ticket = new Ticket(ticketsData[i].done, ticketsData[i].key, ticketsData[i].subject, ticketsData[i].users_id);
            tableTickets.push(ticket);
            //console.log(tableTickets);
        }
        regroupTicketsUsers(tableTickets, tableUsers);
        createAffichageTableTickets(tableTickets);
        createUsersList(tableUsers);
        //console.log(ticket);
    });
console.log(tableTickets)

// Fonction qui crée les lignes et cellules du tableau avec les infos contenues dans l'API (done, key, subject, users_id)
// Affiche les données dans les cellules créées
function createAffichageTableTickets(tableTickets) {
    for (let i = 0; i < tableTickets.length; i++) {
        const tableau = document.getElementById("tBod");
        const newLigne = document.createElement("tr");
        const tdIdTicket = document.createElement("td");
        const tdName = document.createElement("td");
        const tdDescription = document.createElement("td");
        const tdPass = document.createElement("td");
        const buttonN = document.createElement("button");
        tdIdTicket.textContent = i + 1;
        tdName.textContent = tableTickets[i].username;
        tdDescription.textContent = tableTickets[i].subject;
        tableau.appendChild(newLigne);
        newLigne.appendChild(tdIdTicket);
        newLigne.appendChild(tdName);
        newLigne.appendChild(tdDescription);
        newLigne.appendChild(tdPass);
        tdPass.appendChild(buttonN);
        buttonN.setAttribute("type", "button");
        buttonN.setAttribute("class", "btn btn-primary");
        buttonN.setAttribute("id", `buttn${i}`);
    }
};

function createUsersList(tableUsers) {
    for (let i = 0; i < tableUsers.length; i++) {
        const userName = document.getElementById("selectUser");
        const nextOption = document.createElement("option");
        userName.appendChild(nextOption);
        nextOption.textContent = tableUsers[i].username;
    }
}


// Ajoute une nouvelle clé (username) dans la 'tableTickets'
function regroupTicketsUsers(tableTickets, tableUsers) {
    for (let i = 0; i < tableTickets.length; i++) {
        if (tableTickets[i].users_id === tableUsers[0].key) {
            Object.assign(tableTickets[i], { username: tableUsers[0].username })
        }
        else if (tableTickets[i].users_id === tableUsers[1].key) {
            Object.assign(tableTickets[i], { username: tableUsers[1].username })
        }
        else if (tableTickets[i].users_id === tableUsers[2].key) {
            Object.assign(tableTickets[i], { username: tableUsers[2].username })
        }
        else if (tableTickets[i].users_id === tableUsers[3].key) {
            Object.assign(tableTickets[i], { username: tableUsers[3].username })
        }
        else {
            Object.assign(tableTickets[i], { username: tableUsers[4].username })
        }
    };
};


// FONCTIONNEL EN ATTENTE

/* // Fonction pour disable un ticket
// Ajouter entre le ${} l'id du ticket à disable (qui sera pointé par le 'click' de l'eventListener)
function disableTickets() {
    fetch(`https://webhelprequest.deta.dev/tickets/${}`, {
        "method": "PATCH",
        "body": new URLSearchParams({})
    })
};
disableTickets(); */

const buttnAuSuivant = document.getElementById('buttnNext');
buttnAuSuivant.addEventListener('click', () => auSuivant());
// Fonction qui permet d'afficher une window alert avec le nom et le sujet du 1er ticket de la liste
function auSuivant() {
    const name = tableTickets[0].username;
    const sujet = tableTickets[0].subject;
    const message = `Demande faite par "${name}" et le sujet est : "${sujet}"`;
    window.alert(message);
};




// A FAIRE PAS ENCORE TESTE
// MAIS FONCTIONNEL AVEC L'ANCIEN
// Y AJOUTER UNE FONCTION QUI PERMET LE REAFFICHAGE DES TICKETS DE L'API
/* const formData = {
    subject: "Test 50", //récupérer l'input à partir de l'eventListener
    userId: tableauUsers[0].key, //id correspondant à l'eventListener du clic - faire le lien entre le name et le userId
};
fetch("https://webhelprequest.deta.dev/tickets", {
    "method": "POST",
    "body": new URLSearchParams(formData),
    "headers": { "Content-Type": "application/x-www-form-urlencoded" }
}) */