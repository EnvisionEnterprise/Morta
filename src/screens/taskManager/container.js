import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  addTask,
  editTask,
  deleteTask,
  getLIst
} from '../../modules/task';

import { getMonthlyList } from '../../modules/report'

import TaskManager from './component'

const mapStateToProps = (state) => {
  return {
    data: state.task
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addTask,
        editTask,
        deleteTask,
        getLIst
      },
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskManager)
