import { Table, Input, InputNumber, Popconfirm, Form, Checkbox } from 'antd';
// import { SaveOutlined } from '@ant-design/icons';
import React, { useState } from 'react';


const originData = [
  {
    key: '1',
    name: 'Máy Tính',
    state: true,
    addressIp: '0.0.0.0',
  },
  {
    key: '2',
    name: 'Loa 1',
    state: true,
    addressIp: '192.168.1.1',
  },
  {
    key: '3',
    name: 'Loa 2',
    state: false,
    addressIp: '201.168.1.1',
  },
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      addressIp: "",
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Thiết bị phát",
      dataIndex: "name",
      width: "25%",
      editable: true
    },
    {
      title: "Trạng Thái Kết Nối",
      dataIndex: "state",
      width: "15%",
      editable: false,
      render: (state) => <Checkbox checked={state}/>
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "addressIp",
      width: "40%",
      editable: false
    },
    {
      title: "Chức Năng",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8
              }}
            >
              Lưu
            </a>
            <Popconfirm title="Bạn muốn thay đổi" onConfirm={cancel}>
              <a>Thoát</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            Chỉnh Sửa
          </a>
        );
      }
    }
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "addressIp" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        // pagination={{
        //   onChange: cancel,
        // }}
      />
    </Form>
  );
};

