const isAdmin = (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "Frobidden"})
    }
    next()
}

const isUser = ()=>{}

export {isAdmin}