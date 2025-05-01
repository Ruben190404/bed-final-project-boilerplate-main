import prisma from '../../lib/prisma.js';

export const getPropertyById = async (id) => {
    const where = {};

    if(id){
        where.id = id;
        const property = await prisma.property.findFirst({
            where,
        });
        return property;
    } else {
        return;
    }
}