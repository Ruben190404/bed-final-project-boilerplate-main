import prisma from '../../lib/prisma.js'; 

export const createProperty = async (hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, amenityArray) => {
    let newProperty;
    
    try {
        let amenityIds = [];

        if(amenityArray){
            amenityIds = await Promise.all(
                amenityArray.map( async (amenity) => {
                    //console.log(amenity);
                    const amenityId = await prisma.amenity.findFirst({
                        where: {name: amenity},
                    });
                    if (!amenityId) {
                        throw new Error(`Amenity not found: ${amenity}`);
                    }
                    return amenityId.id;
                })
            );
        }
        
        newProperty = await prisma.property.create({
            data: {
                hostId: hostId,
                title: title,
                description: description,
                location: location,
                pricePerNight: pricePerNight,
                bedroomCount: bedroomCount,
                bathRoomCount: bathRoomCount,
                maxGuestCount: maxGuestCount,
                rating: rating,
                amenities: {
                    connect: amenityIds.map((id) => ({ id })) // 👈 This connects the amenities
                  }
            }
        });
        return { newProperty, problem: null };
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

        return { newProperty: null, problem}
    }
}