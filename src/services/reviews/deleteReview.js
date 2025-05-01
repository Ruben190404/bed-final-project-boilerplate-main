import prisma from '../../lib/prisma.js'; 

export const deleteReview = async (id) => {
    const reviewExists = await prisma.review.findFirst({
        where: {
            id
        },
    });

    if(reviewExists){
        await prisma.review.delete({
            where: {id: id},
        });
    } else {
        return null
    }
    
    return id;
}