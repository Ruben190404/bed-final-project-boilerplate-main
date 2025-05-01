import prisma from '../../lib/prisma.js'; 

export const createAmenity = async (name) => {
    let newAmenity;
    try {
        newAmenity = await prisma.amenity.create({
            data: {
                name: name,
            },
        });
    } catch (error){
        newAmenity = null;
    }

    return newAmenity;
}