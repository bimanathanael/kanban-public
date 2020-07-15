const { Task, User } = require('../models')

class TasksController{
    static view ( req, res, next) {
        Task.findAll()
        .then ( data => {
            res.status(200).json(data)
        })
        .catch( err =>{
            res.status(500).json(err)
        })
    }

    static viewById ( req, res, next) {
        const selectedId = req.params.id
        Task.findByPk(selectedId)
        .then ( data => {
            res.status(200).json(data)
        })
        .catch( err =>{
            res.status(500).json(err)
        })
    }

    static add ( req, res, next) {
        const newData = {
            title : req.body.title,
            category : req.body.category,
            UserId : req.userData.id,
        }
        console.log(newData, "newDatanewData")
        Task.create(newData)
        .then ( data => {
            res.status(201).json(data)
        })
        .catch( err =>{
            res.status(500).json(err)
        })
    }

    static edit ( req, res, next) {
        const selectedId = req.params.id
        const newData = {
            title : req.body.title,
            category : req.body.category,
            UserId : req.userData.id,
        }
        Task.findByPk(selectedId)
        .then ( data => {
            data.update(newData)
            .then ( updatedRow => {
                res.status(201).json(data)
            })
            .catch( err =>{
                res.status(500).json(err)
            })
        })
        .catch( err =>{
            res.status(500).json(err)
        })
    }

    static delete ( req, res, next) {
        const selectedId = req.params.id
        Task.findByPk(selectedId)
        .then ( data => {
            data.destroy()
            .then ( deletedRow => {
                res.status(201).json(data)
            })
            .catch( err =>{
                res.status(500).json(err)
            })
        })
        .catch( err =>{
            res.status(404).json({error: "data not found"})
        })
        
    }
}

module.exports = TasksController