const express = require('express')
const { connect } = require('./config/mongo')
const router = require('./routes/index')
const app = express()
const PORT = 4001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)


connect()
.then(_ => {
  console.log('success connecting to db entertainme-movies')
  app.listen(PORT, () => {
    console.log('movies service running on port', PORT)
  })
})
