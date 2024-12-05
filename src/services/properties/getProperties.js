import { PrismaClient } from "@prisma/client";

const getProperties = async (filters = {}) => {
	const prisma = new PrismaClient();
	const { location, pricePerNight, amenities } = filters;
	const properties = await prisma.property.findMany({
		where: {
			location: location && location,
			pricePerNight: pricePerNight && parseFloat(pricePerNight),
			amenities: amenities && {
				some: {
					name: {
						equals: amenities,
					},
				},
			},
		},
		include: {
			amenities: true,
		},
	});

	return properties;
};

export default getProperties;
