"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updateDefaultAccount(accountId: string): Promise<{
  statusCode: number;
  message: string;
}> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    if (!user.businessId) throw new Error("User businessId not found");

    const businessId = user.businessId;

    // First, unset any existing default account
    await prisma.account.updateMany({
      where: { businessId, isDefault: true },
      data: { isDefault: false },
    });

    // Then set the new default account
    const account = await prisma.account.update({
      where: {
        id: accountId,
        businessId,
      },
      data: { isDefault: true },
    });

    return {
      statusCode: 200,
      message: `${account.name} Account updated as default!`,
    };
  } catch (error) {
    console.error("Error updating default account:", error);
    return {
      statusCode: 500,
      message: "Something went wrong please retry again!",
    };
  }
}
