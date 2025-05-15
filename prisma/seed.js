import { PrismaClient } from '../src/generated/prisma/client.js'
import amenitiesData from '../src/data/amenities.json' with { type: 'json' };
import bookingsData from '../src/data/bookings.json' with { type: 'json' };
import hostsData from '../src/data/hosts.json' with { type: 'json' };
import propertiesData from '../src/data/properties.json' with { type: 'json' };
import reviewsData from '../src/data/reviews.json' with { type: 'json' };
import usersData from '../src/data/users.json' with { type: 'json' };

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
const randomSubset = (arr, n) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);


async function main() {
  const { amenities } = amenitiesData;
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;

  // Upsert Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Upsert Hosts
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  // Upsert Amenities
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  // Upsert Properties
  // for (const property of properties) {
  //   const isMalibu = property.location.toLowerCase().includes('malibu');
  //   let amenityIds = [];

  //   if (isMalibu) {
  //     const wifi = await prisma.amenity.findFirst({
  //       where: { name: { equals: 'Wifi', mode: 'insensitive' } },
  //     });
  //     if (wifi) amenityIds = [wifi.id];
  //   } else {
  //     const randomAmenities = randomSubset(amenities, Math.floor(Math.random() * 4) + 3);
  //     amenityIds = randomAmenities.map(a => a.id);
  //   }

  //   await prisma.property.create({
  //     data: {
  //       ...property,
  //       amenities: {
  //         connect: amenityIds.map(id => ({ id })),
  //       },
  //     },
  //   });
  // }

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id},
      update: {},
      create: property,
    });
  }

  // Upsert Bookings
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  // Upsert Reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });