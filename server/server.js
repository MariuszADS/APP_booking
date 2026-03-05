import http from "node:http"
import prisma from "./db/prismaClient";

const users = await prisma.user.findMany()
const services = await prisma.service.findMany()
const booking = await prisma.booking.findMany()

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.method === "GET" && req.url === "/users") {
        res.statusCode = 200
        res.end(JSON.stringify({ route: users }));
    }

    else if (req.method === "GET" && req.url === "/services") {
        res.statusCode = 200
        res.end(JSON.stringify({ route: services }))
    }

    else if (req.method === "GET" && req.url === "/bookings") {
        res.statusCode = 200
        res.end(JSON.stringify({ route: booking }))
    }

    else 404
});


console.log(`Server is working on `, server.listen(8000));



