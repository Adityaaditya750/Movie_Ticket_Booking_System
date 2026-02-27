const Theatre = require("../model/Theatre");

exports.addTheatre = async (req, res) => {
  try {
    const { name, location, rows, columns } = req.body;

    const theatre = await Theatre.create({
      name,
      location,
      rows,
      columns
    });

    res.status(201).json({
      message: "Theatre added successfully",
      theatre
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTheatres = async (req, res) => {
  const theatres = await Theatre.find();
  res.json(theatres);
};