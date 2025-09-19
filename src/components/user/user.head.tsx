import { Button, Card, Flex, Input, Space, Typography } from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const UserHead = () => {
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 12,
      }}
      bodyStyle={{ padding: 20 }}
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap="large">
        {/* Title */}
        <Title level={4} style={{ margin: 0 }}>
          👤 User Management
        </Title>

        {/* Search & Actions */}
        <Flex gap="middle" align="center" wrap="wrap">
          {/* Search Box */}
          <Input
            placeholder="Search user..."
            allowClear
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            style={{
              width: 260,
              borderRadius: 8,
            }}
          />

          {/* Action Buttons */}
          <Space wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ borderRadius: 6 }}
            >
              Add User
            </Button>
            <Button
              icon={<UploadOutlined />}
              style={{ borderRadius: 6 }}
            >
              Upload Excel
            </Button>
            <Button
              icon={<ExportOutlined />}
              style={{ borderRadius: 6 }}
            >
              Export Excel
            </Button>
          </Space>
        </Flex>
      </Flex>
    </Card>
  );
};

export default UserHead;
