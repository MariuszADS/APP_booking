// logger is displaying used current kind of API method (GET,POST,PUT,DELETE)
export const logger = (req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next()
}