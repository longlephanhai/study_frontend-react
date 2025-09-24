import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  Row,
  Col,
  Card,
  Checkbox,
  Typography,
  Input,
  Button,
  Space,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { callApiUpdateRole } from "../../services/api";

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  permissions?: IPermission[];
  dataEdit: IRole | null;
}

const RoleModalUpdate = ({
  isModalOpenUpdate,
  setIsModalOpenUpdate,
  permissions,
  dataEdit,
}: IProps) => {
  const { Text } = Typography;

  // ✅ Lưu selected theo từng module
  const [selectedByModule, setSelectedByModule] = useState<
    Record<string, string[]>
  >({});
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  // 👉 Group permissions theo module
  const grouped = permissions?.reduce((acc, item) => {
    (acc[item.module] ||= []).push(item);
    return acc;
  }, {} as Record<string, IPermission[]>);

  // 👉 Prefill khi mở modal
  useEffect(() => {
    if (dataEdit && permissions) {
      setRoleName(dataEdit.name);
      setDescription(dataEdit.description || "");

      // tách permission theo module
      const ids =
        dataEdit.permissions?.map((p: any) =>
          typeof p === "string" ? p : p._id
        ) || [];

      const newSelected: Record<string, string[]> = {};
      permissions.forEach((p) => {
        if (ids.includes(p._id)) {
          (newSelected[p.module] ||= []).push(p._id);
        }
      });

      setSelectedByModule(newSelected);
    }
  }, [dataEdit, permissions]);

  const queryClient = useQueryClient()

  const mutation = useMutation<IBackendRes<IRole>, Error, { id: string; data: { name: string; description: string; permissions: string[] } }>({
    mutationFn: ({ id, data }) => callApiUpdateRole(id, data),
    onSuccess: (response) => {
      if (response.data) {
        notification.success({
          message: "Update role successfully!",
          description:
            response.message,
          duration: 5
        });
        queryClient.invalidateQueries({ queryKey: ['fetchPermission'] })
        setIsModalOpenUpdate(false);
      }
    },
    onError: (error) => {
      notification.error({
        message: "Update role failed!",
        description:
          error.message,
        duration: 5
      });
    }
  });

  const handleUpdate = () => {
    const allSelected = Object.values(selectedByModule).flat();
    const dataUpdate = {
      name: roleName,
      description,
      permissions: allSelected
    }
    mutation.mutate({ id: dataEdit?._id || '', data: dataUpdate })

  };

  return (
    <Modal
      title="Update Role"
      open={isModalOpenUpdate}
      onCancel={() => setIsModalOpenUpdate(false)}
      footer={null}
      width="90vw"
      bodyStyle={{ background: "#f8fafc" }}
    >
      {/* ---- Inputs ---- */}
      <Space direction="vertical" style={{ width: "100%", marginBottom: 20 }}>
        <Input
          placeholder="Role Name (e.g. Admin)"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          size="large"
        />
        <Input.TextArea
          placeholder="Role Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </Space>

      {/* ---- Permission Cards ---- */}
      <Row gutter={[20, 20]}>
        {grouped &&
          Object.entries(grouped).map(([module, items]) => (
            <Col key={module} xs={24} sm={12} lg={8}>
              <Card
                title={
                  <Text strong style={{ color: "#1e40af" }}>
                    {module}
                  </Text>
                }
                bordered={false}
                style={{
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.05), 0 1px 6px rgba(0,0,0,0.04)",
                }}
              >
                <Checkbox.Group
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  value={selectedByModule[module] || []}
                  onChange={(vals) =>
                    setSelectedByModule((prev) => ({
                      ...prev,
                      [module]: vals as string[],
                    }))
                  }
                >
                  {items.map((p) => (
                    <Checkbox key={p._id} value={p._id}>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>
                        ({p.method}) {p.apiPath}
                      </div>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Card>
            </Col>
          ))}
      </Row>

      {/* ---- Update Button ---- */}
      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Button type="primary" size="large" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default RoleModalUpdate;
