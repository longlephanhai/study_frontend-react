import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, Form, Input, InputNumber, message, Modal, Row, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { callApiCreateTest } from "../../services/api";

interface IProps {
  isModalOpenCreateTest: boolean;
  setIsModalOpenCreateTest: (isOpen: boolean) => void;
}

const TestModal = (props: IProps) => {
  const { isModalOpenCreateTest, setIsModalOpenCreateTest } = props;

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation<IBackendRes<ITest>, Error, ITest>({
    mutationFn: callApiCreateTest,
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['fetchTest'] })
      message.success(response.message)
      setIsModalOpenCreateTest(false);
      form.resetFields();
    },
    onError: (error) => {
      message.error(error.message)
    }
  })

  const onFinish = async (value: ITest) => {
    mutation.mutate(value);
  };

  const handleCancel = () => {
    setIsModalOpenCreateTest(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Create New Test"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpenCreateTest}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      maskClosable={false}
      okText="Create"
      cancelText="Cancel"
      width={500}
    >
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item<ITest>
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input test title!' }]}
            >
              <Input placeholder="Enter Test Title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<ITest>
              label="Link Audio"
              name="audioUrl"
              rules={[{ required: true, message: 'Please input test link audio!' }]}
            >
              <Input placeholder="Enter Test Link Audio" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<ITest>
              label="Public"
              name="isPublic"
              rules={[{ required: true, message: 'Please select the visibility!' }]}
            >
              <Switch checked={form.getFieldValue('isPublic')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<ITest>
              label="Total Questions"
              name="totalQuestions"
              rules={[{ required: true, message: 'Please input the total questions!' }]}
            >
              <InputNumber max={200} min={1} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ITest>
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input test description!' }]}
            >
              <TextArea placeholder="Enter Test Description" autoSize />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default TestModal;