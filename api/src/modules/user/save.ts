import { Request, Response } from 'express'
import Joi from 'joi'
import { validate } from '../../common/utils/_validate.js'
import { Users } from '../../models/entity/user.entity.js'
import { hashPassword } from '../../common/utils/helper.js'

export const save = async (req: Request, res: Response) => {
  validate(
    req,
    res,
    Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      role: Joi.string().required(),
    })
  )

  const { id, ...fields } = req.body

  let user
  const password = fields.password
  try {
    if (id) {
      user = await Users.update(parseInt(id), fields)
      return res.status(200).send(user)
    } else {
      const hashedPassword = await hashPassword(password)
      user = Users.create({
        ...fields,
        password: hashedPassword,
      })

      await user.save()
    }

    return res.status(201).send({ success: true, message: 'User created successfully', data: user })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
