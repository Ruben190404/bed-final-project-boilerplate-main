import prisma from '../../lib/prisma.js'; 

export const updateHostById = async (id, username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
    const currentHost = await prisma.host.findFirst({
        where: { id },
    });
    if(!currentHost){
        return;
    }

    const data = {
        username: username ?? currentHost.username,
        password: password ?? currentHost.password,
        name: name ?? currentHost.name,
        email: email ?? currentHost.email,
        phoneNumber: phoneNumber ?? currentHost.phoneNumber,
        profilePicture: profilePicture ?? currentHost.profilePicture,
        aboutMe: aboutMe ?? currentHost.aboutMe
    }

    const host = await prisma.host.update({
        where: { id: id},
        data: data,
    })

    return host;
}