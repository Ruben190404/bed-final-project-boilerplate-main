import prisma from '../../lib/prisma.js'; 

export const createReview = async (userId, propertyId, rating, comment) => {
    let newReview;

    try {
        newReview = await prisma.review.create({
            data: {
                userId: userId, 
                propertyId: propertyId, 
                rating: rating, 
                comment: comment,
            }
        });
    } catch (error){
        newReview = null;
    }

    return newReview;
}