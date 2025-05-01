import prisma from '../../lib/prisma.js'; 

export const deleteProperty = async (id) => {
    const propertyExists = await prisma.property.findFirst({
        where: {
            id
        }
    });

    if(propertyExists){
        await prisma.property.update({
            where: { id },
            data: {
                amenities: {
                    set: []
                },
            },
        });
    
        await prisma.review.deleteMany({
            where: {propertyId: id},
        });
    
        await prisma.booking.deleteMany({
            where: {propertyId: id},
        });
        
        await prisma.property.delete({
            where: {id: id},
        });
    } else {
        return null;
    }


    return id;
}