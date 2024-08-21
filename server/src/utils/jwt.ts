import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Saif@134#444";

export const generateToken = (user: {
  id: number;
  username: string;
  role: string;
}): string => {
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

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
