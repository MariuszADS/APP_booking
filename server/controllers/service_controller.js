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
    console.log("GET ALL");
}
export const getSingleService = async (req, res) => {
    try {
        console.log("PARAMS", req.params);
        const id = Number(req.params.id);
        const service = await prisma.service.findUnique({
            where: { id }
        });

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    console.log("GET SINGLE", req.params.id);
};

export const createService = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const service = await prisma.service.create({
            data: {
                name: req.body.name,
                comment: req.body.comment
            }
        })
        res.json(service)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// export const editService = async (req, res) => {
//     try {
//         const service = await prisma.service.update({
//             where: {
//                 name: req.body.name,
//                 comment: req.body.comment
//             }
//         })
//         res.josn(service)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

export const deleteService = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const service = await prisma.service.delete({
            where: { id }
        })
        if (!service) {
            return res.status(404).json({ message: "service not found" })
        }
        res.json(service)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    console.log("ID", req.params.id);

}

