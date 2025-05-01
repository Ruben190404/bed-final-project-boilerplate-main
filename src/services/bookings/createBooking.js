import prisma from '../../lib/prisma.js'; 

export const createBooking = async (userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
    let newRecord;
    try {
        newRecord = await prisma.booking.create({
            data: {
                userId: userId,
                propertyId: propertyId,
                checkinDate: checkinDate,
                checkoutDate: checkoutDate,
                numberOfGuests: numberOfGuests,
                totalPrice: totalPrice,
                bookingStatus: bookingStatus,
            }
        });
    } catch (error){
        newRecord = null;
    }


    return newRecord;
}