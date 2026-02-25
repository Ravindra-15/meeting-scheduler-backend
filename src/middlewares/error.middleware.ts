import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);

  res.status(400).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};