import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Saif@134#444";

interface UserPayload extends JwtPayload {
  id: number;
  username: string;
  role: string;
}

export const generateToken = (user: UserPayload): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token: string): UserPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
