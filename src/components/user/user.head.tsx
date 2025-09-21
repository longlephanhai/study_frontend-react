import { Button, Card, Flex, Input, Space, Typography } from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import ModalCreateUser from "./user.modal.create";
import { useQuery } from "@tanstack/react-query";
import { callApiFetchRoles } from "../../services/api";

const { Title } = Typography;

const UserHead = () => {
  const [isModalOpenCreateUser, setIsModalOpenCreateUser] = useState(false);


  const { isLoading, isError, data, error } = useQuery<IBackendRes<IModelPaginate<IRole>>, Error>({
    queryKey: ['fetchRole', ""],
    queryFn: (): Promise<IBackendRes<IModelPaginate<IRole>>> => callApiFetchRoles(""),
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }


  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 12,
      }}
      bodyStyle={{ padding: 20 }}
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap="large">

        <Title level={4} style={{ margin: 0 }}>
          👤 User Management
        </Title>

        <Flex gap="middle" align="center" wrap="wrap">
          <Input
            placeholder="Search user..."
            allowClear
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            style={{
              width: 260,
              borderRadius: 8,
            }}
          />

          <Space wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ borderRadius: 6 }}
              onClick={() => setIsModalOpenCreateUser(true)}
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

      <ModalCreateUser
        isModalOpenCreateUser={isModalOpenCreateUser}
        setIsModalOpenCreateUser={setIsModalOpenCreateUser}
        dataRole={data?.data?.result || []}
      />
    </Card>
  );
};

export default UserHead;
