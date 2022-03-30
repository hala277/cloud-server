'use strict'; 

const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const errorHandler = require('./error-handlers/500.js');
const errorHandler2 = require('./error-handlers/404.js');
const app = express();


app.use(express.json());
app.use(cors());

app.use(logger);

// http://localhost:3000/person?name= hala
app.get('/person',validator,(request,response)=>{
    response.status(200).json({
        name: request.query.name
    }) 

})

app.get('/',(request,response) => {
    response.send('home route')
})

// 500 rout handler
app.use(errorHandler);

// 404 rout handler
app.use(errorHandler2);



// start function
function start(port){
    app.listen(port,()=>{
console.log(`running on port ${port}`)
    })
}
module.exports = {
    app: app,
    start: start
}