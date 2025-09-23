import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex, Table, type TableColumnsType, type TableProps } from 'antd';
import { useState } from 'react';
import RoleModalUpdate from './role.modal.update';
import { useQuery } from '@tanstack/react-query';
import { callApiFetchPermissions } from '../../services/api';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface IProps {
  data: IBackendRes<IModelPaginate<IRole>>;
  onChange: (pagination: any, filters: any, sorter: any, extra: any) => void;
}

const TableRole = (props: IProps) => {
  const { data, onChange } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const [dataEdit, setDataEdit] = useState<IRole | null>(null);

  const columns: TableColumnsType<IRole> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Action', key: 'action', render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} type="primary" style={{ marginRight: 8 }} onClick={() => {
            setIsModalOpenUpdate(true)
            setDataEdit(record)
          }}>Edit</Button>
          <Button icon={<DeleteOutlined />} type="primary" danger onClick={() => { alert(`Delete ${record._id}`) }}>Delete</Button>
        </>
      )
    },
  ];

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IRole> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const { isLoading, isError, data: permissions, error } = useQuery<IBackendRes<IModelPaginate<IPermission>>, Error>({
    queryKey: ['fetchPermission'],
    queryFn: (): Promise<IBackendRes<IModelPaginate<IPermission>>> => callApiFetchPermissions(""),
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<IRole>
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

      <RoleModalUpdate
        isModalOpenUpdate={isModalOpenUpdate}
        setIsModalOpenUpdate={setIsModalOpenUpdate}
        permissions={permissions?.data?.result}
        dataEdit={dataEdit}
      />
    </Flex>
  )
}

export default TableRole;