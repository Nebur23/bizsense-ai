/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================
enum BusinessType  {
  FOOD_PROCESSING,
  HANDMADE_GOODS,
  AGRO_PROCESSING,
  FURNITURE_AND_WOODWORK,
  GENERAL_RETAIL,
  WHOLESALE,
  ELECTRONICS_AND_PHONE_SHOPS,
  MARKET_VENDOR,
  BARBERSHOP,
  HAIR_AND_BEAUTY_SALON,
  TAILORING_AND_FASHION,
  LAUNDRY_AND_DRYCLEANING,
  COOKING_AND_CATERING,
  PLUMBING_AND_ELECTRICAL,
  REPAIRS_AND_MAINTENANCE,
  BUILDING_MATERIALS_SHOP,
  TUTORING_SERVICES,
  VOCATIONAL_TRAINING,
  BIKE_TRANSPORT,
  TAXI_SERVICE,
  CARGO_AND_DELIVERY,
  FREELANCE_IT,
  CONSULTING,
  FINANCIAL_SERVICES,
  PHARMACY,
  TRADITIONAL_MEDICINE,
  GYM_AND_WELLNESS,
  OTHER,
};

declare type Business = {
  name: string;
  type: $Enums.BusinessType;
};

declare type User = {
  id: string;
  role: $Enums.UserRole;
  businessId: string | null;
  email: string;
  name: string | null;
  password: string | null;
  phone: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type Account = {
  id: string;
  name: string;
  businessId: string;
  type: $Enums.AccountType;
  provider: string | null;
  accountNumber: string | null;
  balance: number;
  currency: string = "XAF";
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    transactions: number;
  };
};

declare type CreateAccount = Pick<
  Account,
  | "name"
  | "type"
  | "provider"
  | "accountNumber"
  | "balance"
  | "currency"
  | "isDefault"
>;

declare type AccountTransaction = {
  id?: string;
  accountId: string;
  transactionId?: string;
  amount: number;
  isTransferSource: boolean;
  isTransferDestination: boolean;
};

declare type ProductTransactionItem = {
  id?: string;
  quantity: number;
  priceAtTime: number;
  productId: string;
  transactionId: string;
};

declare type Transaction = {
  id?: string;
  type: TransactionType;
  amount: number;
  description?: string | null;
  date: Date | string;
  receiptUrl?: string | null;
  categoryId?: string | null;
  businessId?: string;
  customerId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  productItems?: ProductTransactionItem[] | null;
  accountTransactions?: AccountTransaction[] | null;
  category?: {
    id: string;
    name: string;
    type: CategoryType;
    description: string;
    businessId: string;
  } | null;
};

declare type CreateTransaction = Pick<
  Transaction,
  | "type"
  | "amount"
  | "description"
  | "categoryId"
  | "receiptUrl"
  | "businessId"
  | "customerId"
  | "productItems"
>;

declare type AccountTransactions = {
  id: string;
  name: string;
  businessId: string;
  type: $Enums.AccountType;
  provider: string | null;
  accountNumber: string | null;
  balance: number;
  currency: string = "XAF";
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;

  transactions: {
    id: string;
    accountId: string;
    transactionId: string;
    amount: number;
    isTransferSource: boolean;
    isTransferDestination: boolean;
    createdAt: Date;
    transaction: Transaction;
  }[];
  _count: {
    transactions: number;
  };
};

declare type Category = {
  id: string;
  name: string;
  type: $Enums.CategoryType;
  description: string;
};

declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  sharableId: string;
};

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan "
  | "investment"
  | "other";

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare type Receiver = {
  firstName: string;
  lastName: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface BankInfoProps {
  account: Account;
  appwriteItemId?: string;
  type: "full" | "card";
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface BankDropdownProps {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
}

declare interface BankTabItemProps {
  account: Account;
  appwriteItemId?: string;
}

declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare interface FooterProps {
  user: User;
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

declare interface SiderbarProps {
  user: User;
}

declare interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface CategoryBadgeProps {
  category: string;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface CategoryProps {
  category: CategoryCount;
}

declare interface DoughnutChartProps {
  accounts: Account[];
}

declare interface PaymentTransferFormProps {
  accounts: Account[];
}

// Actions
declare interface getAccountsProps {
  userId: string;
}

declare interface getAccountProps {
  appwriteItemId: string;
}

declare interface getInstitutionProps {
  institutionId: string;
}

declare interface getTransactionsProps {
  accessToken: string;
}

declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

declare interface getTransactionsByBankIdProps {
  bankId: string;
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
  userId: string;
}

declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}

declare interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  sharableId: string;
}

declare interface getBanksProps {
  userId: string;
}

declare interface getBankProps {
  documentId: string;
}

declare interface getBankByAccountIdProps {
  accountId: string;
}
