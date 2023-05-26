import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd/lib';
import React, { useEffect, useRef } from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;

  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values); // 如果外层数据变了，回传给表单内部
    }
  }, [values]);
  return (
    <Modal visible={visible} onCancel={() => onCancel?.()} footer={null}>
      <ProTable
        type="form"
        formRef={formRef}
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value); // 交给外层定义
        }}
      />
      ;
    </Modal>
  );
};
export default UpdateModal;
