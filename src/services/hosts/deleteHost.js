import prisma from '../../lib/prisma.js'; 

export const deleteHost = async (id) => {
    const hostExists = await prisma.host.findFirst({
        where: {
            id
        },
    });
    if(hostExists){
        await prisma.host.deleteMany({
            where: {id},
        });
    } else {
        return null;
    }
    
    return id;
}