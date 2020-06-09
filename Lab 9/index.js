const express = require('express')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send("Hello Shiva Executing ASE Lab-9"))

app.get('/secret', isAuthorized, (req, res) => {
    res.json({"message": "Successfully JWT Token Validated"});
})

app.get('/readme', (req, res) => {
    res.json({"message":"ASE Lab-9"});
})

app.get('/jwt', (req,res) => {
    let privatekey = fs.readFileSync('./private.pem','utf8');
    let token = jwt.sign({"body":"Team 7 ASE Lab-9"}, privatekey, {algorithm:'HS256'});
    res.send(token);
})

function isAuthorized(req, res, next){
    if(typeof req.headers.authorization !== "undefined"){
        let token = req.headers.authorization.split(" ")[1];
        let privatekey = fs.readFileSync('./private.pem','utf8');

        //console.log('token from headers$$$$$$$$$$$$$', token);
        //console.log('token from file@@@@@@@@@@@@@@', privatekey);

        jwt.verify(token, privatekey, {"algorithm":"HS256"}, (err, decoded) => {
            if(err){
                res.status(500).json({error:"Not Authorized"})
            }
            console.log(decoded);

            return next();
        })
    }else{
        res.status(500).json({error:"Not Authorized"})
    }
}

app.listen(port, () => console.log(`Started App on port: ${port}`))