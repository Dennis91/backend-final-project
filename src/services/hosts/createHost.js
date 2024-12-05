import { PrismaClient } from "@prisma/client";

const createHost = async (newHost) => {
	const prisma = new PrismaClient();
	const host = await prisma.host.create({
		data: newHost,
	});

	return host;
};

export default createHost;
