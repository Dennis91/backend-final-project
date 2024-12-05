import { PrismaClient } from "@prisma/client";

const getHosts = async (filters = {}) => {
	const prisma = new PrismaClient();
	const { name } = filters;

	const hosts = await prisma.host.findMany({
		where: {
			name: name && name,
		},
	});

	return hosts;
};

export default getHosts;
