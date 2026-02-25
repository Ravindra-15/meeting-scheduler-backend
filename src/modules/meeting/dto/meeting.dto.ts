import { body } from "express-validator";

export const createMeetingDto = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("startTime")
    .isISO8601()
    .withMessage("Valid startTime required"),

  body("endTime")
    .isISO8601()
    .withMessage("Valid endTime required")
];

export const updateMeetingDto = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("startTime")
    .optional()
    .isISO8601()
    .withMessage("Valid startTime required"),

  body("endTime")
    .optional()
    .isISO8601()
    .withMessage("Valid endTime required")
];