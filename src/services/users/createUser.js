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
        return { newUser, problem: null};
    } catch (error){
        let problem = 'An unexpected error occurred.';

        if(error.message?.includes('Invalid `prisma')) {
            const lines = error.message.split('\n');
            const firstReadableLineIndex = lines.findIndex(line => line.trim().startsWith('Argument'));
            if(firstReadableLineIndex !== -1) {
                problem = lines.slice(firstReadableLineIndex).join('\n').trim();
            }
        } else if (error.meta?.target) {
            problem = `Problem with field: ${error.meta.target.join(', ')}`;
        } else if (error.message) {
            problem = error.message;
        }
        return { newUser: null, problem };
    }

}