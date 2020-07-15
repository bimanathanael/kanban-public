require('dotenv').config()

const  jwt = require('jsonwebtoken');

function jwtSign(data){
    return  jwt.sign(data, process.env.SECRET);
}

function jwtVerify(data){
    return jwt.verify(data, process.env.SECRET);
}

module.exports = {jwtSign, jwtVerify}

