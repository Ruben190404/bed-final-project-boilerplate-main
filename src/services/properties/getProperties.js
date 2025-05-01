import prisma from '../../lib/prisma.js'; 

export const getProperties = async (location, pricePerNight, amenities) => {
    const where = {};

    if (location) {
        where.location = location;
    }

    if(pricePerNight) {
        where.pricePerNight = pricePerNight;
    }

    if(amenities) {
        where.amenities = {
            some: {
                name: amenities,
            }
        };
    }

    const properties = await prisma.property.findMany({
        where,
        include: {
            amenities: {
                select: {
                    name: true,
                }
            },
        }
    });

    return properties;
}