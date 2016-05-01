"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

let port = process.env.PORT || 8080;
let ip = process.env.IP || '127.0.0.1';
let addr =  `${ip}:${port}`;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index', {title : 'Proyecto Procesadores de Lenguajes'});
});

//	Definimos la ruta para el parser
app.get('/parser', (req,resp) =>{
	resp.send({"tree" : parser(req.query.input)});
});

app.listen(port,ip, () =>{
   console.log(`App listening at ${addr}`);
});
