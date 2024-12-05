import { PrismaClient } from "@prisma/client";

const createUser = async (newUser) => {
	const prisma = new PrismaClient();
	const user = await prisma.user.create({
		data: newUser,
	});

	return user;
};

export default createUser;
