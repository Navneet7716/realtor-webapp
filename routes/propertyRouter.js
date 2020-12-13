const express = require("express");
const PropertyController = require("../controllers/PropertyController");
const AuthController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(PropertyController.getAllProperties)
  .post(AuthController.protect, PropertyController.insertOneProperty);

router.route("/:slugId").get(PropertyController.getOneProperty);
// router
//   .route("/:slugId")
//   .get(AuthController.protect, PropertyController.getOneProperty);

router
  .route("/uploadImage/:id")
  .post(
    AuthController.protect,
    PropertyController.uploadPropertyImages,
    PropertyController.resizePropertyImages,
    PropertyController.updateOne
  );

router
  .route("/distances/:latlng/unit/:unit")
  .get(PropertyController.getDistance);
router
  .route("/properties-within/:distance/center/:latlng/unit/:unit")
  .get(PropertyController.getPropertiesWithin);

module.exports = router;
