import { NextFunction, Request, Response } from "express";
import User from "../interfaces/userInterface";
import UserModel from "../models/userModel";
import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";

export const NothingYet = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  //
} )