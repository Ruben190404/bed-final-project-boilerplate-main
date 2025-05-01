import prisma from '../../lib/prisma.js'; 

export const updateReviewById = async (id, rating, comment) => {
    const currentReview = await prisma.review.findFirst({
        where: { id: id },
    });

    if(!currentReview){
        return;
    }
    
    const data = {
        rating: rating ?? currentReview.rating,
        comment: comment ?? currentReview.comment,
    };

    const review = await prisma.review.update({
        where: {id: id},
        data: data,
    })

    return review;
}