const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const registerRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('Name must be between 2 and 60 characters'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be 8–16 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  body('address')
    .optional()
    .isLength({ max: 400 })
    .withMessage('Address must be at most 400 characters'),
];

/**
 * Validation rules for login
 */
const loginRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Validation rules for changing password
 */
const changePasswordRules = [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword')
    .isLength({ min: 8, max: 16 })
    .withMessage('New password must be 8–16 characters')
    .matches(/[A-Z]/)
    .withMessage('New password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('New password must contain at least one special character'),
];

const storeRules = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Store name is required and must be at most 100 characters'),
  body('email').isEmail().withMessage('Valid store email is required').normalizeEmail(),
  body('address')
    .trim()
    .isLength({ min: 1, max: 400 })
    .withMessage('Store address is required'),
];

const ratingRules = [
  body('score')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating score must be an integer between 1 and 5'),
];

module.exports = {
  validate,
  registerRules,
  loginRules,
  changePasswordRules,
  storeRules,
  ratingRules,
};
