const { User } = require('..//models')
const { encrypt, checkPass } = require('../helpers/bcrypt')
const { jwtSign, jwtVerify} = require('../helpers/jwt')

class MainController{
    static login ( req, res, next) {
        const loginData = {
            email : req.body.email,
            password : req.body.password
        } 
        User.findOne({ where : {email : loginData.email}})
        .then ( data => {
            if( checkPass (loginData.password , data.password)){
                const token = jwtSign({
                    id: data.id,
                    email: data.email,
                })
                res.status(200).json({ access_token : token})
            } else {
                res.status(404).json({error: "login data not found"})
            }
        })
        .catch( err =>{
            res.status(404).json({error: "login data not found"})
        })
    }

    static register ( req, res, next) {
        const newData = {
            email : req.body.email,
            password : req.body.password,
            organization : "Hacktiv8",
        }
        User.create(newData)
        .then ( data => {
            res.status(201).json(data)
        })
        .catch( err =>{
            res.status(500).json(err)
        })
    }
}

module.exports = MainController