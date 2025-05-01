import prisma from '../../lib/prisma.js'; 

export const getReviews = async () => {
    const reviews = await prisma.review.findMany();
    return reviews;
}