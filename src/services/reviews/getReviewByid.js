import prisma from '../../lib/prisma.js';

export const getReviewById = async (id) => {
    const where = {};

    if(id){
        where.id = id;
        const review = await prisma.review.findFirst({
            where,
        });
        return review;
    } else {
        return;
    }
}