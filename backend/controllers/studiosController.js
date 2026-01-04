const prisma = require("../utils/prisma.js");

const getAllStudios = async (req, res) => {
  try {
    const studios = await prisma.studio.findMany();

    const studiosImages = studios.map((studio) => ({
      ...studio,
      imageUrl: `http://localhost:5000/uploads/${studio.imageUrl}`,
    }));

    res.json(studiosImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch studios" });
  }
};

module.exports = { getAllStudios };
