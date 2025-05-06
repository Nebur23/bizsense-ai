"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getCategories(): Promise<Category[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const categories = await prisma.category.findMany();

  //console.log("accounts", JSON.stringify(accounts, null, 2));

  return categories;
}
