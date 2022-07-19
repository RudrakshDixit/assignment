const { validateRegister } = require("../helper/registerValidation");
const drivers = [];
const { v4: uuidv4 } = require("uuid");

exports.registerDriver = async (req, res) => {
  try {
    //validation for drivers
    const { name, location } = validateRegister(req);

    //creating driver object
    const driverObject = {
      name,
      location,
      id: uuidv4(),
      available: true,
    };

    drivers.push(driverObject);
    return res.status(200).json({
      driver: driverObject,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: err,
    });
  }
};

//toggling the availability of the driver

exports.toggleAvailability = async (req, res) => {
  try {
    const { driverID, location, type } = req.body;

    //if type is on then new location is required
    if (type == "on" && !location) {
      throw "Location is required";
    }

    //setting driver location and toggling the availability
    for (let driver of drivers) {
      if (driverID == driver.id) {
        driver.available = !driver.available;
        if (type == "on") driver.location = location;
        break;
      }
    }
    return res.status(200).json({
      message: "changed",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: err,
    });
  }
};
exports.getDrivers = () => {
  return drivers;
};
