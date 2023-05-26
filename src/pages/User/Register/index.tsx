import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm, ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import {userRegisterUsingPOST} from "@/services/yuapi-backend/userController";
import {Link} from "@@/exports";
const Register: React.FC = () => {
  const [type] = useState<string>('account');

  //注册逻辑
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const {userPassword, checkPassword} = values;
    //校验
    if (userPassword !== checkPassword) {
      message.error("两次输入密码不一致");
      return;
    }
    try {
      const res = await userRegisterUsingPOST(values);
      // 注册
      if (res.data) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        history.push({
          pathname: '/user/login',
        });
        return;
      }
      // 打印错误信息
      message.error(res.message);
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (

    <div /*className={styles.container}*/>
      <div /*className={styles.content}*/>
        <div
          style={{
            marginBottom: 24,
          }}
        >
        </div>
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="API 接口开放平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <div
            style={{
              marginBottom: 15,
            }}
          >
          </div>
          <Tabs
            activeKey={type}
            centered
            items={[
              {
                key: 'account',
                label: '注册',
              }
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入账号!'}
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
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码!'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "长度不能小于8"
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请再次输入密码!'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "长度不能小于8"
                  }
                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入星球编号!'}
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                ]}
              />
            </>
          )}
          <ProFormCheckbox noStyle name="autoLogin">
            格局打开
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            <Link to="/user/login">返回登录</Link>
          </a>
          <div
            style={{
              marginBottom: 24,
            }}
          >
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Register;
