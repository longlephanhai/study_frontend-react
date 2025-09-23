import { Button, Card, Flex, Form, Input, Space, Typography } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import PermissionModal from "./permission.modal";
import { useState } from "react";

// import { useState } from "react";
// import ModalCreateUser from "./user.modal.create";
// import { useQuery } from "@tanstack/react-query";
// import { callApiFetchRoles } from "../../services/api";

const { Title } = Typography;

interface IProps {
  query: string;
  setQuery: (query: string) => void;
}

const PermissionHead = (props: IProps) => {

  const [isModalOpenCreatePermission, setIsModalOpenCreatePermission] = useState(false)


  const [form] = Form.useForm();

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
          👤 Permission Management
        </Title>

        {/* Right actions */}
        <Flex gap="middle" align="center" wrap="wrap">
          {/* Search Form */}
          <Form
            form={form}
            layout="inline"
            // onFinish={onFinish}
            style={{
              background: "#fafafa",
              padding: "8px 12px",
              borderRadius: 12,
            }}
          >
            <Form.Item name="search" style={{ marginBottom: 0 }}>
              <Input
                placeholder="Search permission..."
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
          {/* <Space size="middle" wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ borderRadius: 8 }}
              onClick={() => setIsModalOpenCreatePermission(true)}
            >
              Create Permission
            </Button>

            <Button
              icon={<DeleteOutlined />}
              danger
              type="primary"
            >
              Delete multiple
            </Button>

            <Button
              icon={<ImportOutlined />}
              type="primary"
            >
              Import Excel
            </Button>

            <Button
              icon={<ExportOutlined />}
              style={{
                borderRadius: 8,
                background: "#f6f6f6",
                border: "1px solid #ddd",
              }}
            >
              Export Excel
            </Button>
          </Space> */}
        </Flex>
      </Flex>

      <PermissionModal
        isModalOpenCreatePermission={isModalOpenCreatePermission}
        setIsModalOpenCreatePermission={setIsModalOpenCreatePermission}
      />
    </Card>

  );
};

export default PermissionHead;
