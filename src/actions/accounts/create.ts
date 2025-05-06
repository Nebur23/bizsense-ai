"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function createAccount(data: CreateAccount): Promise<{
  statusCode: number;
  message: string;
}> {
  const {
    name,
    type,
    provider,
    accountNumber = null,
    balance,
    isDefault,
    currency = "XAF",
  } = data;
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });
    const userId = session?.user.id;

    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    if (!user.businessId) throw new Error("User businessId not found");

    const businessId = user.businessId;

    const existingAccount = await prisma.financialAccount.findFirst({
      where: { businessId, name },
    });

    if (existingAccount) {
      return {
        statusCode: 403,
        message: "Account with this name already exist",
      };
    }

    if (isDefault) {
      await prisma.financialAccount.updateMany({
        where: { businessId, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await prisma.financialAccount.create({
      data: {
        name,
        type,
        provider,
        accountNumber,
        balance,
        isDefault,
        currency,
        businessId,
      },
    });

    return {
      statusCode: 201,
      message: `${account.name} Account created successfully!`,
    };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      statusCode: 500,
      message: "Something went wrong please retry again!",
    };
  }
}
