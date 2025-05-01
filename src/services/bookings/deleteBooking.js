import prisma from '../../lib/prisma.js'; 

export const deleteBooking = async (id) => {
    const bookingExists = await prisma.booking.findFirst({
        where: {
            id
        },
    });

    if(bookingExists){
        await prisma.booking.delete({
            where: {id: id},
        });
    } else {
        return null;
    }
    return id;
}