import { PrismaClient } from "@prisma/client";

const createProperty = async (newProperty) => {
	const prisma = new PrismaClient();
	const property = await prisma.property.create({
		data: newProperty,
	});

	return property;
};

export default createProperty;
