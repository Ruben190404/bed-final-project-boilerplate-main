import express from 'express';
import { getUsers } from '../services/users/getUsers.js';
import { getUserById } from '../services/users/getUserByid.js';
import { createUser } from '../services/users/createUser.js';
import { updateUserById } from '../services/users/updateUserById.js';
import { deleteUser } from '../services/users/deleteUser.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { username, email } = req.query;
        const users = await getUsers(username, email);
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while getting list of users!')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)

        if(!user) {
            res.status(404).send(`User with id ${id} was not found!`)
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(`Something went wrong while getting user by id!`)
    }
})

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body
        const {newUser, problem} = await createUser(username, password, name, email, phoneNumber, profilePicture);
        if(!newUser){
            res.status(400).send(problem);
        } else {
            res.status(201).json(newUser)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while creating new user!')
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { username, password, name, email, phoneNumber, profilePicture } = req.body
        const updatedUser = await updateUserById(id, username, password, name, email, phoneNumber, profilePicture)
        if(!updatedUser){
            res.status(404).json(`User with id ${id} was not found!`)
        } else {
            res.status(200).json(updatedUser)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while updating user by id!')
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUserId = await deleteUser(id);
        if(!deletedUserId) {
            res.status(404).send(`User with id ${id} was not found!`);
        } else {
            res.status(200).json({
                message: `User with id ${deletedUserId} was deleted!`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting user by id!');
    }
})

export default router;