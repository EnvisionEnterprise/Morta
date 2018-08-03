import React, { Component } from 'react';
import { Input, Button, Select,Icon } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import './App.css';
import { addTask,editTask,editInputTask } from './actions/type';

const Option = Select.Option;

class TaskManger extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task: '',
            project: '',
            type: '',
            hour: '0',
            list: []
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    handleChange(e) {
        this.setState({ task: e.target.value });
    }

    addTask() {
        const task = this.state.task;
        const project = this.state.project;
        const type = this.state.type;
        
        const hour = this.state.hour;
        const data = {
            task,
            project,
            type,
            hour
        }
        this.props.addTask(data)
    }

    valueChange(i,value,change){
     const data = {
         value,
         change,
         i
     }
     this.props.editTask(data)
     }

     onInputChange(value,i,input){
      const data={
        changevalue :value.target.value,
         index :i,
         change :input
        }
        this.props.editInputTask(data)
     }

    componentWillReceiveProps(nextProps) {
        this.setState({ list: nextProps.list })
    }


    render() {
        return (
            <div>Enter Task : 
                <Input className='inputBox' placeholder="Please enter Task" onChange={this.handleChange}/>
                <Button type="primary" onClick={this.addTask}>Add</Button>

                <div>
                    {this.state.list.map((post, i) => {
                        return (
                            <div>
                                <Select value={post.project}  onChange={(value)=>this.valueChange(i,value,'proj')} style={{ width: 150 }} >
                                    <Option value="DPW">DPW</Option>
                                    <Option value="JSW">JSW</Option>
                                </Select>
                                <Input className='inputBox' placeholder="Please enter task" value={post.task} onChange={(value)=>this.onInputChange(value,i,'task')} />
                                <Input className='inputBox' placeholder="Please enter hours" value={post.hour} onChange={(value)=>this.onInputChange(value,i,'hour')} />
                                <Select value={post.type} onChange={(value)=>this.valueChange(i,value,'type')} style={{ width: 150 }} >
                                    <Option value="Design">Design</Option>
                                    <Option value="Development">Development</Option>
                                </Select>
                                <Icon type="delete" onClick={()=>this.props.dispatch({type:'DELETE_TASK',task:post.task})}/>
                            </div>
                        )
                    }

                    )}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (data) => {
        dispatch(addTask(data))
        },
        editTask :(data)=>{
        dispatch(editTask(data))
        },
        editInputTask :(data)=>{
        dispatch(editInputTask(data))
        }

    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(TaskManger);