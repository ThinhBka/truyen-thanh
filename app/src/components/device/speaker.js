import { Table, Button, Space, Checkbox } from 'antd';
import React from 'react';
import { SaveOutlined, EditFilled, PoweroffOutlined } from '@ant-design/icons';


const columns = [
  {
    title: 'Danh sách loa',
    dataIndex: 'name',
    key: 'name',
    editable: true,
    render: text => <a>{text}</a>,
  },
  {
    title: 'Bật/Tắt',
    dataIndex: 'state',
    key: 'state',
    editable: true,
    render: state => <Button 
        type="primary"
        shape="circle"
        icon={<PoweroffOutlined />}
        disabled={state}
        onClick={() => console.log("abc")}
      />
  },
  {
    title: 'Kết nối',
    dataIndex: 'connect',
    key: 'connect',
    render: (connect, _) => <Checkbox checked={connect}/>,
  },
  {
    title: 'Nguồn phát',
    key: 'source',
    dataIndex: 'source',
    render: text => (
      <>
        <a>{text}</a>
      </>
    ),
  },
  {
    title: 'Hẹn Giờ',
    key: 'timer',
    dataIndex: 'timer',
    render: (text, record) => (
      <Space size="middle">
        <a>{text}</a>
      </Space>
    ),
  },
];

// const mergedColumns = columns.map((col) => {
//   if (!col.editable) {
//     return col;
//   }

//   return {
//     ...col,
//     onCell: (record) => ({
//       record,
//       inputType: col.dataIndex === "addressIp" ? "number" : "text",
//       dataIndex: col.dataIndex,
//       title: col.title,
//       editing: isEditing(record)
//     })
//   };
// });

const data = [
  {
    key: '1',
    name: 'Loa 1',
    state: true,
    connect: true,
    source: 'Computer',
    timer: '123',
  },
  {
    key: '2',
    name: 'Loa 2',
    state: true,
    connect: false,
    source: 'Computer',
    timer: '234',
  },
  {
    key: '3',
    name: 'Loa 3',
    state: false,
    connect: false,
    source: 'Computer',
    timer: '156',
  },
];

export default class TableSpeaker extends React.Component{
  state = {
    loadings: [],
    dataSave: true,
    dataEdit: false
  };

  enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };
  render(){
    const { loadings, dataSave, dataEdit } = this.state;
    return(
      <>
        <Table columns={columns} dataSource={data} pagination={false}/>
        <Button 
          className="btn-save-source"
          type="primary"
          icon={<SaveOutlined />}
          loading={loadings[1]}
          disabled={dataSave}
          // onClick={() => this.enterLoading(1)}
        >
          Lưu
        </Button>
        <Button 
          className="btn-edit-source"
          type="primary"
          icon={<EditFilled />}
          loading={loadings[1]}
          disabled={dataEdit}
          // onClick={() => this.enterLoading(1)}
        >
          Chỉnh Sửa
        </Button>
      </>
    );
  }
  }