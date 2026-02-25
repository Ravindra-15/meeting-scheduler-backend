import { body } from "express-validator";

export const createUserDto = [
  body("name").notEmpty().withMessage("Name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

export const loginDto = [
  body("email").isEmail(),
  body("password").notEmpty()
];