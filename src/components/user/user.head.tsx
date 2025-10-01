import { Button, Card, Flex, Form, Input, Space, Typography } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import ModalCreateUser from "./user.modal.create";
import { useQuery } from "@tanstack/react-query";
import { callApiFetchRoles } from "../../services/api";

const { Title } = Typography;

interface IProps {
  query: string;
  setQuery: (query: string) => void;
}

const UserHead = (props: IProps) => {

  const { query, setQuery } = props;


  const [form] = Form.useForm();


  const [isModalOpenCreateUser, setIsModalOpenCreateUser] = useState(false);

  const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<IRole>>, Error>({
    queryKey: ['fetchRole', ""],
    queryFn: (): Promise<IBackendRes<IModelPaginate<IRole>>> => callApiFetchRoles(""),
  })


  const onFinish = (values: string) => {
    if (values) {
      setQuery(`current=1&pageSize=5&fullName=/${values.search}/i&sort=-createdAt`);
    }
  }


  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 16,
        background: "#fff",
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap="large">

        {/* Title */}
        <Title
          level={4}
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          👤 User Management
        </Title>

        {/* Right actions */}
        <Flex gap="middle" align="center" wrap="wrap">
          {/* Search Form */}
          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            style={{
              background: "#fafafa",
              padding: "8px 12px",
              borderRadius: 12,
            }}
          >
            <Form.Item name="search" style={{ marginBottom: 0 }}>
              <Input
                placeholder="Search user..."
                allowClear
                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                style={{
                  width: 260,
                  borderRadius: 8,
                  background: "#fff",
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: 8 }}
              >
                Search
              </Button>
            </Form.Item>
          </Form>

          {/* Action Buttons */}
          <Space size="middle" wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ borderRadius: 8 }}
              onClick={() => setIsModalOpenCreateUser(true)}
            >
              Add User
            </Button>

            <Button
              icon={<DeleteOutlined />}
              danger
              type="primary"
            >
              Delete multiple
            </Button>

            {/* <Button
              icon={<ExportOutlined />}
              style={{
                borderRadius: 8,
                background: "#f6f6f6",
                border: "1px solid #ddd",
              }}
            >
              Export Excel
            </Button> */}
          </Space>
        </Flex>
      </Flex>

      {/* Modal */}
      <ModalCreateUser
        isModalOpenCreateUser={isModalOpenCreateUser}
        setIsModalOpenCreateUser={setIsModalOpenCreateUser}
        dataRole={data?.data?.result || []}
      />
    </Card>
  );
};

export default UserHead;
