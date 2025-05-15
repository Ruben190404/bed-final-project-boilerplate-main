import { Router } from "express";
import jwt from 'jsonwebtoken';
import prisma from "../lib/prisma.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';
        const { username, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                username: username,
                password: password
            }
        })

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials!'});
        }

        const token = jwt.sign({ userId: user.id}, secretKey);
        res.status(200).json({ message: 'Successfully logged in!', token});
    } catch {
        console.error(error)
        res.status(500).send('Something went wrong while logging in!')
    }
})

export default router;