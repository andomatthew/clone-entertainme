
function errorHandler(err, req, res, next) {
  let status
  switch(err.name) {
    default:
      status = 500
      res.status(status).json({ message: err.message })
  }
}


module.exports = errorHandler