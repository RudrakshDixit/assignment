exports.assignDriver = (user, drivers, distLimit) => {
  //user coordinate
  const coord1 = user.location;
  let selectedDriver;
  //if no limit is there then the max distance will be calculated
  let maxDis = distLimit || 1000000;
  for (let driver of drivers) {
    //is driver is unavailable then continuing
    if (!driver.available) {
      continue;
    }
    let driverLocation = driver.location;

    //getting distance
    let distance = getDistance(coord1, driverLocation);

    if (distance > distLimit) {
      continue;
    }

    //setting the nearest driver
    if (distance < maxDis) {
      selectedDriver = driver;
      maxDis = distance;
    }
  }

  return selectedDriver;
};

const getDistance = (coord1, coord2) => {
  //calculating the distance between 2 coordinates
  return Math.sqrt(
    Math.pow(coord2[0] - coord1[0], 2) + Math.pow(coord2[1] - coord1[1], 2)
  );
};
