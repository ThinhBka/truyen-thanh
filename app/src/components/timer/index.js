import { Table, Button, Modal, TimePicker, Select, Popconfirm, Form, Input, DatePicker } from "antd";
import React from "react";
import { EditOutlined, DeleteOutlined, EditFilled } from "@ant-design/icons";
import moment from "moment";

// Select Source
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

// format timer
const format = "HH:mm";


export default class TableTimer extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "STT",
        dataIndex: "id",
        key: "id",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Danh sách hẹn giờ",
        dataIndex: "name",
        key: "name",
        editable: true,
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "timeStart",
        key: "timeStart",
        editable: true,
        render: (time) => (
          <TimePicker defaultValue={moment(time, format)} format={format} />
        ),
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "timeEnd",
        key: "timeEnd",
        editable: true,
        render: (time) => (
          <TimePicker defaultValue={moment(time, format)} format={format} />
        ),
      },
      {
        title: "Thiết bị phát",
        key: "source",
        editable: true,
        dataIndex: "source",
        render: (devices) => (
          <>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChange}
            >
              {devices.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </>
        ),
      },
      {
        title: "Chức Năng",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <Button
                style={{ margin: 5 }}
                icon={<EditOutlined />}
                onClick={() => console.log("edit")}
              />
              <Button
                style={{ margin: 5 }}
                icon={<DeleteOutlined />}
                onClick={this.handleDelete(record.key)}
                danger
              />
            </>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          id: 123,
          key: "1",
          name: "Nhạc cổ truyền",
          timeStart: "11:00",
          timeEnd: "12:00",
          source: ["máy 1", "máy 2"],
        },
        {
          id: 234,
          key: "2",
          name: "Thời sự",
          timeStart: "11:30",
          timeEnd: "12:30",
          source: ["máy 1", "máy 2", "máy 3", "máy 4"],
        },
        {
          id: 156,
          key: "3",
          name: "Nhạc quốc tế",
          timeStart: "11:20",
          timeEnd: "12:00",
          source: ["máy 1", "máy 2", "máy 3", "máy 4"],
        },
      ],
      count: 2,
      loadings: [],
      dataEdit: false,
      visible: false,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  enterLoading = (index) => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      this.showModal();

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

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  render() {
    const { loadings, dataEdit, visible, dataSource } = this.state;
    return (
      <>
        <Table columns={this.columns} dataSource={dataSource} pagination={false} />
        <Button
          className="btn-edit-source"
          type="primary"
          icon={<EditFilled />}
          loading={loadings[1]}
          disabled={dataEdit}
          onClick={() => this.enterLoading(1)}
        >
          Tạo mới hẹn giờ
        </Button>
        <Modal
          title="Tạo hẹn giờ mới"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          <Form
            {...formItemLayout}
            name="register"
            onFinish={this.onFinish}
            initialValues={{
              prefix: "86",
            }}
            style={{ margin: 60 }}
            scrollToFirstError
          >
            <Form.Item>
              <div className="info-user">Hẹn Giờ</div>
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên Hẹn Giờ"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="timeStart"
              label="Thời gian bắt đầu"
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name="timeEnd"
              label="Thời gian kết thúc"
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name="source"
              label="Thiết bị phát"
            >
              <Select
                // mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleChange}
              >
                {['nguồn 1', 'nguồn 2'].map((item) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject("Should accept agreement"),
                },
              ]}
            >
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
