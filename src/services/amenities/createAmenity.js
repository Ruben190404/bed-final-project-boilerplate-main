import prisma from '../../lib/prisma.js'; 

export const createAmenity = async (name) => {
    let newAmenity;
    try {
        newAmenity = await prisma.amenity.create({
            data: {
                name: name,
            },
        });
        return { newAmenity, problem: null };
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
        return { newAmenity, problem: null };
    }
}