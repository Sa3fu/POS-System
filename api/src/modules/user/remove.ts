import { Request, Response } from 'express'
import { Users } from '../../models/entity/user.entity.js'

//Update product PATCH
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const data = await Users.update(parseInt(id), { isDelete: true })
    return res.status(201).send({ success: true, message: 'User removed successfully', data })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
