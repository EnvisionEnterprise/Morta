import React, { Component } from 'react';
import TaskManger from './screens/taskManager/container';
import ReportComponent from './screens/report/container';

export default class App extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <TaskManger/>
        <ReportComponent/>
      </div>
    )
  }
}