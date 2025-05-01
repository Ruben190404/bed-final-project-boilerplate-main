import prisma from '../../lib/prisma.js'; 

export const getBookings = async (userId) => {
    const where = {};

    if (userId) {
        where.userId = userId;
    }

    const bookings = await prisma.booking.findMany({
        where,
    });
    return bookings;
}