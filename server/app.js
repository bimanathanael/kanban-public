const express = require('express')
const cors = require('cors')
const mainRoute = require('./routes/mainRoute')

const PORT = process.env.PORT || 3333

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', mainRoute)

app.listen(PORT , () => {
    console.log(`listening to ${PORT}`)
})
