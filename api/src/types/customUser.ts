// src/types/customUser.d.ts
export interface CustomUser {
  id: number;
  username: string;
  password?: string; // Optional if it's not always present
  role: string;
}
