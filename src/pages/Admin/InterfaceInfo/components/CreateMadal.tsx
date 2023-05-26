import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd/lib';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const CreateMadal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;
  return (
    <Modal visible={visible} onCancel={() => onCancel?.()} footer={null}>
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value); // 交给外层定义
        }}
      />
      ;
    </Modal>
  );
};
export default CreateMadal;
