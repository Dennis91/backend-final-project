import { PrismaClient } from "@prisma/client";

const getBookings = async (filters = {}) => {
	const prisma = new PrismaClient();
	const { userId } = filters;

	const bookings = await prisma.booking.findMany({
		where: {
			userId: userId && userId,
		},
	});

	return bookings;
};

export default getBookings;
