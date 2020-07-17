require('dotenv').config()
const { User } = require('..//models')
const { encrypt, checkPass } = require('../helpers/bcrypt')
const { jwtSign, jwtVerify} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class MainController{
    static login ( req, res, next) {
        const loginData = {
            email : req.body.email,
            password : req.body.password
        } 

        if(!loginData.email || !loginData.password || loginData.email == "" || loginData.password == ""){
            throw {
                name: "customErr",
                message: "Please Fill All Field",
                status : 404,
            }
        }

        User.findOne({ where : {email : loginData.email}})
        .then ( data => {
            if (!data) {
                throw {
                    name: "customErr",
                    message: "Login data not found",
                    status : 404,
                }
            } else if( checkPass (loginData.password , data.password)){
                const token = jwtSign({
                    id: data.id,
                    email: data.email,
                })
                res.status(200).json({ access_token : token , id : data.id })
            } else {
                throw {
                    name: "customErr",
                    message: "login data not found",
                    status : 404,
                }
            }
        })
        .catch( err =>{
            next(err)

        })
    }

    static register ( req, res, next) {
        const newOne = {
            email : req.body.email,
            password : req.body.password,
            organization : "Hacktiv8",
        }

        if(!newOne.email || !newOne.password || newOne.email == "" || newOne.password == ""){
            throw {
                name: "customErr",
                message: "Please Fill Email and Password",
                status : 404,
            }
        }

        User.create(newOne)
        .then ( data => {
            res.status(201).json(data)
        })
        .catch( err =>{
            next(err)
        })
    }

    static googleSignin (req, res, next) {
        console.log("masuklbro")
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then( ticket => {
            payload = ticket.getPayload();
            const userid = payload['sub']
            console.log(payload, ">>>> DATA DARI GOOGLE")
            return User.findOne({ where : { email : payload["email"]}})
        })
        .then( user => {
            console.log(user,"useruser")

            if(user){
                return user;
            } else {
                let dataUser = {
                    email: payload['email'],
                    password: 'admin',
                    organization: "Hactiv8",
                }
                return User.create(dataUser)
            }
        })
        .then(data => {
            console.log(data,"datadata")
            const access_token = jwtSign({
                id : data.id,
                email: data.email,
            })
            console.log(access_token,"accesstoken")

            return res.status(200).json({access_token, id : data.dataValues.id})
        })
        .catch( err => {
            next(err)
        })
    }

}

module.exports = MainController