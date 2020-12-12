const Property = require("../models/propertyModel");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPropertyImages = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizePropertyImages = async (req, res, next) => {
  try {
  } catch (err) {}
  if (!req.files.coverImage || !req.files.images) return next();

  req.body.coverImage = `property-${Date.now()}-cover.webp`;
  await sharp(req.files.coverImage[0].buffer)
    .resize(2000, 1333)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(`client-side/src/assets/images/property/${req.body.coverImage}`);

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `property-${Date.now()}-${i + 1}.webp`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("webp")
        .webp({ quality: 90 })
        .toFile(`client-side/src/assets/images/property/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
};

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

  const radius =
    unit === "mi" ? (distance * 1) / 3963.2 : (distance * 1) / 6378.1;

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

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

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
            coordinates: [lat * 1, lng * 1],
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

exports.updateOne = async (req, res) => {
  const doc = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    res.status(404).json({
      status: "Error",
      message: "No document Found With that ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
};
