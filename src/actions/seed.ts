"use server";
import { subDays, subHours, subMinutes } from "date-fns";
import {
  Account,
  Business,
  Category,
  Customer,
  Product,
  TransactionType,
  CategoryType,
  AccountType,
} from "@prisma/client";
import prisma from "@/lib/prisma";

// Constants for main IDs
const BUSINESS_ID = "cm9954jpq0000cjllw6iu6uwx";
const OWNER_ID = "cm94uo5qo0000cjulkcupa44z";
const CLERK_USER_ID = "user_2vJkuV27qXn56c5aqqhPkeJu5dI";

// Constants for account IDs
const CASH_ACCOUNT_ID = "cm99sqcv10001cjqmvwwnlugo";
const MOBILE_MONEY_ACCOUNT_ID = "cm99tp5e80007cjqm9kpq7aw3";
const BANK_ACCOUNT_ID = "cm9aet9sd0003cjtxz90la8qy";

// Product categories with realistic names and price ranges
type ProductType = {
  name: string;
  price: number;
  cost: number;
};

const PRODUCT_TYPES: ProductType[] = [
  { name: "Rice (5kg)", price: 3500, cost: 2800 },
  { name: "Cooking Oil (1L)", price: 1500, cost: 1200 },
  { name: "Sugar (1kg)", price: 800, cost: 650 },
  { name: "Flour (1kg)", price: 700, cost: 550 },
  { name: "Milk Powder (500g)", price: 2000, cost: 1600 },
  { name: "Soap", price: 400, cost: 300 },
  { name: "Toothpaste", price: 600, cost: 450 },
  { name: "Bread", price: 300, cost: 200 },
  { name: "Eggs (6)", price: 900, cost: 700 },
  { name: "Tomato Paste", price: 450, cost: 350 },
  { name: "Matches", price: 100, cost: 70 },
  { name: "Batteries (pair)", price: 500, cost: 350 },
  { name: "Soft Drink", price: 500, cost: 350 },
  { name: "Beer", price: 800, cost: 600 },
  { name: "Phone Credit Card", price: 1000, cost: 950 },
];

// Expense categories
const EXPENSE_CATEGORIES: string[] = [
  "Rent",
  "Utilities",
  "Salary",
  "Transportation",
  "Stock Purchase",
  "Equipment",
  "Maintenance",
  "Marketing",
  "Phone Credit",
  "Miscellaneous",
];

// Income categories
const INCOME_CATEGORIES: string[] = [
  "Sales",
  "Investments",
  "Loans",
  "Other Income",
];

// Customer names (common in Cameroon)
const CUSTOMER_NAMES: string[] = [
  "Kamga Jean",
  "Nkeng Marie",
  "Fomeni Paul",
  "Mbarga Sophie",
  "Talla Emmanuel",
  "Kouam Pierre",
  "Ngo Nkott Angeline",
  "Meka Robert",
  "Ngono Beatrice",
  "Tchinda Joseph",
];

