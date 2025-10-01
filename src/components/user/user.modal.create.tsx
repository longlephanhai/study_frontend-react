import { Col, Form, Image, Input, InputNumber, Modal, Row, Select, Upload } from "antd"
import { useState } from "react";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { callApiCreateUser, callApiUploadAvatar } from "../../services/api";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface IProps {
  isModalOpenCreateUser: boolean
  setIsModalOpenCreateUser: (open: boolean) => void
  dataRole?: IRole[]
}

const { Option } = Select;

const ModalCreateUser = (props: IProps) => {

  const queryClient = useQueryClient()

  const [form] = Form.useForm();

  const { isModalOpenCreateUser, setIsModalOpenCreateUser, dataRole } = props

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [fileList, setFileList] = useState<UploadFile[]>([

  ]);

  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const onUploadAvatar = async ({ onSuccess }: { onSuccess?: (response: any) => void }) => {
    const response = await callApiUploadAvatar(fileList[0].originFileObj as File);
    if (response && response.data) {
      setAvatarUrl(response.data.data.filename);
      onSuccess && onSuccess(response.data)
      message.success('Upload avatar successfully!');
    } else {
      onSuccess && onSuccess(null)
      message.error('Upload avatar failed. Please try again!');
    }
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleCancel = () => {
    setIsModalOpenCreateUser(false);
  };

  const prefixSelector = (
    <Form.Item noStyle>
      <Select style={{ width: 70 }} defaultValue="84">
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  // Mutations
  const mutation = useMutation<IBackendRes<IUser>, Error, IUser>({
    mutationFn: callApiCreateUser,
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['fetchUser'] })
      message.success(response.message)
      setIsModalOpenCreateUser(false);
      form.resetFields();
      setFileList([]);
      setPreviewImage('');
      setAvatarUrl('');
    },
    onError: (error) => {
      message.error(error.message)
    }
  })

  const onFinish = async (values: IUser) => {
    values.avatar = avatarUrl;
    mutation.mutate(values);
    // if (mutation.isPending) {
    //   message.loading({ content: 'Creating user...', key: 'createUser' });
    // }
    // if (mutation.isSuccess) {
    //   message.success({ content: 'User created successfully!', key: 'createUser', duration: 2 });
    //   setIsModalOpenCreateUser(false);
    //   form.resetFields();
    //   setFileList([]);
    //   setPreviewImage('');
    //   setAvatarUrl('');
    // }
    // if (mutation.isError) {
    //   message.error({ content: 'Error creating user. Please try again!', key: 'createUser', duration: 2 });
    // }
  }
  return (
    <Modal
      title="Create New User"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpenCreateUser}
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
            <Form.Item<IUser>
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IUser>
              label="Age"
              name="age"
              rules={[{ required: true, message: 'Please input your age!' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} max={100} defaultValue={0} placeholder="Enter your age" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IUser>
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                },
                {
                  required: true,
                  message: 'Email is required!',
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IUser>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IUser>
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <InputNumber placeholder="Enter your phone number" addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IUser>
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <Input placeholder="Enter your address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select role!' }]}
            >
              <Select placeholder="select your role">
                {
                  dataRole && dataRole.length > 0 && dataRole.map((role) => (
                    <Option key={role._id} value={role._id}>{role.name}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="avatar"
              label="Avatar"
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                onPreview={handlePreview}
                onChange={handleChange}
                name="avatar"
                customRequest={onUploadAvatar}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalCreateUser