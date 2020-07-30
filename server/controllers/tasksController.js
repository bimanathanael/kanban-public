const { Task, User } = require('../models')
const doMail = require('../helpers/mail')


class TasksController{
    static view ( req, res, next) {
        Task.findAll( {include: [User]})
        .then ( data => {
            res.status(200).json(data)
        })
        .catch( err =>{
            const errMsg = {
                name: "customValidation",
                message: "Server Internal Error",
                status : 500,
            }
            next(errMsg)
        })
    }

    static viewById ( req, res, next) {
        const selectedId = req.params.id
        Task.findByPk(selectedId)
        .then ( data => {
            if(data == null){
                return res.status(404).json({ 
                    message: "data not found"
                })
            } else {
                res.status(200).json(data)
            }
        })
        .catch( err =>{
            next(err)
        })
    }

    static add ( req, res, next) {
        const newData = {
            title : req.body.title,
            category : req.body.category,
            UserId : req.userData.id,
        }
        if(newData.title == "" || newData.category == "" || !newData.title || !newData.category ){
            throw {
                name: "customErr",
                message: "Please Fill All Fields",
                status : 404,
            }
        }
        Task.create(newData)
        .then ( data => {
            doMail(data)
            res.status(201).json(data)
        })
        .catch( err =>{
            next(err)
        })
    }

    static edit ( req, res, next) {
        const selectedId = req.params.id
        const newData = {
            title : req.body.title,
            category : req.body.category,
            UserId : req.userData.id,
        }
        if(newData.title == "" || newData.category == ""  || !newData.category || !newData.category){
            throw {
                name: "customErr",
                message: "Please Fill All Fields",
                status : 404,
            }
        }
        Task.findByPk(selectedId)
        .then ( data => {
            if (data == null) {
                throw {
                    name: "customErr",
                    message: "data not found",
                    status : 404
                }
            } else {
                data.update(newData)
                .then ( updatedRow => {
                    res.status(201).json(data)
                })
                .catch( err =>{
                    next(err)
                })
            }
        })
        .catch( err =>{
            next(err)
        })
    }

    static delete ( req, res, next) {
        const selectedId = req.params.id
        Task.findByPk(selectedId)
        .then ( data => {
            data.destroy()
            .then ( deletedRow => {
                if(!data){
                    throw {
                        name: "customErr",
                        message: "data not found",
                        status : 404
                    }
                } else {
                    return res.status(200).json(data)
                }
            })
            .catch( err =>{
                res.status(500).json(err)
            })
        })
        .catch( err =>{
            const errMsg = {
                name: "customErr",
                message: "data not found",
                status : 404
            }

            next(errMsg)
        })
        
    }
}

module.exports = TasksController