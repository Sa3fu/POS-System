import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { hashPassword } from "../utils/helper.js";
import { Users } from "../entity/user.entity.js";

export const createUser = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array().map((err) => err.msg);
    return res.status(400).send({ error: error });
  }
  const data = matchedData(req);

  data.password = hashPassword(data.password);

  const newUser = Users.create(data);

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in creating user",
      error: error.message,
    });
  }
};
