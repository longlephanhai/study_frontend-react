import { Modal, Row, Col, Card, Checkbox, Typography, Input, Button, Space } from "antd";
import { useEffect, useState } from "react";

interface IPermission {
  _id: string;
  name: string;
  apiPath: string;
  method: string;
  module: string;
}

interface IProps {
  isModalOpenUpdate: boolean;
  setIsModalOpenUpdate: (isOpen: boolean) => void;
  permissions?: IPermission[];
  dataEdit: IRole | null;
}

const RoleModalUpdate = (props: IProps) => {
  const { isModalOpenUpdate, setIsModalOpenUpdate, permissions, dataEdit } = props;
  console.log("dataEdit:", dataEdit);
  useEffect(() => {
    if (dataEdit) {
      // Nếu dataEdit.permissions là mảng object => map sang _id
      setSelected(dataEdit.permissions?.map((p: any) => p._id) || []);
      setRoleName(dataEdit.name);
      setDescription(dataEdit.description || "");
    }
  }, [dataEdit]);
  const [selected, setSelected] = useState<string[]>([]);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const { Text } = Typography;

  const handleCreate = () => {
    console.log("Role Name:", roleName);
    console.log("Description:", description);
    console.log("Selected Permission IDs:", selected);
    setIsModalOpenUpdate(false);
  };

  // 👉 Group permissions by module
  const grouped = permissions?.reduce((acc, item) => {
    (acc[item.module] ||= []).push(item);
    return acc;
  }, {} as Record<string, IPermission[]>);

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
                  value={selected}
                  onChange={(vals) => setSelected(vals as string[])}
                >
                  {items.map((p) => (
                    <Checkbox key={p._id} value={p._id}>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>
                        ({p.method}) {p.apiPath} {p._id}
                      </div>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Card>
            </Col>
          ))}
      </Row>

      {/* ---- Create Button ---- */}
      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Button type="primary" size="large" onClick={handleCreate}>
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default RoleModalUpdate;
