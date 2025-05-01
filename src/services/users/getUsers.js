import prisma from '../../lib/prisma.js'; 

export const getUsers = async (username, email) => {
    const where = {};

    if (username) {
        where.username = username;
    }

    if (email) {
        where.email = email; 
    }

    const users = await prisma.user.findMany({
        where,
    });
    return users;
}