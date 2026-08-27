import prisma from "../lib/prisma.js";

export async function createUser(username, password) {
  return await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

export async function findByUsername(username) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

export async function findByUserID(id) {
  return await prisma.user.findUnique({
    where: { id },
  });
}
