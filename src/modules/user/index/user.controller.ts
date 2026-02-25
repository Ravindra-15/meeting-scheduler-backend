import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.login(
      req.body.email,
      req.body.password
    );

    res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}; 

export const getUser = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const requestedUserId = Number(req.params.id);
    const loggedInUserId = (req as any).user.id;

    //Prevent accessing other users
    if (requestedUserId !== loggedInUserId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this profile"
      });
    }

    const user = await UserService.getUser(requestedUserId);

    //Remove password before sending
    const userData = user.toJSON();
    delete userData.password;

    res.status(200).json({
      success: true,
      data: userData
    });

  } catch (err) {
    next(err);
  }
};