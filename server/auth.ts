import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

// Extend Express Session interface to include user
declare module 'express-session' {
  interface SessionData {
    userId: string;
    username: string;
  }
}

// Password hashing utilities
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Authentication middleware
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ 
      error: "Authentication required", 
      message: "Please log in to access this resource" 
    });
  }
  next();
};

// Optional authentication middleware (sets user info if logged in, but doesn't require it)
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  // User info is already available in req.session if logged in
  next();
};

// Check if user is authenticated
export const isAuthenticated = (req: Request): boolean => {
  return !!req.session.userId;
};

// Get current user info from session
export const getCurrentUser = (req: Request): { userId: string; username: string } | null => {
  if (req.session.userId && req.session.username) {
    return {
      userId: req.session.userId,
      username: req.session.username
    };
  }
  return null;
};