import prisma from "../db/prismaClient.js";

//created async fun
export const getBooking = async (res,req)=>{
// try and catch is like if() but without any condition which fits perfectly as one of many booking controllers
    try{
        // booking virable is handling prisma findMany() method
        const booking = await prisma.booking.findMany()
        // response getting by json() method
        res.json(booking)
    }
    catch(error){
        res.status(500).json({error:"error server"})
    }
}