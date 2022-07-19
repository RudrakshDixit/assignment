const { validateRegister } = require("../helper/registerValidation");
const { getDrivers } = require("./driver.controller");
const users = [];
const trips = new Map();

const { v4: uuidv4 } = require("uuid");
const { assignDriver } = require("../helper/matching");

//TO REGISTER THE USER
exports.registerUser = async (req, res) => {
  try {
    const { name, location } = validateRegister(req);

    // SAVING NAME, LOCATION AND ID IN THE users array
    const userObject = {
      name,
      location,
      id: uuidv4(),
    };

    //pushing user object in array
    users.push(userObject);

    return res.status(200).json({
      user: userObject,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: err,
    });
  }
};

exports.startTrip = async (req, res) => {
  try {
    //getting all the drivers
    const drivers = getDrivers();

    //getting user and total distance limit
    const { user, distLimit, endLocation } = req.body;

    if (!user) {
      throw "User is required";
    }

    if (!endLocation) {
      throw "endLocation is required";
    }

    //checking if already running trip
    if (trips.get(user.id.toString())) {
      throw "Already travelling";
    }

    //getting the assigned Driver
    const driver = assignDriver(user, drivers, distLimit);

    if (!driver) {
      throw "No driver found";
    }

    //saving trip details
    trips.set(user.id.toString(), {
      driverID: driver.id,
      endLocation: endLocation,
    });

    return res.status(200).json({
      driver,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: err,
    });
  }
};

exports.endTrip = async (req, res) => {
  try {
    const { user } = req.body;
    const drivers = getDrivers();
    let details = trips.get(user.id.toString());

    for (let people of users) {
      if ((people.id = user.id)) {
        people.location = details.endLocation;
        break;
      }
    }

    //getting driverID

    let driverID = details.driverID;
    //updating the driver's location when to the destination of the user
    for (let driver of drivers) {
      if ((driver.id = driverID)) {
        driver.location = details.endLocation;
        break;
      }
    }

    //removing the trip
    trips.delete(user.id.toString());

    res.status(200).json({
      message: "Trip ended",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: err,
    });
  }
};
