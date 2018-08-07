import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  addTask,
  editTask,
  deleteTask,
  getLIst
} from '../../modules/task';

import {makeSelectReports} from '../../selectors/report'

import TaskManager from './component'


const mapStateToProps = createStructuredSelector({
  list: makeSelectReports(),

})

function mapDispatchToProps (dispatch) {
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
