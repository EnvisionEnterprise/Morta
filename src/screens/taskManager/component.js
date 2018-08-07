import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import styled from 'styled-components';
import ReportComponent from './reportComponent';
import * as moment from 'moment';

const data = [];
const FormItem = Form.Item;
const Option = Select.Option;
const EditableContext = React.createContext();

const Title = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: #1890ff;
  margin-top: 20px;
`;

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        } else if (this.props.inputType === 'select' && this.props.dataIndex === 'project') {
            return (<Select style={{ width: 300 }}>
                <Option value="DPW">DPW</Option>
                <Option value="JSW">JSW</Option>
            </Select>);
        } else if (this.props.inputType === 'select' && this.props.dataIndex === 'type') {
            return (<Select style={{ width: 300 }}>
                <Option value="Design">Design</Option>
                <Option value="Development">Development</Option>
            </Select>);
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class TaskManger extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: ``,
            project: ``,
            task: ``,
            type: ``,
            hour: 0,
            data,
            editingKey: ''
        }
        this.addTask = this.addTask.bind(this);
        this.taskChange = this.taskChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.columns = [
            {
                title: 'Projects',
                dataIndex: 'project',
                width: '25%',
                editable: true,
                inputType: 'select',
            },
            {
                title: 'Task',
                dataIndex: 'task',
                width: '15%',
                editable: true,
            },
            {
                title: 'Hours',
                dataIndex: 'hour',
                width: '15%',
                editable: true,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                width: '25%',
                editable: true,
                inputType: 'select',
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8 }}>Save</a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="Sure to cancel?"
                                        onConfirm={() => this.cancel(record.key)}>
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    <a onClick={() => this.edit(record.key)}>Edit</a>
                                )}
                            <div>
                                <a onClick={() => this.delete(record)}>Delete</a>
                            </div>

                        </div>
                    );
                },
            },
        ];

    }



    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data })
    }
    componentWillMount() {
        this.props.actions.getLIst()
    }

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    delete(key) {
        this.props.actions.deleteTask(key)
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const data = [...this.state.data];
            const index = data.findIndex(item => key === item.key);
            if (index > -1) {
                const item = data[index];
                data.splice(index, 1, {
                    ...item,
                    ...row,
                });
                console.log("Data==", item, data[index])
                this.props.actions.editTask(data[index])
                //this.setState({ data: data, editingKey: '' });
            } else {
                data.push(row);
                //this.setState({ data: data, editingKey: '' });
            }
        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    taskChange(e) {
        this.setState({ task: e.target.value });
    };

    addTask(e) {
        const name = e.target.value.trim();
        const task = this.state.task;
        const project = this.state.project;
        const type = this.state.type;
        const hour = this.state.hour;
        const key = this.state.data.length.toString();
        const data = {
            task,
            project,
            type,
            hour,
            key,
        }
        if (task !== '')
            this.props.actions.addTask(data)
            e.target.value=''
    }

    handleKeyPress(e) {
        const name = e.target.value.trim();
        if (e.key === 'Enter' && name) {
            const task = this.state.task;
            const project = this.state.project;
            const type = this.state.type;
            const hour = this.state.hour;
            const key = this.state.data.length.toString();
            const data = {
                task,
                project,
                type,
                hour,
                key,
            }
            if (task !== '')
                this.props.actions.addTask(data)
                e.target.value=''
        }
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div>
                <div>
                    <Title >
                        Enter Task :
                        <Input className='inputBox' onKeyPress={this.handleKeyPress}
                            ref="inputBox" placeholder="Please enter task" onChange={this.taskChange} />
                        <Button type="primary" onClick={this.addTask}>Add</Button>
                    </Title>
                    <Title>
                        <Table
                            components={components}
                            bordered
                            dataSource={this.state.data}
                            columns={columns}
                            rowClassName="editable-row"
                        />
                    </Title>
                </div>



                <ReportComponent list={this.state.data} actions={this.props.actions} />

            </div>
        );
    }
}

export default (TaskManger);