import express from 'express';
import { getProperties } from '../services/properties/getProperties.js';
import { getPropertyById } from '../services/properties/getPropertyByid.js';
import { createProperty } from '../services/properties/createProperty.js';
import { updatePropertyById } from '../services/properties/updatePropertyById.js';
import { deleteProperty } from '../services/properties/deleteProperty.js';
import authMiddleware from '../middleware/auth.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { location, pricePerNight, amenities } = req.query;
        const properties = await getProperties(location, pricePerNight, amenities);
        res.status(200).json(properties)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while getting list of properties!')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const property = await getPropertyById(id)

        if(!property) {
            res.status(404).send(`Property with id ${id} was not found!`)
        } else {
            res.status(200).json(property)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(`Something went wrong while getting property by id!`)
    }
})

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, amenityArray } = req.body
        const newProperty = await createProperty(hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, amenityArray);
        if(!newProperty){
            res.status(400).send(`Request body is not complete!`); 
        } else {
            res.status(201).json(newProperty)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while creating new property!')
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, amenities } = req.body
        const updatedProperty = await updatePropertyById(id, hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, amenities)
        if(!updatedProperty){
            res.status(404).json(`Property with id ${id} was not found!`)
        } else {
            res.status(200).json(updatedProperty)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while updating property by id!')
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPropertyId = await deleteProperty(id);

        if(!deletedPropertyId) {
            res.status(404).send(`Property with id ${id} was not found!`);
        } else {
            res.status(200).json({
                message: `Property with id ${deletedPropertyId} was deleted!`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting property by id!');
    }
})

export default router;