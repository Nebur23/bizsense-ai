export const TransactionType = [
  'SALE', // Product or service sold
  'PURCHASE', // Product or inventory purchase
  'EXPENSE', // Operational expense (rent, salaries)
  'REFUND', // Customer refund
  'TRANSFER', // Account transfer
  'LOAN_DISBURSEMENT', // Loan amount received
  'LOAN_REPAYMENT', // Loan repayment
  'SUBSCRIPTION_PAYMENT', // Platform or 3rd party subscription
  'INVESTMENT_INFLOW', // Investment received
  'INVESTMENT_OUTFLOW', // Investment made elsewhere
  'TAX_PAYMENT', // Payment to government
  'SALARY_PAYMENT', // Employee payment
  'COMMISSION', // Paid or earned
  'DONATION', // Money donated or received
  'GRANT_RECEIPT', // Received government/NGO grant
  'UTILITY_PAYMENT', // Electricity, water, internet, etc.
  'MAINTENANCE_EXPENSE', // Equipment/service maintenance
  'INSURANCE_PAYMENT', // For assets, business insurance
  'REIMBURSEMENT', // Refund to employees or others
  'PENALTY_OR_FINE', // Government or legal penalty
  'DEPRECIATION', // Periodic asset depreciation (non-cash)
] as const;
