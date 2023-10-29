import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Transaction, TransactionType } from "../../../modals/account";
import { useBankSelector } from "../../../store/selector";
import { DataTable } from "../../DataTable/DataTable";
import "./TransactionHistory.scss";
export const TransactionHistory = () => {
  const { transactions } = useBankSelector();
  const columns: ColumnsType<Transaction> = [
    {
      title: "Type",
      render: (row: Transaction) => (
        <Space size={[8, 8]} wrap>
          {row.type === TransactionType.Deposit ? (
            <Tag color="green">Deposit</Tag>
          ) : (
            <Tag color="red">Withdraw</Tag>
          )}
        </Space>
      ),
    },

    {
      title: "Remarks",
      dataIndex: "remarks",
      align: "center",
    },

    {
      title: "Amount",
      align: "right",

      render: (row: Transaction) => <div>{row.amount.toFixed(2)}</div>,
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={transactions}></DataTable>
    </>
  );
};
