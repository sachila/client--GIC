import { AccountHeader } from "../../components/AccountDetails/AccountHeader/AccountHeader";
import { TransactionHistory } from "../../components/AccountDetails/TransactionHistory/TransactionHistory";
import "./AccountDetailsPage.scss";

export const AccountDetailsPage = () => {
  return (
    <>
      <AccountHeader />
      <div className="transaction-history">
        <TransactionHistory />
      </div>
    </>
  );
};
