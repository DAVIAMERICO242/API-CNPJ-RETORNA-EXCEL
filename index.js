require('dotenv').config();
const backend_port = process.env.BACKEND_PORT;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {cnpj_routes} = require('./src/sistema/model/cnpj model/routes');


app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use('/',cnpj_routes);

app.listen(backend_port,()=>{
    console.log(`rodando na porta ${backend_port}`);
})