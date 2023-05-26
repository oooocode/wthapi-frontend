// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listInvokeInterfaceTopN GET /api/analysis/top */
export async function listInvokeInterfaceTopNUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInvokeInterfaceTopNUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListInterfaceInfoVO>('/api/analysis/top', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
