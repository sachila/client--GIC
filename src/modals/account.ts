interface AccountDetails {
  accountId: number;
  balance: number;
  name: string;
}

enum TransactionType {
  Deposit,
  Withdrawal,
}

interface Transaction {
  key: string;
  accountId: number;
  type: TransactionType;
  remarks: string;
  amount: number;
}

export type { AccountDetails, Transaction };
export { TransactionType };
