import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { generateToken } from '../../common/utils/jwt.js'
import { CustomUser } from '../../models/types/customUser.js'

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed' })
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    // Generate JWT token including user role
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    })

    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
    })
  })(req, res, next)
}

export const checkAuthStatus = (req: Request, res: Response) => {
  const user = req.user as CustomUser
  if (user) {
    const { password, ...safeUser } = user // Remove password or other sensitive data
    return res.send(safeUser)
  }
  return res.sendStatus(401)
}
