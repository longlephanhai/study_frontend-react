import { DeleteOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons';
import { Button, Flex, List, Space, Table, type TableColumnsType, type TableProps } from 'antd';
import { useState } from 'react';
import ImportVocabulary from './data/vocabulary.import';



type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface IProps {
  data: IBackendRes<IModelPaginate<ITopicVocabulary>>;
  onChange: (pagination: any, filters: any, sorter: any, extra: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const TableVocabulary = (props: IProps) => {

  const [isModalOpenImportVocabulary, setIsModalOpenImportVocabulary] = useState(false);
  const [topicsId, setTopicsId] = useState<string>("");

  const { data, onChange, loading, setLoading } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: TableColumnsType<ITopicVocabulary> = [
    { title: 'ID', dataIndex: '_id', key: '_id', render: text => <a>{text}</a> },
    { title: 'Topic', dataIndex: 'topic', key: 'topic' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
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

  const rowSelection: TableRowSelection<ITopicVocabulary> = {
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
      <Table<ITopicVocabulary>
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
                  Vocabularies for topic: {record.topic}
                </span>
                <Button
                  type="primary"
                  onClick={
                    () => {
                      setIsModalOpenImportVocabulary(true);
                      setTopicsId(record._id);
                    }
                  }
                  icon={<ImportOutlined />}
                >
                  + Import Vocabulary
                </Button>
              </Space>

              {/* Danh sách Part */}
              <List
                size="small"
                bordered
                dataSource={record.vocabularies}
                renderItem={(vocabulary: IVocabulary) => (
                  <List.Item
                    actions={[
                      // Nút xem câu hỏi
                      <Button
                        key="view"
                        type="link"
                        onClick={() => console.log("View vocabulary:", vocabulary)}
                      >
                        View Vocabulary
                      </Button>,
                    ]}
                  >
                    <span style={{ fontWeight: 500 }}>{vocabulary?.vocab}</span>
                  </List.Item>
                )}
              />
            </div>
          ),
          rowExpandable: (record) => record.topic !== "Not Expandable",
        }}
      />

      <ImportVocabulary
        isModalOpenImportVocabulary={isModalOpenImportVocabulary}
        setIsModalOpenImportVocabulary={setIsModalOpenImportVocabulary}
        topicsId={topicsId}
      />
    </Flex>
  )
}

export default TableVocabulary;