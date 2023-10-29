import { Button, Flex, Form, Input, Modal } from "antd";
import { RuleObject } from "antd/es/form";
import { useEffect } from "react";
import { useBankSelector } from "../../../store/selector";

export const SavingGoalModal = ({
  open,
  onClose,
  saveSavingGoal,
}: SavingGoalModalProps) => {
  const { account, savingGoal } = useBankSelector();
  const [form] = Form.useForm();
  const { setFieldValue } = form;

  const amountValidator = (
    rule: RuleObject,
    value: string,
    callback: (error?: string) => void
  ) => {
    const amount = Number(value);
    if (isNaN(amount)) {
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

  const handleOnSubmit = () => {
    const value = form.getFieldValue("amount");
    saveSavingGoal(Number(value));
    onClose();
  };

  useEffect(() => {
    if (savingGoal) {
      setFieldValue("amount", savingGoal);
    }
  }, [savingGoal]);
  return (
    <>
      <Modal
        title={`Add Saving Goal`}
        open={open}
        onCancel={onClose}
        footer={[
          <Button
            type="primary"
            form="savingForm"
            key="submit"
            htmlType="submit"
          >
            Save
          </Button>,
        ]}
      >
        <Form id="savingForm" form={form} onFinish={handleOnSubmit}>
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
            <Form.Item></Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

interface SavingGoalModalProps {
  open: boolean;
  saveSavingGoal: (amount: number) => void;
  onClose: () => void;
}
