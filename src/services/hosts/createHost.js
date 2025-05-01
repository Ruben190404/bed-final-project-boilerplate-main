import prisma from '../../lib/prisma.js'; 

export const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
    let newHost;
    try {
        newHost = await prisma.host.create({
            data: {
                username,
                password,
                name,
                email,
                phoneNumber,
                profilePicture,
                aboutMe
            }
        }); 
    } catch (error){
        newHost = null;
    }

    return newHost;
}