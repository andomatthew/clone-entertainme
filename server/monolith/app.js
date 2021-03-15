const express = require('express')
const { connect } = require('./config/mongodb')
const router = require('./routes/index')
const errorHandler = require('./middleware/error-handling')
const app = express()
const PORT = 3000
const cors = require('cors')



app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: false} ))

app.use('/', router)

app.use(errorHandler)

connect()
.then(_ => {
  console.log('sukses koneksi ke mongo')
  app.listen(PORT, () => {
      console.log('app running on port ', PORT)
    })
  })
 
