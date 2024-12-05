import { PrismaClient } from "@prisma/client";

const getUsers = async (filters = {}) => {
	const prisma = new PrismaClient();
	const { username, email } = filters;

	const users = await prisma.user.findMany({
		where: {
			username: username && username,
			email: email && email,
		},
	});

	const usersWithoutPassword = users.map((user) => {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	});
	return usersWithoutPassword;
};

export default getUsers;
