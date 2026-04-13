import jwt from "jsonwebtoken"


const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

//generated JWT based on userId and role, which expires in 24h
const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role: role }),
        JWT_SECRET,
        { expiresIn: "24h" }
}
//verifing token based on JWT_SECRET
const verifyToken = (token)=>{
    try{
        return jwt.verify(token,JWT_SECRET)
    }catch(error){
        return null
    }
}

export{generateToken,verifyToken}

