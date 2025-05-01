import prisma from '../../lib/prisma.js'; 

export const updateBookingById = async (id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
    const currentBooking = await prisma.booking.findFirst({
        where: {id: id},
    });
    if(!currentBooking){
        return;
    }

    const data = {
        userId: userId ?? currentBooking.userId,
        propertyId: propertyId ?? currentBooking.propertyId,
        checkinDate: checkinDate ?? currentBooking.checkinDate,
        checkoutDate: checkoutDate ?? currentBooking.checkoutDate,
        numberOfGuests: numberOfGuests ?? currentBooking.numberOfGuests,
        totalPrice: totalPrice ?? currentBooking.totalPrice,
        bookingStatus: bookingStatus ?? currentBooking.bookingStatus,
    }

    const booking = await prisma.booking.update({
        where: { id: id},
        data: data,
    })

    return booking;
}