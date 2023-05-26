import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/yuapi-backend/interfaceInfoController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import {Button, Card, Descriptions, Divider, Form, Input, message, Tag} from 'antd';
import React, { useEffect, useState } from 'react';
import {addUserInterfaceInfoUsingPOST} from "@/services/yuapi-backend/userInterfaceInfoController";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();

  const params = useParams();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      if (!res.data) {
        return;
      }
      setData(res?.data);
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setLoading(false);
  };

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在!');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: Number(params.id),
        ...values
      });
      setInvokeRes(res.data);
      message.success('调用成功');
    } catch (error: any) {
      message.error('调用失败,' + error.message);
    }
    setInvokeLoading(false);
  };

  const openInterface = async () => {
    if (!params.id) {
      message.error('接口不存在!');
      return;
    }
    try {
      await addUserInterfaceInfoUsingPOST({
        interfaceId: data?.id,
      });
      message.success('开通成功,默认为100次');
    } catch (error: any) {
      message.error('开通失败,' + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer>
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="status">
              {data.status === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">关闭</Tag>}
            </Descriptions.Item>
            <Descriptions.Item label="url">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="描述信息">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
        <Button type="primary" onClick={openInterface}>开通</Button>
      </Card>
      <Divider/>
      <Card title="在线测试">
        <Form name="invoke" layout="vertical" onFinish={onFinish} >
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};
export default Index;
