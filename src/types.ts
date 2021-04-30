import { Request, Response } from "express";

export type MyContext = {
  req: Request;
  res: Response;
  payload?: { userId: string, email: string };
};

export type UserLinkedEntity = {
  roles: string[];
};