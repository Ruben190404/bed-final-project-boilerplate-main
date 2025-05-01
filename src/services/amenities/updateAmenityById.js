import prisma from '../../lib/prisma.js'; 

export const updateAmenityById = async (id, name) => {
    const currentAmenity = await prisma.amenity.findFirst({
        where: { id: id},
    });
    if(!currentAmenity){
        return;
    }

    const data = {
        name: name ?? currentAmenity.name,
    }

    const amenity = await prisma.amenity.update({
        where: { id: id},
        data: data,
    });

    return amenity;
}