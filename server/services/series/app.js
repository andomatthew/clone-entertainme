const express = require('express')
const { connect } = require('./config/mongo')
const router = require('./routes/index')
const app = express()
const PORT = 4002

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

connect()
.then(_ => {
  console.log('success connect to mongo entertainme-series')
  app.listen(PORT, () => {
    console.log('series service running on port', PORT)
  })
})
