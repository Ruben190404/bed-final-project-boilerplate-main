import prisma from '../../lib/prisma.js'; 

export const getAmenities = async () => {
    const amenities = await prisma.amenity.findMany({});

    return amenities;
}