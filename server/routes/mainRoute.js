const router = require('express').Router()
const mainController = require('../controllers/mainController')
const tasks = require('./tasks')
const errHandler = require('../middlewares/errHandler')
const { authentication } = require('../middlewares/auth')

router.post('/login', mainController.login)
router.post('/register', mainController.register)
router.post('/googleSignin', mainController.googleSignin)

router.use(authentication)
router.use('/tasks', tasks)
router.use(errHandler)

module.exports = router