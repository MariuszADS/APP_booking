
// middleware controller is handling errors server 
// export const errorHandler = (err, req, res, next) => {
//     console.error(err);
//     req.path()
//     res.status(500).json({ message: "internal server error" })
//     next()
// }

// function errorHandler (err, req, res, next) {
//   if (res.headersSent) {
//     return next(err)
//   }
//   res.status(500)
//   res.render('error', { error: err })
// }
