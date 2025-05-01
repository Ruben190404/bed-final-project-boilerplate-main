import prisma from '../../lib/prisma.js'; 

export const updatePropertyById = async (id, hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, amenities) => {
    const currentProperty = await prisma.property.findFirst({
        where: { id: id},
    });
    if(!currentProperty){
      return;
    }

    const data = {
        hostId: hostId ?? currentProperty.hostId,
        title: title ?? currentProperty.title,
        description: description ?? currentProperty.description,
        location: location ?? currentProperty.location,
        pricePerNight: pricePerNight ?? currentProperty.pricePerNight,
        bedroomCount: bedroomCount ?? currentProperty.bedroomCount,
        bathRoomCount: bathRoomCount ?? currentProperty.bathRoomCount,
        maxGuestCount: maxGuestCount ?? currentProperty.maxGuestCount,
        rating: rating ?? currentProperty.rating,
    }

    if (amenities && amenities.length > 0) {
        // Get amenity IDs by name
        const amenityRecords = await prisma.amenity.findMany({
          where: { name: { in: amenities } },
        });
    
        data.amenities = {
          set: amenityRecords.map(a => ({ id: a.id })),
        };
      }

    const property = await prisma.property.update({
        where: { id },
        data,
        include: {
            amenities: {
            select: { name: true },
            },
        },
    });

    return property;
}