const {jwtSign, jwtVerify} = require('../helpers/jwt')
const { User, Task } = require('../models')

function authentication ( req, res, next ) {
    if (!req.headers.access_token){
        res.status(401).json({error: "please login first"})
    } 
    try {
        req.userData = jwtVerify(req.headers.access_token)
        User.findByPk(req.userData.id)
        .then( data => {
            next()
        })
        .catch( err => {
            res.status(404).json({error: "user no longer exist"})
        })
    }catch {
        res.status(401).json({error: "wrong access token"})
    }
}


function authorization ( req, res, next ) {
    const selectedId = req.params.id
    Task.findByPk(selectedId)
    .then( data => {
        if( data.UserId == req.userData.id){
            next()
        } else {
            res.status(401).json({error: "not authorized"})
        }
    })
    .catch( err => {
        res.status(404).json({error: "data not found"})
    })
}

module.exports = { authentication , authorization }