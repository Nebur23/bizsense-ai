// seedCategories.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const transactionToCategoryTypeMap: Record<
  string,
  "INCOME" | "EXPENSE" | "TRANSFER"
> = {
  SALE: "INCOME",
  PURCHASE: "EXPENSE",
  EXPENSE: "EXPENSE",
  REFUND: "INCOME",
  TRANSFER: "TRANSFER",
  LOAN_DISBURSEMENT: "INCOME",
  LOAN_REPAYMENT: "EXPENSE",
  SUBSCRIPTION_PAYMENT: "EXPENSE",
  INVESTMENT_INFLOW: "INCOME",
  INVESTMENT_OUTFLOW: "EXPENSE",
  TAX_PAYMENT: "EXPENSE",
  SALARY_PAYMENT: "EXPENSE",
  COMMISSION: "EXPENSE",
  DONATION: "INCOME",
  GRANT_RECEIPT: "INCOME",
  UTILITY_PAYMENT: "EXPENSE",
  MAINTENANCE_EXPENSE: "EXPENSE",
  INSURANCE_PAYMENT: "EXPENSE",
  REIMBURSEMENT: "EXPENSE",
  PENALTY_OR_FINE: "EXPENSE",
  DEPRECIATION: "EXPENSE",
};

const categoryDescriptions: Record<string, string> = {
  SALE: "Income from products or services sold",
  PURCHASE: "Purchases of inventory or goods for resale",
  EXPENSE: "General operational expenses",
  REFUND: "Money returned to you from customers or vendors",
  TRANSFER: "Money moved between accounts",
  LOAN_DISBURSEMENT: "Funds received from a loan provider",
  LOAN_REPAYMENT: "Payments made to repay a loan",
  SUBSCRIPTION_PAYMENT: "Recurring payments to SaaS or service providers",
  INVESTMENT_INFLOW: "Capital received from investors",
  INVESTMENT_OUTFLOW: "Funds invested into other businesses or ventures",
  TAX_PAYMENT: "Taxes paid to government authorities",
  SALARY_PAYMENT: "Salaries or wages paid to employees",
  COMMISSION: "Commissions earned or paid",
  DONATION: "Charitable donations or funds received",
  GRANT_RECEIPT: "Grants from NGOs or government",
  UTILITY_PAYMENT: "Bills for water, electricity, internet etc.",
  MAINTENANCE_EXPENSE: "Costs for maintaining equipment or premises",
  INSURANCE_PAYMENT: "Insurance-related expenses",
  REIMBURSEMENT: "Reimbursement of business-related costs",
  PENALTY_OR_FINE: "Fines paid due to legal or regulatory reasons",
  DEPRECIATION: "Non-cash expense for asset depreciation",
};

export async function seedCategories() {
  const entries = Object.entries(transactionToCategoryTypeMap).map(
    ([type, categoryType]) => ({
      name: formatName(type),
      type: categoryType,
      description: categoryDescriptions[type as string],
    })
  );

  for (const entry of entries) {
    await prisma.category.create({
      data: {
        name: entry.name,
        type: entry.type,
        description: entry.description,
      },
    });
  }

  console.log("✅ Categories seeded.");
}

// Utility to format enum keys nicely
function formatName(key: string): string {
  return key
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

// To run: call this function directly or from a script
seedCategories();
