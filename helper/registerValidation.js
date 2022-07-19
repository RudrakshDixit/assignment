//validation for name and location provided
exports.validateRegister = (req) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      throw "All the details are required";
    }

    if (location.length != 2) {
      throw "Inaccurate location";
    }

    return [name, location];
  } catch (err) {
    throw err;
  }
};
