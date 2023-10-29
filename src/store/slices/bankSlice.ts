import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountDetails,
  Transaction,
  TransactionType,
} from "../../modals/account";

interface BankState {
  account: AccountDetails;
  transactions: Transaction[];
  savingGoal?: number;
}

const initialState: BankState = {
  account: {
    accountId: 1,
    name: "John Doe",
    balance: 1000,
  },
  transactions: [],
  savingGoal: undefined,
};

export const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    addTransaction: (state, { payload }: PayloadAction<Transaction>) => {
      let amount = payload.amount;
      if (payload.type === TransactionType.Deposit) {
        state.account.balance += amount;
      } else {
        state.account.balance -= amount;
      }
      state.transactions.push(payload);
    },
    updateSavingGoal: (state, { payload }: PayloadAction<number>) => {
      state.savingGoal = payload;
    },
  },
});

export const { addTransaction, updateSavingGoal } = bankSlice.actions;
export default bankSlice.reducer;
