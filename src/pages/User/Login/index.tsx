import { userLoginUsingPOST } from "@/services/yuapi-backend/userController";
import {
LockOutlined,
UserOutlined,
} from '@ant-design/icons';
import {
LoginForm,
ProFormCheckbox,
ProFormText
} from '@ant-design/pro-components';
import { Helmet,history,useModel } from '@umijs/max';
import { Alert,message,Tabs } from 'antd';
import React,{ useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import {Link} from "@@/exports";
import {flushSync} from "react-dom";
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type] = useState<string>('account');
  const {  setInitialState } = useModel('@@initialState');

  const fetchUserInfo = (userInfo:API.UserVO) => {
    if(userInfo) {
      flushSync(() => {
        setInitialState({loginUser: userInfo});
      })
    }
  }
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST({
        ...values,
      });
      if (res.data){
        message.success('登录成功！');
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        // 设置登录态到全局对象中去
        // setInitialState({loginUser: res.data,});
        fetchUserInfo(res.data);
        return;
      }
      // 打印错误信息
      message.error(res.message)
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div /*className={containerClassName}*/>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      {/*<Lang />*/}
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="API 接口开放平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              }
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <Link to="/user/register">新用户注册</Link>

            </a>
          </div>
        </LoginForm>
      </div>
      {/*<Footer />*/}
    </div>

  );
};
export default Login;
