import { Request, Response } from 'express'
import { validationResult, matchedData } from 'express-validator'
import { hashPassword } from '../../common/utils/helper'
import { Users } from '../../models/entity/user.entity'
// POST
export const createUser = async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    const error = result.array().map((err) => err.msg)
    return res.status(400).send({ error: error })
  }

  const data = matchedData(req)

  // Hash
  data.password = hashPassword(data.password)

  // Users - create
  const newUser = Users.create(data)

  try {
    // Users - save
    const savedUser = await newUser.save()

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in creating user',
      error: error.message,
    })
  }
}
