const Property = require("../models/propertyModel");

exports.getAllProperties = async (req, res, next) => {
  try {
    const doc = await Property.find().populate({
      path: "dealers",
    });

    if (!doc) {
      res.status(404).json({
        status: "Error",
        message: "No Property Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Error",
      message: "No Property Found",
    });
  }
};

exports.getOneProperty = async (req, res, next) => {
  try {
    const doc = await Property.find({ slug: req.params.slugId }).populate({
      path: "dealers",
    });
    if (!doc) {
      res.status(404).json({
        status: "Error",
        message: "Cannout find any property with that name",
      });
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Error",
      message: "Cannout find any property with that name",
    });
  }
};

exports.insertOneProperty = async (req, res, next) => {
  try {
    const doc = await Property.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Property Created!",
      data: doc,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Error",
      message: "Could not create a property",
    });
  }
};

exports.getPropertiesWithin = async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    res.status(400).json({
      status: "Error",
      message:
        "Please provide the Latitude and Longitude in the format lat,lng",
    });
  }

  try {
    const property = await Property.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
      status: "success",
      results: property.length,
      data: {
        data: property,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Error cannot get property",
    });
  }
};

exports.getDistance = async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const multiplier = unit === "mi" ? 0.000621371 : 0.0001;

  if (!lng || !lat) {
    res.status(400).json({
      status: "Error",
      message:
        "Cannot calculate the distance Guys 😥, Please provide Latitude and Longitude in the format lat,lng.",
    });
  }

  try {
    const distance = await Property.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng * 1, lat * 1],
          },
          distanceField: "distance",
          distanceMultiplier: multiplier,
        },
      },
      {
        $project: {
          distance: 1,
          name: 1,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        data: distance,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Error",
      message: "Some Error Occured 🤖.",
    });
  }
};
