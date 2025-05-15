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
        return { newRecord, problem: null };
    } catch (error){
        let problem = 'An unexpected error occurred.';

        if(error.message?.includes('Invalid `prisma')) {
            const lines = error.message.split('\n');
            const firstReadableLineIndex = lines.findIndex(line => line.trim().startsWith('Argument'));
            if(firstReadableLineIndex !== -1) {
                problem = lines.slice(firstReadableLineIndex).join('\n').trim();
            }
        } else if (error.meta?.target) {
            problem = `Problem with field: ${error.meta.target.join(', ')}`;
        } else if (error.message) {
            problem = error.message;
        }

        return { newRecord: null, problem };
    }
}