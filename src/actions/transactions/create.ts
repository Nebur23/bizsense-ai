"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createTransaction(data: Transaction) {
  console.log({
    data,
  });
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    if (!user.businessId) throw new Error("No business found for this user");

    const businessId = user.businessId;

    // Input validation
    if (!data.type) throw new Error("Transaction type is required");
    if (data.amount === undefined || data.amount === null)
      throw new Error("Transaction amount is required");
    if (!data.accountTransactions || data.accountTransactions.length === 0) {
      throw new Error("At least one account transaction is required");
    }

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async tx => {
      // Create the main transaction record
      const transaction = await tx.transaction.create({
        data: {
          type: data.type,
          amount: data.amount,
          description: data.description,
          categoryId: data.categoryId || null,
          date: data.date,
          customerId: data.customerId || null,
          businessId,
        },
      });

      // Handle account allocations
      for (const accountAllocation of data.accountTransactions ?? []) {
        // Create account transaction record
        await tx.accountTransaction.create({
          data: {
            accountId: accountAllocation.accountId,
            transactionId: transaction.id,
            amount: accountAllocation.amount,
            isTransferSource: accountAllocation.isTransferSource || false,
            isTransferDestination:
              accountAllocation.isTransferDestination || false,
          },
        });

        // Determine balance change based on transaction type
        let balanceChange = 0;

        switch (data.type) {
          case "SALE":
          case "REFUND":
            // Inflows increase balance
            balanceChange = accountAllocation.amount;
            break;
          case "EXPENSE":
          case "PURCHASE":
            // Outflows decrease balance
            balanceChange = -accountAllocation.amount;
            break;
          case "TRANSFER":
            // For transfers, source account decreases, destination increases
            if (accountAllocation.isTransferSource) {
              balanceChange = -accountAllocation.amount;
            } else if (accountAllocation.isTransferDestination) {
              balanceChange = accountAllocation.amount;
            }
            break;
          default:
            // Default case (could be a custom transaction type)
            balanceChange = data.type.includes("INCOME")
              ? accountAllocation.amount
              : -accountAllocation.amount;
        }

        // Update account balance

        await tx.account.update({
          where: { id: accountAllocation.accountId },
          data: {
            balance: { increment: balanceChange },
          },
        });
      }

      return transaction;
    });

    return {
      statusCode: 201,
      message: "Transaction created!!",
      data: {
        businessId,
      },
    };
  } catch (error) {
    console.log("error add Transaction", error);
    return {
      statusCode: 400,
      message: "Transaction failed!!",
    };
  }
}
