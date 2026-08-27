import bcrypt from "bcryptjs";
import * as user from "../models/user.js";

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12); // 12 rounds is standard
}

export async function validatePassword(passwordInput, userPassword) {
  return await bcrypt.compare(passwordInput, userPassword);
}
