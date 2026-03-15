import prisma from "../db/prismaClient.js";

//created async fun
export const getBooking = async (res,req)=>{
// try and catch is like if() but without any condition which fits perfectly as one of many booking controllers
    try{
        const booking = await prisma.booking.findMany()
        res.json(booking)
    }
    catch(error){
        res.status(500).json({error:"error server"})
    }
}