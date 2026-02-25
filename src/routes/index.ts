import { Router } from "express";

import {
  createMeeting,
  getMeetings,
  updateMeeting,
  deleteMeeting
} from "../modules/meeting/index/meeting.controller";

import {
  createUser,
  getUser,
  loginUser
} from "../modules/user/index/user.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";

import {
  createUserDto,
  loginDto
} from "../modules/user/dto/user.dto";

import {
  createMeetingDto,
  updateMeetingDto
} from "../modules/meeting/dto/meeting.dto";

const router = Router();

//USER ROUTES 

router.post(
  "/users",
  createUserDto,
  validate,
  createUser
);

router.post(
  "/login",
  loginDto,
  validate,
  loginUser
);

router.get(
  "/users/:id",
  authenticate,
  getUser
);

// MEETING ROUTES  

router.post(
  "/meetings",
  authenticate,
  createMeetingDto,
  validate,
  createMeeting
);

router.get(
  "/meetings",
  authenticate,
  getMeetings
);

router.put(
  "/meetings/:id",
  authenticate,
  updateMeetingDto,
  validate,
  updateMeeting
);

router.delete(
  "/meetings/:id",
  authenticate,
  deleteMeeting
);

export default router;