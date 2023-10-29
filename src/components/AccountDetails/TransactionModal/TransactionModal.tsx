import { Button, Flex, Form, Input, Modal } from "antd";
import { RuleObject } from "antd/es/form";
import { Transaction, TransactionType } from "../../../modals/account";
import { useBankSelector } from "../../../store/selector";

export const TransactionModal = ({
  open,
  saveTransaction,
  onClose,
  transactionType,
}: TransactionModalProps) => {
  const { account } = useBankSelector();
  const [form] = Form.useForm();

  const modalTitle =
    transactionType === TransactionType.Deposit ? "Deposit" : "Withdraw";

  const handleOnSubmit = () => {
    const values = form.getFieldsValue();
    saveTransaction({
      key: Math.random().toString(),
      accountId: account.accountId,
      type: transactionType,
      amount: Number(values.amount),
      remarks: values.remarks,
    });

    onClose();
  };

  const amountValidator = (
    rule: RuleObject,
    value: string,
    callback: (error?: string) => void
  ) => {
    const amount = Number(value);
    if (transactionType === TransactionType.Deposit || isNaN(amount)) {
      callback();
      return;
    }

    const balance = account.balance - amount;
    if (balance >= 0) {
      callback();
    } else {
      callback("Amount should be less than balance");
    }
  };
  return (
    <Modal
      title={`${modalTitle} Form`}
      open={open}
      onCancel={onClose}
      footer={[
        <Button
          type="primary"
          form="accountForm"
          key="submit"
          htmlType="submit"
        >
          Save
        </Button>,
      ]}
    >
      <Form id="accountForm" form={form} onFinish={handleOnSubmit}>
        <Flex gap="middle">
          <Form.Item
            name="amount"
            rules={[
              {
                required: true,
                message: "Amount is required",
              },
              {
                pattern: /^-?\d+(\.\d+)?$/,
                message: "Amount should be a number",
              },
              {
                validator: amountValidator,
              },
            ]}
          >
            <Input placeholder="Amount" />
          </Form.Item>
          <Form.Item
            name="remarks"
            rules={[
              {
                required: true,
                message: "Remark is required",
              },
            ]}
          >
            <Input placeholder="Remarks" />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

interface TransactionModalProps {
  open: boolean;
  transactionType: TransactionType;
  saveTransaction: (obj: Transaction) => void;
  onClose: () => void;
}
