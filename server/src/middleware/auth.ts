import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?: any;
}

// 🧩 Verify that a valid JWT exists and the user is admin
export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = (req.headers as any).authorization; // <-- fix for TS "headers" type issue
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & {
      role?: string;
    };

    if (decoded.role !== "admin") {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
