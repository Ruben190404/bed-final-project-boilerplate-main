import prisma from '../../lib/prisma.js'; 

export const deleteAmenity = async (id) => {
    const amenityExists = await prisma.amenity.findFirst({
        where: {id}
    });

    if(amenityExists){
        await prisma.amenity.delete({
            where: {id: id},
        });
    } else {
        return null;
    }

    return id;
}