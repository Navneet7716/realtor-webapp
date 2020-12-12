const mongoose = require("mongoose");
const slugify = require("slugify");

const propertySchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "A property must have a Address!"],
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    dealers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    images: [String],
    coverImage: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    slug: String,
    description: String,
    price: Number,
    constructed: Boolean,
    name: { type: String, required: [true, "Must have a Name"], unique: true },
    rating: {
      type: Number,
      default: 4.5,
    },
    specifications: {
      Propertytype: String,
      unit: String,
      area: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

propertySchema.index({ slug: 1 });
propertySchema.index({ location: "2dsphere" });

propertySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

propertySchema.pre(/^find/, function (next) {
  this.populate({
    path: "owner",
    select: "-__v -passwordChangedAt",
  });

  next();
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
