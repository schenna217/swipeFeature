import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const investors = ["James", "Mary", "Robert", "Patricia", "William", "Jennifer", "Richard", "Linda", "Thomas", "Karen"];

const businesses = [
	"Coffee shop",
	"Cat lover",
	"Restaurant",
	"Gymnasium",
	"Movie theater",
	"Music shop",
	"Travel agency",
	"Park Ranger Service",
	"Video Rental",
	"Yoga Studio",
	"Brewery",
	"Sushi shop",
	"Hiking tour agency",
	"Culinary Academy",
];

const generateBio = () => {
	const descriptors = businesses.sort(() => 0.5 - Math.random()).slice(0, 3);
	return descriptors.join(" | ");
};

const generateRandomUser = (gender, index) => {
	const names = investors === "Investor" ? investors : businesses;
	const name = investors[index];
	const age = Math.floor(Math.random() * (45 - 21 + 1) + 21);
	return {
		name,
		email: `${name.toLowerCase()}${age}@example.com`,
		password: bcrypt.hashSync("password123", 10),
		age,
		bio: generateBio(),
		image: `/${investors}/${index + 1}.jpg`,
	};
};

const seedUsers = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		await User.deleteMany({});

		const allUsers = [...investors];

		await User.insertMany(allUsers);

		console.log("Database seeded successfully with users having concise bios");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.disconnect();
	}
};

seedUsers();
