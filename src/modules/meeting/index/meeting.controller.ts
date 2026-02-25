import { Request, Response, NextFunction } from "express";
import { MeetingService } from "../service/meeting.service";

export const createMeeting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Get userId from JWT......
    const userId = (req as any).user.id;

    const meeting = await MeetingService.createMeeting({
      ...req.body,
      userId
    });

    res.status(201).json({
      success: true,
      data: meeting
    });
  } catch (err) {
    next(err);
  }
};

export const getMeetings = async (
  req: Request,
  res: Response
) => {
  const meetings = await MeetingService.getMeetings(req.query);

  res.status(200).json({
    success: true,
    data: meetings
  });
};

export const updateMeeting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const meeting = await MeetingService.updateMeeting(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      data: meeting
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMeeting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await MeetingService.deleteMeeting(Number(req.params.id));
     res.status(200).json({
      success: true,
      message: "Meeting deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};