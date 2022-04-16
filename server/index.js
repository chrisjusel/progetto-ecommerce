const express = require('express');
const cors = require('cors');
const { request } = require('http');
const { response } = require('express');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

let users = 
[
    {id: 1, name: 'Admin', lastName: 'Administrator', email: 'admin@admin.it', password: '123', admin: true}
];

let items = 
[
    {id: 1, name: 'Scape', price: 50, description: 'Le scarpe più belle di Napoli', image: 'https://m.media-amazon.com/images/I/61yZW44DxoL._AC_UX500_.jpg'},
    {id: 2, name: 'Pantalone', price: 30, description: 'Il pantalone più bello di Napoli', image: 'https://www.ivgoutlet.it/2252-medium_default/tuta-acetata-ssc-napoli-303jpi0-910-azzurra.jpg'}
]

let count = users.length;
let countItems = items.length;

app.get('/api/users', (request, response) => {
    response.json(users);
})

app.get('/api/items', (request, response) => {
    response.json(items);
})

app.post('/api/users', (request, response) => {
    let obj = request.body; //unico modo per passare i dati al backend è tramite una request
    obj.id = ++count; //generazione automatica di un nuovo id univoco
    users.push(obj); //push nell'array di utenti dell'utente nuovo
    response.json('Utente aggiunto con successo'); //messaggio di successo
})

app.post('/api/items', (request, response) => {
    let obj = request.body;
    obj.id = ++countItems;
    items.push(obj);
    response.json('Item aggiunto con successo');
})

app.delete('/api/items/:id', (request, response) => {
    const id = request.params.id;
    items = items.filter(item => item.id !== +id); //mi creo un array con tutti gli elementi tranne quello che voglio eliminare
    response.json('Item eliminato con successo');
})

app.post('/api/users/login', (request, response) => {
    let obj = request.body; //unico modo per passare i dati al backend è tramite una request
    let email = obj.email;
    let password = obj.password;
    let loggedObj = users.find(ele => ele.email === email);
    if(loggedObj != undefined){
        if(loggedObj.password === password){
            response.json(loggedObj);
        }
        else{
            response.json(null);
        }
    }
    else{
        response.json(null);
    }
})


app.listen(3000, () => console.log('Server attivo sulla porta 3000'));