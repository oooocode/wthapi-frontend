import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {listInvokeInterfaceTopNUsingGET} from "@/services/yuapi-backend/analysisController";
import {message} from "antd";

const InterfaceAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);

  useEffect(() => {
    try {
      listInvokeInterfaceTopNUsingGET({
        limit: 3,
      }).then(res => {
        if (res.data){
          setData(res.data);
        }
      })
    }catch (e: any){
      message.error("数据加载错误, ", e);
    }
  }, []);

  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name
    }
  })

  const option = {
    title: {
      text: '接口调用次数TOP3',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <PageContainer title="接口分析">
      <ReactECharts loadingOption={{
        showLoading: loading
      }} option={option} />
    </PageContainer>
  );
};

export default InterfaceAnalysis;
