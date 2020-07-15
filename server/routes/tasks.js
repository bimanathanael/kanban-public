const router = require('express').Router()
const tasksController = require('../controllers/tasksController')
const { authorization } = require('../middlewares/auth')

router.get('/', tasksController.view)
router.get('/:id', tasksController.viewById)
router.post('/', tasksController.add)
router.put('/:id', authorization, tasksController.edit)
router.delete('/:id', authorization, tasksController.delete)


module.exports = router