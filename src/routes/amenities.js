import express from 'express';
import { getAmenities } from '../services/amenities/getAmenities.js';
import { getAmenityById } from '../services/amenities/getAmenityByid.js';
import { createAmenity } from '../services/amenities/createAmenity.js';
import { updateAmenityById } from '../services/amenities/updateAmenityById.js';
import { deleteAmenity } from '../services/amenities/deleteAmenity.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const amenities = await getAmenities();
        res.status(200).json(amenities)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while getting list of amenities!')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const amenity = await getAmenityById(id)

        if(!amenity) {
            res.status(404).send(`Amenity with id ${id} was not found!`)
        } else {
            res.status(200).json(amenity)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(`Something went wrong while getting amenity by id!`)
    }
})

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body
        const { newAmenity, problem } = await createAmenity(name);
        if(!newAmenity){
            res.status(400).send(problem);
        } else {
            res.status(201).json(newAmenity)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while creating new amenity!')
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const updatedAmenity = await updateAmenityById(id, name)
        if(!updatedAmenity){
            res.status(404).json(`Amenity with id ${id} was not found!`)
        } else {
            res.status(200).json(updatedAmenity)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while updating amenity by id!')
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAmenityId = await deleteAmenity(id);

        if(!deletedAmenityId) {
            res.status(404).send(`Amenity with id ${id} was not found!`);
        } else {
            res.status(200).json({
                message: `Amenity with id ${deletedAmenityId} was deleted!`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting amenity by id!');
    }
})

export default router;