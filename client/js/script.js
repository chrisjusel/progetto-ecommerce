const urlAPI="http://localhost:3000/api/users"

let usersList = [];
let loggedUser;

document.addEventListener('DOMContentLoaded', function(){
    getAllUsers();

    if(document.location.pathname == '/client/register.html'){
        document.getElementById('register').addEventListener('click', addUser);
    }
    else if(document.location.pathname == '/client/login.html'){
        document.getElementById('logga').addEventListener('click', login);
    }
})

function getAllUsers(){
    fetch(urlAPI).then(response => response.json()).then(json => {
        userList = json;
    });
}

function addUser(){
    let input = document.querySelectorAll('#register input');
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
    getAllUsers();
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