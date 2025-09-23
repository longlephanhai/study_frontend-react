import { Col, Modal, Row } from "antd";
import { Form, Input } from 'antd';



interface IProps {
  isModalOpenCreatePermission: boolean;
  setIsModalOpenCreatePermission: (isOpen: boolean) => void;
}

const PermissionModal = (props: IProps) => {
  const { isModalOpenCreatePermission, setIsModalOpenCreatePermission } = props;
  const handleOk = () => {
    setIsModalOpenCreatePermission(false);
  };

  const handleCancel = () => {
    setIsModalOpenCreatePermission(false);
  };
  return (
    <Modal
      title="Create New Permission"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpenCreatePermission}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      okText="Create"
      cancelText="Cancel"
      width={600}
    >
      <Form
        name="basic"
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item<IPermission>
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input permission name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IPermission>
              label="API Path"
              name="apiPath"
              rules={[{ required: true, message: 'Please input API path!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IPermission>
              label="Method"
              name="method"
              rules={[{ required: true, message: 'Please input method!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IPermission>
              label="Module"
              name="module"
              rules={[{ required: true, message: 'Please input module!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>


      </Form>
    </Modal>
  )
}

export default PermissionModal;