const urlAPI="http://localhost:3000/api/users"
let usersList = [];

document.addEventListener('DOMContentLoaded', function(){
    getAllUsers();
    document.getElementById('submit').addEventListener('click', addUser);
    document.getElementById('submit').addEventListener('click', getAllUsers);
})

function getAllUsers(){
    fetch(urlAPI).then(response => response.json()).then(json => {
        userList = json;
        stampaUtenti();
    });
}

function addUser(){
    let input = document.querySelectorAll('.container input');
    let obj = {id: null, name: input[0].value, lastName: input[1].value, email: input[2].value, admin: false}
    fetch(urlAPI,
        {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {'Content-type': 'application/json'}
    }).then(response => response.json()).then(json => console.log(json));
    input[0].value = '';
    input[1].value = '';
    input[2].value = '';
    getAllUsers();
}