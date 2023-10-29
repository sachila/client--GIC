import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Props<DATA> {
  columns: ColumnsType<DATA>;
  data: DATA[];
}
export const DataTable = <DATA extends {}>({ columns, data }: Props<DATA>) => {
  return (
    <>
      <Table
        columns={columns.map((column) => ({
          ...column,
          onCell: () => ({
            style: { paddingTop: 6, paddingBottom: 6 },
            ...column.onCell,
          }),
        }))}
        dataSource={data}
        pagination={{
          defaultPageSize: 100,
        }}
      />
    </>
  );
};
