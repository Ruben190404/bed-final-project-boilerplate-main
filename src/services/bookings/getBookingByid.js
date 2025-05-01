import prisma from '../../lib/prisma.js';

export const getBookingById = async (id) => {
    const where = {};

    if(id){
        where.id = id;
        const booking = await prisma.booking.findFirst({
            where,
        });
        return booking;
    } else {
        return;
    }
}