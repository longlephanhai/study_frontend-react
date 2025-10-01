import { Button, Card, Flex, Form, Input, Space, Typography } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import TestModal from "./test.modal";
import { useState } from "react";

const { Title } = Typography;

const TestHead = () => {

  const [isModalOpenCreateTest, setIsModalOpenCreateTest] = useState(false);

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
          👤 Test Management
        </Title>

        {/* Right actions */}
        <Flex gap="middle" align="center" wrap="wrap">
          {/* Search Form */}
          <Form
            // form={form}
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
                placeholder="Search test..."
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
              onClick={() => setIsModalOpenCreateTest(true)}
            >
              Add Test
            </Button>

            <Button
              icon={<ImportOutlined />}
              style={{
                borderRadius: 8,
                background: "#f6f6f6",
                border: "1px solid #ddd",
              }}
            >
              Import Excel
            </Button>
          </Space>
        </Flex>
      </Flex>

      <TestModal
        isModalOpenCreateTest={isModalOpenCreateTest}
        setIsModalOpenCreateTest={setIsModalOpenCreateTest}
      />
    </Card>
  )
}

export default TestHead;