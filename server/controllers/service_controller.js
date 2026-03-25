import prisma from "../db/prismaClient.js";

export const getService = async (req, res) => {
    try {
        const service = await prisma.service.findMany()
        res.json(service)
        console.log("GET");
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getSingleService = async (req, res) => {
    try {
        const service = await prisma.service.findUnique({ where: { id: 1 } })
        res.json(service)
        console.log("GET");
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createService = async (req, res) => {
    try {
        const service = prisma.service.create()
        res.json(service)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const editService = async (req, res) => {
    try {
        const service = prisma.service.update()
        res.josn(service)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteService = async (req, res) => {
    try {
        const service = prisma.service.delete()
        res.json(service)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

