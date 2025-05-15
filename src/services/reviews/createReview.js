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
        return { newReview, problem: null };
    } catch (error){
        let problem = 'An unexpected error occurred.';

        if(error.message?.includes('Invalid `prisma')) {
            const lines = error.message.split('\n');
            const firstReadableLineIndex = lines.findIndex(line => line.trim().startsWith('Argument'));
            if(firstReadableLineIndex !== -1) {
                problem = lines.slice(firstReadableLineIndex).join('\n').trim();
            }
        } else if (error.meta?.target) {
            problem = `Problem with field: ${error.meta.target.join(', ')}`;
        } else if (error.message) {
            problem = error.message;
        }
        return { newReview: null, problem };
    }
}