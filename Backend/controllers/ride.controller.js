const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { destination, pickup, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      destination,
      user: req.user._id,
      pickup,
      vehicleType,
    });
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
