import prisma from '../../lib/prisma.js';

export const getUserById = async (id) => {
    const where = {};

    if(id){
        where.id = id;
        const user = await prisma.user.findFirst({
            where,
        });
        return user;
    } else {
        return;
    }
}