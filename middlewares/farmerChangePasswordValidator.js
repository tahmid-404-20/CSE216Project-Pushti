const { body, check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");

const addUserValidators = [
    body("newpassword")
    .isNumeric().withMessage(
      "Password must be at least 8 digit and must not contain anything other than number"
    ).isLength({ min: 8})
    .withMessage(
      "Password must be at least 8 digit and must not contain anything other than number"
    ),
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