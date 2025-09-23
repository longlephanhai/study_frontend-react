import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex, Table, type TableColumnsType, type TableProps } from 'antd';
import { useState } from 'react';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface IProps {
  data: IBackendRes<IModelPaginate<IUser>>;
  onChange: (pagination: any, filters: any, sorter: any, extra: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const TableUser = (props: IProps) => {
  const { data, onChange, loading, setLoading } = props;



  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


  const columns: TableColumnsType<IUser> = [
    { title: 'ID', dataIndex: '_id', key: '_id', render: text => <a>{text}</a> },
    { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Role', dataIndex: ['role', 'name'], key: 'role' },
    {
      title: 'Action', key: 'action', render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} type="primary" style={{ marginRight: 8 }} onClick={() => { alert(`Edit ${record._id}`) }}>Edit</Button>
          <Button icon={<DeleteOutlined />} type="primary" danger onClick={() => { alert(`Delete ${record._id}`) }}>Delete</Button>
        </>
      )
    },
  ];

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IUser> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<IUser>
        rowKey="_id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.data?.result}
        pagination={
          {
            current: data?.data?.meta.current,
            pageSize: data?.data?.meta.pageSize,
            showSizeChanger: true,
            total: data?.data?.meta.total,
            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} on {total} rows</div>) }
          }
        }
        onChange={onChange}
        loading={loading}
      />
    </Flex>
  )
}

export default TableUser;