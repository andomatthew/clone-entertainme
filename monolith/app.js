const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const router = require('./routes/index')
const { connect } = require('./config/mongodb')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: false} ))

app.use('/', router)


connect()
  .then(_ => {
    console.log('sukses koneksi ke mongo')
    app.listen(PORT, () => {
      console.log('app running on port ', PORT)
    })
  })
 
