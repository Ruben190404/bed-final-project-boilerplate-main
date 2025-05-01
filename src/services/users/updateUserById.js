import prisma from '../../lib/prisma.js'; 

export const updateUserById = async (id, username, password, name, email, phoneNumber, profilePicture) => {
    const currentUser = await prisma.user.findFirst({
        where: { id: id},
    });
    if(!currentUser){
        return;
    }

    const data = {
        username: username ?? currentUser.username,
        password: password ?? currentUser.password,
        name: name ?? currentUser.name,
        email: email ?? currentUser.email,
        phoneNumber: phoneNumber ?? currentUser.phoneNumber,
        profilePicture: profilePicture ?? currentUser.profilePicture,
    }

    const user = await prisma.user.update({
        where: { id: id},
        data: data,
    })

    return user;
}