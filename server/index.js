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
    {id: 1, name: 'Admin', lastName: 'Administrator', email: 'admin@admin.it', admin: true}
];

let count = users.length;

app.get('/api/users', (request, response) => {
    response.json(users);
})

app.post('/api/users', (request, response) => {
    let obj = request.body; //unico modo per passare i dati al backend è tramite una request
    obj.id = ++count; //generazione automatica di un nuovo id univoco
    users.push(obj); //push nell'array di utenti dell'utente nuovo
    response.json('Utente aggiunto con successo'); //messaggio di successo
})

app.listen(3000, () => console.log('Server attivo sulla porta 3000'));