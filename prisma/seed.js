import { PrismaClient } from "@prisma/client";
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

function getRandomAmenities(amenities) {
	const count = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
	return amenities.slice(0, count);
}

async function main() {
	const { amenities } = amenitiesData;
	const { bookings } = bookingsData;
	const { hosts } = hostsData;
	const { properties } = propertiesData;
	const { reviews } = reviewsData;
	const { users } = usersData;

	for (const amenity of amenities) {
		await prisma.amenity.upsert({
			where: { id: amenity.id },
			update: {},
			create: amenity,
		});
	}

	for (const user of users) {
		await prisma.user.upsert({
			where: { id: user.id },
			update: {},
			create: {
				id: user.id,
				username: user.username,
				password: user.password,
				name: user.name,
				email: user.email,
				phoneNumber: user.phoneNumber,
				pictureUrl: user.profilePicture,
			},
		});
	}

	for (const host of hosts) {
		await prisma.host.upsert({
			where: { id: host.id },
			update: {},
			create: {
				id: host.id,
				username: host.username,
				password: host.password,
				name: host.name,
				email: host.email,
				phoneNumber: host.phoneNumber,
				pictureUrl: host.profilePicture,
				aboutMe: host.aboutMe,
			},
		});
	}

	for (const property of properties) {
		const randomAmenities = getRandomAmenities(amenities);
		await prisma.property.upsert({
			where: { id: property.id },
			update: {},
			create: {
				id: property.id,
				title: property.title,
				description: property.description,
				location: property.location,
				pricePerNight: property.pricePerNight,
				bedroomCount: property.bedroomCount,
				bathroomCount: property.bathRoomCount,
				maxGuestCount: property.maxGuestCount,
				rating: property.rating,
				host: {
					connect: { id: property.hostId },
				},
				amenities: {
					connect: randomAmenities.map((amenity) => ({ id: amenity.id })),
				},
			},
		});
	}

	for (const booking of bookings) {
		await prisma.booking.upsert({
			where: { id: booking.id },
			update: {},
			create: {
				id: booking.id,
				checkinDate: booking.checkinDate,
				checkoutDate: booking.checkoutDate,
				numberOfGuests: booking.numberOfGuests,
				totalPrice: booking.totalPrice,
				bookingStatus: booking.bookingStatus,
				// user: {
				// 	connect: { id: booking.userId },
				// },
				property: {
					connect: { id: booking.propertyId },
				},
			},
		});
	}

	for (const review of reviews) {
		await prisma.review.upsert({
			where: { id: review.id },
			update: {},
			create: {
				id: review.id,
				userId: review.userId,
				rating: review.rating,
				comment: review.comment,
				// user: { connect: { id: review.userId } },
				property: { connect: { id: review.propertyId } },
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
