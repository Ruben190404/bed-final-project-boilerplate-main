import express from 'express';
import { getBookings } from '../services/bookings/getBookings.js';
import { getBookingById } from '../services/bookings/getBookingByid.js';
import { createBooking } from '../services/bookings/createBooking.js';
import { updateBookingById } from '../services/bookings/updateBookingById.js';
import { deleteBooking } from '../services/bookings/deleteBooking.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        const bookings = await getBookings(userId);
        res.status(200).json(bookings)
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while getting list of bookings!')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const booking = await getBookingById(id)

        if(!booking) {
            res.status(404).send(`Booking with id ${id} was not found!`)
        } else {
            res.status(200).json(booking)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(`Something went wrong while getting booking by id!`)
    }
})

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body
        const newBooking = await createBooking(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
        if(!newBooking){
            res.status(400).send(`Request body is not complete!`);
        } else {
            res.status(201).json(newBooking)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while creating new booking!')
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body
        const updatedBooking = await updateBookingById(id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus)
        if(!updatedBooking){
            res.status(404).json(`Booking with id ${id} was not found!`)
        } else {
            res.status(200).json(updatedBooking)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Something went wrong while updating booking by id!')
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBookingId = await deleteBooking(id);

        if(!deletedBookingId) {
            res.status(404).send(`Booking with id ${id} was not found!`);
        } else {
            res.status(200).json({
                message: `Booking with id ${deletedBookingId} was deleted!`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting booking by id!');
    }
})

export default router;