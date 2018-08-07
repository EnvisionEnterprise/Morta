import React from 'react'

import { Collapse, List } from 'antd';
import styled from "styled-components";

const Panel = Collapse.Panel;

export default class ReportComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hourList:this.props.hourList,
            weeklyList:this.props.weeklyList,
            monthlyList:this.props.monthlyList
        }
        this.unixTimeConversion=this.unixTimeConversion.bind(this)
        this.unixToDate=this.unixToDate.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.hourList){
            this.setState({hourList:nextProps.hourList})
        }
        if(nextProps.weeklyList){
            this.setState({weeklyList:nextProps.weeklyList})
        }
        if(nextProps.monthlyList){
            this.setState({monthlyList:nextProps.monthlyList})
        }
    }


    render(){
        console.log("listtttttttttt",this.props,this.state.hourList,this.state.weeklyList,this.state.monthlyList);
        return(
            <Wrapper>
                <Title>Report
                </Title>
                <Borderd>
                <Collapse bordered={false} >
                    <Panel header="Hourly" key="1">
                        <List
                        size="small"
                        dataSource={this.props.hourList}
                        renderItem={item => (
                        <List.Item>
                        <List.Item.Meta
                        title={<h4>{item.task}</h4>}
                        description={<h5>{item.hour} hours spent</h5>}
                        />
                         <div>{this.unixTimeConversion(item.timeStamp)}</div></List.Item>
                        )}
                        />
                    </Panel>
                    <Panel header="Weekly" key="2">
                        <List
                            size="small"
                            dataSource={this.state.weeklyList}
                            renderItem={item => (
                            <List.Item>
                            <List.Item.Meta
                            title={<h4>{item.task}</h4>}
                            description={<h5>{item.hour} hours spent</h5>}
                            />
                            <div>{this.unixToDate(item.timeStamp)}</div></List.Item>
                            )}
                            />
                    </Panel>
                    <Panel header="Monthly" key="3">
                    <List
                        size="small"
                        dataSource={this.state.monthlyList}
                        renderItem={item => (
                        <List.Item>
                        <List.Item.Meta
                        title={<h4>{item.task}</h4>}
                        description={<h5>{item.hour} hours spent</h5>}
                        />
                         <div>{this.unixToDate(item.timeStamp)}</div></List.Item>
                        )}
                        />
                    </Panel>
                </Collapse>
                </Borderd>
          </Wrapper>
        )
    }

    unixTimeConversion(t){
        var dt = new Date(t*1000);
        var hr = dt.getHours();
        var m = "0" + dt.getMinutes();
        var s = "0" + dt.getSeconds();
        return hr+ ':' + m.substr(-2)
    }
    unixToDate(t){
        var dt = new Date(t*1000);
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month = months_arr[dt.getMonth()];
        var date=dt.getDate()
        return `${month},${date}`
    }
}

//styled components
const Wrapper = styled.div`
  display: 'flex',
  justifyContent: 'flex-end',
`;
const Title = styled.h1`
  font-size: 1.5em;
  display: 'flex',
  marginBottom: 0
`;
const Borderd = styled.div`
  border: 0.5em
  height:100,
  width:100,
`;