// Helper functions
function getRandomAmount(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomPhone(): string {
  return `6${getRandomInt(5, 9)}${getRandomInt(1, 9)}${getRandomInt(
    0,
    9
  )}${getRandomInt(0, 9)}${getRandomInt(0, 9)}${getRandomInt(
    0,
    9
  )}${getRandomInt(0, 9)}${getRandomInt(0, 9)}`;
}

function getRandomDate(startDays: number, endDays: number): Date {
  const start = subDays(new Date(), startDays);
  const end = subDays(new Date(), endDays);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

type SeedResult = {
  success: boolean;
  message?: string;
  error?: string;
  businessId?: string;
  ownerId?: string;
  stats?: {
    accounts: number;
    products: number;
    customers: number;
    categories: number;
  };
};

export async function seedBusinessData(): Promise<SeedResult> {
  try {
    // Clear existing data
    await clearExistingData();

    // Create business
    const business = await prisma.business.create({
      data: {
        id: BUSINESS_ID,
        name: "Epicerie du Quartier",
        type: "GENERAL_RETAIL",
        location: "Douala, Cameroon",
        createdAt: subDays(new Date(), 90),
        updatedAt: subDays(new Date(), 90),
      },
    });

    // Create owner
    const owner = await prisma.user.create({
      data: {
        id: OWNER_ID,
        clerkUserId: CLERK_USER_ID,
        name: "Yves Nyemb",
        email: "yvesnyemb7@gmail.com",
        role: "OWNER",
        businessId: business.id,
        createdAt: subDays(new Date(), 90),
        updatedAt: subDays(new Date(), 90),
      },
    });

    // Create accounts
    const accounts = await createAccounts(business.id);

    // Create categories
    const categories = await createCategories(business.id);

    // Create products
    const products = await createProducts(business.id);

    // Create customers
    const customers = await createCustomers(business.id);

    // Create transactions (last 90 days)
    await createTransactionsForPeriod(
      90,
      0,
      business.id,
      products,
      customers,
      categories,
      accounts
    );

    return {
      success: true,
      message: "Seed completed successfully",
      businessId: business.id,
      ownerId: owner.id,
      stats: {
        accounts: accounts.length,
        products: products.length,
        customers: customers.length,
        categories: categories.length,
      },
    };
  } catch (error) {
    console.error("Seed error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function clearExistingData(): Promise<void> {
  // Delete in proper order to handle foreign key constraints
  await prisma.accountTransaction.deleteMany({});
  await prisma.productTransactionItem.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.business.deleteMany({});
}

async function createAccounts(businessId: string): Promise<Account[]> {
  await prisma.account.createMany({
    data: [
      {
        id: CASH_ACCOUNT_ID,
        businessId,
        name: "Cash Register",
        type: "CASH" as AccountType,
        balance: 50000,
        isDefault: true,
        createdAt: subDays(new Date(), 90),
        updatedAt: subDays(new Date(), 90),
        currency: "XAF",
      },
      {
        id: MOBILE_MONEY_ACCOUNT_ID,
        businessId,
        name: "Mobile Money",
        type: "MOBILE_MONEY" as AccountType,
        provider: "MTN",
        accountNumber: "650000000",
        balance: 25000,
        createdAt: subDays(new Date(), 90),
        updatedAt: subDays(new Date(), 90),
        currency: "XAF",
      },
      {
        id: BANK_ACCOUNT_ID,
        businessId,
        name: "Bank Account",
        type: "BANK" as AccountType,
        provider: "Express Union",
        accountNumber: "20230045678",
        balance: 100000,
        createdAt: subDays(new Date(), 90),
        updatedAt: subDays(new Date(), 90),
        currency: "XAF",
      },
    ],
  });

  // Return accounts for further use
  return await prisma.account.findMany({ where: { businessId } });
}

async function createCategories(businessId: string): Promise<Category[]> {
  // Create expense categories
  for (const name of EXPENSE_CATEGORIES) {
    await prisma.category.create({
      data: {
        name,
        type: "EXPENSE" as CategoryType,
        description: "",
      },
    });
  }

  // Create income categories
  for (const name of INCOME_CATEGORIES) {
    await prisma.category.create({
      data: {
        name,
        type: "INCOME" as CategoryType,
        description: "",
      },
    });
  }

  // Return categories for further use
  return await prisma.category.findMany({ where: {} });
}

async function createProducts(businessId: string): Promise<Product[]> {
  for (const product of PRODUCT_TYPES) {
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        cost: product.cost,
        stockQuantity: getRandomInt(10, 100),
        description: `Standard ${product.name.toLowerCase()}`,
        businessId,
        createdAt: subDays(new Date(), 90),
        updatedAt: subDays(new Date(), 90),
      },
    });
  }

  // Return products for further use
  return await prisma.product.findMany({ where: { businessId } });
}

async function createCustomers(businessId: string): Promise<Customer[]> {
  for (const name of CUSTOMER_NAMES) {
    await prisma.customer.create({
      data: {
        name,
        phone: getRandomPhone(),
        businessId,
        createdAt: subDays(new Date(), getRandomInt(0, 90)),
        updatedAt: subDays(new Date(), getRandomInt(0, 90)),
      },
    });
  }

  // Return customers for further use
  return await prisma.customer.findMany({ where: { businessId } });
}

type AccountBalances = {
  [key: string]: number;
};

type SelectedProduct = {
  product: Product;
  quantity: number;
  priceAtTime: number;
};

async function createTransactionsForPeriod(
  startDays: number,
  endDays: number,
  businessId: string,
  products: Product[],
  customers: Customer[],
  categories: Category[],
  accounts: Account[]
): Promise<void> {
  // Get categories by type
  const expenseCategories = categories.filter(cat => cat.type === "EXPENSE");
  const incomeCategories = categories.filter(cat => cat.type === "INCOME");
  const salesCategory =
    incomeCategories.find(cat => cat.name === "Sales") || incomeCategories[0];

  // Track account balances
  const accountBalances: AccountBalances = {
    [CASH_ACCOUNT_ID]: 50000,
    [MOBILE_MONEY_ACCOUNT_ID]: 25000,
    [BANK_ACCOUNT_ID]: 100000,
  };

  // Generate dates for transactions
  const dates: Date[] = [];
  for (let i = startDays; i >= endDays; i--) {
    const date = subDays(new Date(), i);

    // Add 2-6 transactions per day
    const transactionsPerDay = getRandomInt(2, 6);
    for (let j = 0; j < transactionsPerDay; j++) {
      dates.push(
        subMinutes(subHours(date, getRandomInt(8, 18)), getRandomInt(0, 59))
      );
    }
  }

  // Process each date
  for (const date of dates) {
    // 70% chance of sale, 30% chance of expense
    const isSale = Math.random() < 0.7;

    if (isSale) {
      await createSaleTransaction(
        date,
        businessId,
        products,
        customers,
        salesCategory,
        accounts,
        accountBalances
      );
    } else {
      await createExpenseTransaction(
        date,
        businessId,
        expenseCategories,
        accounts,
        accountBalances
      );
    }
  }
}

async function createSaleTransaction(
  date: Date,
  businessId: string,
  products: Product[],
  customers: Customer[],
  salesCategory: Category,
  accounts: Account[],
  accountBalances: AccountBalances
): Promise<void> {
  // Randomly select 1-5 products for this sale
  const numProducts = getRandomInt(1, 5);
  const selectedProducts: SelectedProduct[] = [];
  const usedProductIds = new Set<number>();

  for (let i = 0; i < numProducts; i++) {
    let productIndex: number;
    do {
      productIndex = getRandomInt(0, products.length - 1);
    } while (usedProductIds.has(productIndex));

    usedProductIds.add(productIndex);
    const product = products[productIndex];
    const quantity = getRandomInt(1, 5);

    selectedProducts.push({
      product,
      quantity,
      priceAtTime: product.price,
    });
  }

  // Calculate total amount
  const totalAmount = selectedProducts.reduce(
    (sum, item) => sum + item.priceAtTime * item.quantity,
    0
  );

  // Choose a random customer (20% chance of no customer)
  const hasCustomer = Math.random() < 0.8;
  const customer = hasCustomer ? getRandomElement(customers) : null;

  // Choose a random account for payment (60% cash, 30% mobile money, 10% bank)
  const paymentMethod = Math.random();
  let accountId: string;

  if (paymentMethod < 0.6) {
    accountId = CASH_ACCOUNT_ID;
  } else if (paymentMethod < 0.9) {
    accountId = MOBILE_MONEY_ACCOUNT_ID;
  } else {
    accountId = BANK_ACCOUNT_ID;
  }

  // Create transaction
  const transaction = await prisma.transaction.create({
    data: {
      type: "SALE" as TransactionType,
      amount: totalAmount,
      description: `Sale of ${selectedProducts
        .map(p => p.product.name)
        .join(", ")}`,
      date,
      categoryId: salesCategory.id,
      businessId,
      customerId: customer?.id || null,
      createdAt: date,
      updatedAt: date,
    },
  });

  // Create product transaction items
  for (const item of selectedProducts) {
    await prisma.productTransactionItem.create({
      data: {
        quantity: item.quantity,
        priceAtTime: item.priceAtTime,
        productId: item.product.id,
        transactionId: transaction.id,
      },
    });
  }

  // Create account transaction
  await prisma.accountTransaction.create({
    data: {
      accountId,
      transactionId: transaction.id,
      amount: totalAmount,
      createdAt: date,
    },
  });

  // Update account balance
  accountBalances[accountId] += totalAmount;
  await prisma.account.update({
    where: { id: accountId },
    data: { balance: accountBalances[accountId] },
  });

  // Update product stock
  for (const item of selectedProducts) {
    await prisma.product.update({
      where: { id: item.product.id },
      data: {
        stockQuantity: { decrement: item.quantity },
        updatedAt: date,
      },
    });
  }
}

async function createExpenseTransaction(
  date: Date,
  businessId: string,
  expenseCategories: Category[],
  accounts: Account[],
  accountBalances: AccountBalances
): Promise<void> {
  // Choose a random expense category
  const category = getRandomElement(expenseCategories);

  // Set amount based on category
  let amount: number;
  switch (category.name) {
    case "Rent":
      amount = getRandomAmount(50000, 150000);
      break;
    case "Utilities":
      amount = getRandomAmount(5000, 25000);
      break;
    case "Salary":
      amount = getRandomAmount(30000, 100000);
      break;
    case "Stock Purchase":
      amount = getRandomAmount(20000, 200000);
      break;
    case "Transportation":
      amount = getRandomAmount(1000, 10000);
      break;
    default:
      amount = getRandomAmount(1000, 20000);
  }

  // Choose an account (40% cash, 30% mobile money, 30% bank)
  const paymentMethod = Math.random();
  let accountId: string;

  if (paymentMethod < 0.4) {
    accountId = CASH_ACCOUNT_ID;
  } else if (paymentMethod < 0.7) {
    accountId = MOBILE_MONEY_ACCOUNT_ID;
  } else {
    accountId = BANK_ACCOUNT_ID;
  }

  // Check if account has sufficient balance, adjust if needed
  if (accountBalances[accountId] < amount) {
    // Use a different account or reduce amount
    if (accountBalances[BANK_ACCOUNT_ID] >= amount) {
      accountId = BANK_ACCOUNT_ID;
    } else if (accountBalances[CASH_ACCOUNT_ID] >= amount) {
      accountId = CASH_ACCOUNT_ID;
    } else if (accountBalances[MOBILE_MONEY_ACCOUNT_ID] >= amount) {
      accountId = MOBILE_MONEY_ACCOUNT_ID;
    } else {
      // Reduce amount to match available balance
      amount =
        Math.min(
          accountBalances[CASH_ACCOUNT_ID],
          accountBalances[MOBILE_MONEY_ACCOUNT_ID],
          accountBalances[BANK_ACCOUNT_ID]
        ) * 0.8;
    }
  }

  // Create transaction
  const transaction = await prisma.transaction.create({
    data: {
      type: "EXPENSE" as TransactionType,
      amount,
      description: `Expense for ${category.name.toLowerCase()}`,
      date,
      categoryId: category.id,
      businessId,
      createdAt: date,
      updatedAt: date,
    },
  });

  // Create account transaction
  await prisma.accountTransaction.create({
    data: {
      accountId,
      transactionId: transaction.id,
      amount: -amount, // negative for expense
      createdAt: date,
    },
  });

  // Update account balance
  accountBalances[accountId] -= amount;
  await prisma.account.update({
    where: { id: accountId },
    data: { balance: accountBalances[accountId] },
  });
}
