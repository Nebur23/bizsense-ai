"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserAccounts(): Promise<Account[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.businessId) throw new Error("User businessId not found");

  const businessId = user.businessId;

  const accounts = await prisma.account.findMany({
    where: { businessId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  //console.log("accounts", JSON.stringify(accounts, null, 2));

  return accounts;
}

export async function getAccountWithTransactions(
  accountId: string
): Promise<AccountTransactions | null> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  if (!user.businessId) throw new Error("User businessId not found");

  const businessId = user.businessId;

  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
      businessId,
    },
    include: {
      transactions: {
        include: {
          transaction: {
             include: {
               category: true,
             },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: { transactions: true },
      },
    },
  });

  if (!account) return null;

  //console.log("============ acount with transactions===========");
  //console.log(JSON.stringify(account, null, 2));

  return account;
}
