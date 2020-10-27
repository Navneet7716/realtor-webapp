const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const csp = require("express-csp");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const helmet = require("helmet");

const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");

const xss = require("xss-clean");

const hpp = require("hpp");

const cookieParser = require("cookie-parser");

// IMPORTING MY ROUTES

const propertyRouter = require("./routes/propertyRouter");
const userRouter = require("./routes/userRouter");

const app = express();
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

app.use(cors());
app.use(compression());
app.use(express.static(process.cwd() + "/dist/client/"));

csp.extend(app, {
  policy: {
    directives: {
      "default-src": ["self"],
      "style-src": ["self", "unsafe-inline", "https:"],
      "font-src": ["self", "https://fonts.gstatic.com"],
      "script-src": [
        "self",
        "unsafe-inline",
        "data",
        "blob",
        "https://js.stripe.com",
        "https://api.mapbox.com",
        "https://cdnjs.cloudflare.com",
        "https://cdnjs.cloudflare.com",
        "http://localhost:3000",
        "https://cdn.jsdelivr.net/",
        "https://code.jquery.com",
      ],
      "worker-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        "https://js.stripe.com",
        "https://api.mapbox.com",
        "https://cdnjs.cloudflare.com",
        "http://localhost:3000",
      ],
      "frame-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        "https://js.stripe.com",
        "https://api.mapbox.com",
        "http://localhost:3000",
      ],
      "img-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        "https://js.stripe.com",
        "https://api.mapbox.com",
        "https://cdnjs.cloudflare.com",
        "http://localhost:3000",
      ],
      "connect-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        "https://api.mapbox.com",
        "https://events.mapbox.com",
        "https://cdnjs.cloudflare.com",
        "http://localhost:3000",
      ],
    },
  },
});
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https:", "http:", "data:", "ws:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "http:", "data:"],
      scriptSrc: ["'self'", "https:", "http:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());

// Data sanitization against XSS

app.use(xss());

// Prevent Parameter pollution

app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
// app.use(express.static(`${__dirname}/public`));

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTION SUCCESSFUL 🔥"));

app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/users", userRouter);
// app.all("*", (req, res, next) => {
//   // const err = new Error();
//   // err.status = 'fail';
//   // err.statusCode = 404;
//   res.redirect("/");
// });
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/dist/client/index.html");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Started at ${port}`));
