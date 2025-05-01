import prisma from '../../lib/prisma.js';

export const getAmenityById = async (id) => {
    const where = {};
    if(id){
        where.id = id;
        const amenity = await prisma.amenity.findFirst({
            where,
        });
        return amenity;
    } else {
        return;
    }
}