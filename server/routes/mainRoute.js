const router = require('express').Router()
const mainController = require('../controllers/mainController')
const tasks = require('./tasks')
const { authentication } = require('../middlewares/auth')

router.post('/login', mainController.login)
router.post('/register', mainController.register)

router.use(authentication)
router.use('/tasks', tasks)

module.exports = router