import prisma from '../../lib/prisma.js'; 

export const createUser = async (username, password, name, email, phoneNumber, profilePicture) => {
    let newUser;
    try {
        newUser = await prisma.user.create({
            data: {
                username: username,
                password: password,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                profilePicture: profilePicture,
            },
        });
    } catch (error){
        newUser = null;
    }

    return newUser;
}