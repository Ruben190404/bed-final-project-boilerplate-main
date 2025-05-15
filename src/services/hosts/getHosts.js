import prisma from '../../lib/prisma.js';

export const getHosts = async (name) => {
    const where = {};

    if (name) {
        where.name = {
            contains: name,
            mode: "insensitive"
        };
    }

    const hosts = await prisma.host.findMany({
        where,
    })
    return hosts;
}