require('dotenv').config();
const {main_cnpj_model} = require('./functions/main_model');
const cnpj_routes = require('express').Router();
const {array_json_to_excel} = require('../../essentials/json-array-to-excel');
const {getCurrentDateTimeString} = require('../../essentials/getCurrentFormatedDate');
const return_excel = process.env.RETURN_EXCEL==='TRUE'?true:false;
console.log('ENV RETURN EXCEL:');
console.log(return_excel);

cnpj_routes.post('/cnpj_data', async (req,res)=>{
    try{
        console.log('oi');
        console.log(req.body)
        var {ufs} = req.body;
        var {cidades} = req.body;
        var {bairros} = req.body;
        var {atividades} = req.body;
        console.log('ASSIM QUE ENTROU');
        console.log([ufs,cidades,bairros,atividades]);
        if(!ufs){
            ufs = [];
        }
        if(!cidades){
            cidades = [];
        }
        if(!bairros){
            bairros = [];
        }
        if(!atividades){
            atividades = [];
        }
        console.log([ufs,cidades,bairros]);
        const output = await main_cnpj_model(ufs,cidades,bairros,atividades);
        if(return_excel){
            await array_json_to_excel(output, prefix=getCurrentDateTimeString());
        }
        console.log('OUTPUT');
        console.log(output);
        if(!output){
            return res.status(500).send('falha');
        }
        return res.status(200).send(output);
    }catch(error){
        console.log(error);
        res.status(500).end();

    }
});

module.exports={
    cnpj_routes
}

