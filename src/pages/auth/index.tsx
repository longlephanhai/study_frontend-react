import {
  GithubOutlined,
  GooglePlusOutlined,
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';

import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Space, Tabs, message, notification, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { callApiLogin } from '../../services/api';
import { useNavigate } from 'react-router-dom';


type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

interface ILoginParams {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { token } = theme.useToken();
  const navigate = useNavigate()

  const mutation = useMutation<IBackendRes<IAccount>, Error, ILoginParams>({
    mutationFn: callApiLogin,
    onSuccess: (response) => {

      if (response.data) {
        localStorage.setItem('access_token', response.data.access_token);
        navigate('/');
      }
    },
    onError: (error) => {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          error.message,
        duration: 5
      });
    }
  });

  const onFinish = async (values: any) => {
    mutation.mutate(values);
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Study"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        onFinish={onFinish}
        submitter={{
          render: (_, __) => {
            return [
              <Button
                key="customSubmit"
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Log In Now
              </Button>,
            ];
          },
        }}
        subTitle="Your ultimate platform to master English anytime, anywhere"
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                Other login methods
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}

              >
                <GooglePlusOutlined style={{ ...iconStyles, color: '#DB4437' }} />

              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid ' + token.colorPrimaryBorder,
                  borderRadius: '50%',
                }}
              >
                <GithubOutlined style={{ ...iconStyles, color: '#FFFFFF' }} />

              </div>
            </Space>
          </div>
        }
      >
        <Tabs
          items={[
            { key: 'account', label: 'Login with account and password' },
            { key: 'phone', label: 'Login with phone number' },
          ]}
          activeKey={loginType}
          onChange={(key) => {
            setLoginType(key as LoginType);
          }}
          centered
        />
        {loginType === 'account' && (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'Enter your email'}
              rules={[{
                required: true,
                message: 'Please enter your email!',
              },
              {
                type: 'email',
                message: 'Invalid email format!',
              }]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'Enter your password'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              name="mobile"
              placeholder={'mobile number'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your mobile number!',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: 'Invalid mobile number format!',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'Please enter the verification code'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'Get verification code'}`;
                }
                return 'Get verification code';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: 'Please enter the verification code!',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('Verification code sent successfully! The code is: 1234');
              }}
            />
          </>
        )}

      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <LoginPage />
    </ProConfigProvider>
  );
};