import prisma from '../../lib/prisma.js';

export const getHostById = async (id) => {
    const where = {};

    if(id){
        where.id = id;
        const host = await prisma.host.findFirst({
            where,
        });
        return host;
    } else {
        return;
    }
}