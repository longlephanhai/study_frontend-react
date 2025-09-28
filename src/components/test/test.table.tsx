import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, List, Space, Table, Upload, type TableColumnsType, type TableProps } from 'antd';
import { useState } from 'react';
import ImportQuestion from './data/question.import';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface IProps {
  data: IBackendRes<IModelPaginate<ITest>>;
  onChange: (pagination: any, filters: any, sorter: any, extra: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const TableTest = (props: IProps) => {

  const [isModalOpenImport, setIsModalOpenImport] = useState(false);
  const [partId, setPartId] = useState<string>("");

  const { data, onChange, loading, setLoading } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: TableColumnsType<ITest> = [
    { title: 'ID', dataIndex: '_id', key: '_id', render: text => <a>{text}</a> },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Duration', dataIndex: 'durationSec', key: 'durationSec' },
    { title: 'Audio URL', dataIndex: 'audioUrl', key: 'audioUrl', render: url => <audio controls src={url}></audio> },
    {
      title: 'Action', key: 'action', render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} type="primary" style={{ marginRight: 8, marginBottom: 8 }} onClick={() => { alert(`Edit ${record._id}`) }}>Edit</Button>
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

  const rowSelection: TableRowSelection<ITest> = {
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
      <Table<ITest>
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
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ borderRadius: 8 }}>
              {/* Header chứa nút Create Part */}
              <Space
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  width: "100%",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 16 }}>
                  Parts of {record.title}
                </span>
                <Button
                  type="primary"
                  onClick={() => console.log("Create part for:", record)}
                >
                  + Create Part
                </Button>
              </Space>

              {/* Danh sách Part */}
              <List
                size="small"
                bordered
                dataSource={record.parts}
                renderItem={(part: IPart) => (
                  <List.Item
                    actions={[
                      // Nút xem câu hỏi
                      <Button
                        key="view"
                        type="link"
                        onClick={() => console.log("View question:", part)}
                      >
                        View Question
                      </Button>,

                      // Nút tạo câu hỏi
                      <Button
                        key="create"
                        type="default"
                        onClick={() => console.log("Create question for:", part)}
                      >
                        Create Question
                      </Button>,

                      // Nút upload file Excel
                      <Button
                        key="upload"
                        icon={<UploadOutlined />}
                        type='primary'
                        onClick={() => {
                          setIsModalOpenImport(true);
                          setPartId(part._id);
                        }}
                      >
                        Upload Excel
                      </Button>

                    ]}
                  >
                    <span style={{ fontWeight: 500 }}>{part?.name}</span>
                  </List.Item>
                )}
              />
            </div>
          ),
          rowExpandable: (record) => record.title !== "Not Expandable",
        }}
      />

      <ImportQuestion
        isModalOpenImport={isModalOpenImport}
        setIsModalOpenImport={setIsModalOpenImport}
        partId={partId}
      />
    </Flex>
  )
}

export default TableTest;