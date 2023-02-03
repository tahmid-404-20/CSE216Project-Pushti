const { body, check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");

const addUserValidators = [
  
    body("firstname")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("First Name must not contain anything other than alphabet")
    .trim(),
    body("lastname")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Last Name must not contain anything other than alphabet")
    .trim(),
    body("nid")
    .isLength({ min: 10, max: 10 }).withMessage("NID must be 10 digits"),

//   check("email")
//     .isEmail()
//     .withMessage("Invalid email address")
//     .trim()
//     .custom(async (value) => {
//       try {
//         const user = await User.findOne({ email: value });
//         if (user) {
//           throw createError("Email already is use!");
//         }
//       } catch (err) {
//         throw createError(err.message);
//       }
//     }),
  check("phoneNo")
    .isMobilePhone("bn-BD", {
      strictMode: false,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};


module.exports = {
  addUserValidators,
  addUserValidationHandler,
};