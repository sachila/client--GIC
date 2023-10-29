import {
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Transaction, TransactionType } from "../../../modals/account";
import { useBankSelector } from "../../../store/selector";
import {
  addTransaction,
  updateSavingGoal,
} from "../../../store/slices/bankSlice";
import { SavingGoalModal } from "../SavingGoalModal/SavingGoalModal";
import { TransactionModal } from "../TransactionModal/TransactionModal";
import "./AccountHeader.scss";

export const AccountHeader = () => {
  const { Text } = Typography;

  const { account, savingGoal } = useBankSelector();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openSavingModal, setOpenSavingModal] = useState(false);

  const [transactionType, setTransactionType] = useState(
    TransactionType.Deposit
  );
  const savingPercentage = useMemo(() => {
    if (!savingGoal) return 0;
    if (savingGoal > account.balance) return 0;
    const goal = (savingGoal / account.balance) * 100;
    return goal.toFixed(2);
  }, [savingGoal, account]);

  const saveTransaction = (item: Transaction) => {
    dispatch(addTransaction(item));
  };

  const saveSavingGoal = (value: number) => {
    dispatch(updateSavingGoal(value));
  };

  const openDeposit = () => {
    setTransactionType(TransactionType.Deposit);
    setOpenModal(true);
  };
  const openWithdraw = () => {
    setTransactionType(TransactionType.Withdrawal);
    setOpenModal(true);
  };

  const openSavingGoalModal = () => {
    setOpenSavingModal(true);
  };

  const descriptionItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Account Name",
      children: <Text strong>{account.name}</Text>,
      span: 4,
    },
    {
      key: "2",
      label: "Balance",
      children: <Text strong>{account.balance?.toFixed(2)}</Text>,
      span: 4,
    },
    {
      key: "3",
      label: "Saving goal",
      children: savingGoal ?? 0,
      span: 4,
    },
    {
      key: "4",
      label: "Your saving percentage",
      children: savingPercentage,
      span: 4,
    },
  ];
  return (
    <div className="account-detail-container">
      <Descriptions
        title="Account Information"
        bordered
        items={descriptionItems}
      />
      <Flex justify="end" gap="small" className="button-container">
        <Button type="link" onClick={openSavingGoalModal}>
          Add Saving Goal
        </Button>
        <Button type="primary" onClick={openDeposit}>
          Deposit
        </Button>
        <Button type="primary" onClick={openWithdraw} danger>
          Withdraw
        </Button>
      </Flex>
      {openModal && (
        <TransactionModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          transactionType={transactionType}
          saveTransaction={saveTransaction}
        />
      )}
      {openSavingModal && (
        <SavingGoalModal
          open={openSavingModal}
          onClose={() => setOpenSavingModal(false)}
          saveSavingGoal={saveSavingGoal}
        />
      )}
    </div>
  );
};
