import prisma from '../../lib/prisma.js'; 

export const deleteUser = async (id) => {
    const userExists = await prisma.user.findFirst({
        where: {
            id
        },
    });

    if(userExists){
        await prisma.review.deleteMany({
            where: {
                userId: id,
            }
        });
        await prisma.booking.deleteMany({
            where: {
                userId: id,
            }
        });
    
        await prisma.user.delete({
            where: {id: id},
        });
    } else {
        return null;
    }

    return id;
}