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

// LIAISONS HTML
const buttnAuSuivant = document.getElementById('buttnNext');
const chooseName = document.getElementById('selectUser');
const click = document.getElementById('clickTick');
const sub = document.getElementById('subTick');

// TABLEAUX
let tableUsers = [];
let tableTickets = [];
let keys = [];

// EVENTLISTENERS
buttnAuSuivant.addEventListener('click', () => auSuivant());
click.addEventListener("click", () => {
    const requestUser = document.getElementById("userTick");
    let userTicket = requestUser.value;
    //console.log(userTicket, keys[keys.length-1]);
    postTicket(userTicket, keys[keys.length - 1]);
});
sub.addEventListener("submit", () => {
    const requestUser = document.getElementById("userTick");
    let userTicket = requestUser.value;
    //console.log(userTicket, keys[keys.length-1]);
    postTicket(userTicket, keys[keys.length - 1]);
});
// Click qui sélectionne le user 
// Crée une const avec le name
// Lance la fonction getId (qui associe le name au users_id (key))
// Push le users_id (key) dans un tableau 'keys' à l'extérieur
chooseName.addEventListener("input", (e) => {
    const who = e.target[e.target.selectedIndex].label;
    const userKey = getId(who);
    keys.push(userKey)
    //console.log(keys)
});



//FONCTIONS

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
    });
//console.log(tableUsers);


// Récupère les données done, key, subject et users_id dans le GET tickets
// et les push dans le 'tableTickets'
// lance la fonction regroupTicketsUsers (qui permet d'ajouter le username dans 'table tickets')
// lance la fonction CreateElements (qui permet de créer les lignes et cellules en fonction de 'table tickets' à jour)
function afficherTickets() {
    fetch("https://webhelprequest.deta.dev/tickets")
        .then(response => response.json())
        .then(function (data) {
            ticketsData = data.data;
            //console.log(ticketsData);
            for (let i = 0; i < ticketsData.length; i++) {
                if (ticketsData[i].done === 0) {
                    let ticket = new Ticket(ticketsData[i].done, ticketsData[i].key, ticketsData[i].subject, ticketsData[i].users_id);
                    tableTickets.push(ticket);
                }
                //console.log(tableTickets);
            };
            //console.log(tableTickets);
            regroupTicketsUsers(tableTickets, tableUsers);
            createAffichageTableTickets(tableTickets);
            createUsersList(tableUsers);
            //console.log(ticket);
        });
};

// Permet d'afficher les tickets au lancement de la page
afficherTickets()
//console.log(tableTickets)


// Crée les lignes et cellules du tableau avec les infos contenues dans l'API (done, key, subject, users_id)
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
        //buttonN.setAttribute('onclick', "window.location.reload()" )
        document.getElementById(`buttn${i}`).addEventListener('click', () => disableTickets(tableTickets[i].key))
    }
};



// Crée la liste des noms dans le sélecteur
function createUsersList(tableUsers) {
    for (let i = 0; i < tableUsers.length; i++) {
        const userName = document.getElementById("selectUser");
        const nextOption = document.createElement("option");
        userName.appendChild(nextOption);
        nextOption.textContent = tableUsers[i].username;
    }
};


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



// Disable un ticket
// Ajouter entre le ${} l'id du ticket à disable (qui sera pointé par le 'click' de l'eventListener)
// Lance la fonction setTimeout (qui refresh la page après le disableTicket)
function disableTickets(ticketKey) {
    fetch(`https://webhelprequest.deta.dev/tickets/${ticketKey}`, {
        "method": "PATCH",
        "body": new URLSearchParams({})
    });
    setTimeout(() => {
        document.location.reload();
    }, 1000);; // Refresh la page après 1 seconde (pour laisser le temps à l'API de répondre)
};



// Permet d'afficher une window alert avec le nom et le sujet du 1er ticket de la liste
function auSuivant() {
    const name = tableTickets[0].username;
    const sujet = tableTickets[0].subject;
    const message = `Demande faite par "${name}" et le sujet est : "${sujet}"`;
    window.alert(message);
};




// Associe le name au users_id (key)
function getId(who) {
    for (i = 0; i < tableUsers.length; i++) {
        if (who === tableUsers[i].username) {
            let userKey = tableUsers[i].key;
            //console.log(userKey);
            return userKey;
        }
    }
};



// Poste un ticket 
// Relance la fonction d'affichage des tickets (refresh de la page)
function postTicket(sujet, idUser) {
    const formData = {
        subject: sujet, //récupérer l'input à partir de l'eventListener
        userId: idUser, //id correspondant à l'eventListener du clic - faire le lien entre le name et le userId
    };
    fetch("https://webhelprequest.deta.dev/tickets", {
        "method": "POST",
        "body": new URLSearchParams(formData),
        "headers": { "Content-Type": "application/x-www-form-urlencoded" }
    });
    afficherTickets();
};