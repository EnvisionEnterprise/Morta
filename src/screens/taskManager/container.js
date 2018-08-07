import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { 
    addTask,
    editTask,
    editInputTask,
    deleteTask,
    getLIst } from '../../modules/task';

import {getMonthlyList} from '../../modules/report'

import {
  makeSelectReports,
  makeSelectHourReports,
  makeSelectWeeklyReports,
  makeSelectMonthlyReports} from '../../selectors/report'

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
        editInputTask,
        deleteTask,
        getLIst
      },
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskManager)
