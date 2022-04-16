const urlAPI="http://localhost:3000/api/users"
const itemsAPI="http://localhost:3000/api/items"

let itemsList = [];
let loggedUser;

document.addEventListener('DOMContentLoaded', function(){

    if(document.location.pathname == '/client/register.html'){
        document.getElementById('register').addEventListener('click', addUser);
    }
    else if(document.location.pathname == '/client/login.html'){
        document.getElementById('logga').addEventListener('click', login);
    }
    else if(document.location.pathname == '/client/controlpanel.html'){
        getAllItems();
        document.getElementById('addItem').addEventListener('click', addItem);
    }
})

function getAllItems(){
    fetch(itemsAPI).then(response => response.json()).then(json => {
        itemsList = json;
        printItemList();
    });
}

function addUser(e){
    e.preventDefault();
    let input = document.querySelectorAll('#registrazione input');
    let obj = {id: null, name: input[0].value, lastName: input[1].value, email: input[2].value, password: input[3].value, admin: false}
    fetch(urlAPI,
        {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {'Content-type': 'application/json'}
    }).then(response => response.json()).then(json => console.log(json));
    input[0].value = '';
    input[1].value = '';
    input[2].value = '';
    input[3].value = '';
}

function addItem(e){
    e.preventDefault();
    let input = document.querySelectorAll('#aggiungiProdotti input');
    let obj = {id: null, name: input[0].value, price: input[1].value, description: input[2].value, image: input[3].value}
    let out = document.getElementById('addItemError');

    if(validaItem(obj)){
        fetch(itemsAPI,
            {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Content-type': 'application/json'}
            }).then(response => response.json()).then(json => {
                console.log(json)
                getAllItems();
            });
        input[0].value = '';
        input[1].value = '';
        input[2].value = '';
        input[3].value = '';
        out.innerHTML = '';
    } else {
        out.innerHTML = 'Dati inseriti non validi, riprova';
        out.style.color = 'red';
    }
}

function removeItem(id){
    fetch(itemsAPI+'/'+id, {method: 'DELETE'}).then(response => response.json()).then(json => { 
        console.log(json);
        getAllItems();
    })
}


function login(e){
    e.preventDefault();
    let input = document.querySelectorAll('#login input');
    let obj = {email: input[0].value, password: input[1].value};
    fetch(urlAPI+'/login/',
        {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {'Content-type': 'application/json'}
    }).then(response => response.json()).then(json => {
        if(json != null){
            loggedUser = json;
            let out = document.getElementById('outputLogin');
            out.innerHTML = 'Accesso effettuato con successo';
            out.style.color = 'green';
        }
        else{
            let out = document.getElementById('outputLogin');
            out.innerHTML = 'Password o email errati, riprova';
            out.style.color = 'red';
        }
        console.log(loggedUser);
    });
    input[0].value = '';
    input[1].value = '';
}

function printItemList(){
    let lista = document.querySelector('#listaProdotti');
    lista.innerHTML = '';
    itemsList.forEach(ele => {
        let tr = document.createElement('tr');
        let deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton btn btn-danger';
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', () => removeItem(ele.id));
        tr.innerHTML = 
        `
        <td>${ele.id}</td>
        <td>${ele.name}</td>
        <td>${ele.description}</td>
        <td>${ele.price}€</td>
        <td><img src="${ele.image}"></td>
        ` //NELL'IMMAGINE DEVO CONTROLLARE SE C'E' L'HTTPS:// SENNO' DA ERRORE
        tr.appendChild(deleteButton);
        lista.appendChild(tr);
    })

}

function validaItem(obj){
    let nome = obj.name;
    let prezzo = obj.price;
    let description = obj.description;
    let image = obj.image;

    if(nome != '' && !isNaN(prezzo) && 
    prezzo != '' && description != '' && 
    (image.substring(0, 8) === 'https://' || image.substring(0, 7) === 'http://')){
        console.log(true);
        return true;
    }
    else{
        console.log(false);
        return false;
    }
}