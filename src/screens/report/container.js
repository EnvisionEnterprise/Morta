import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import {
  makeSelectHourReports,
  makeSelectWeeklyReports,
  makeSelectMonthlyReports} from '../../selectors/report'

import ReportComponent from './component'


const mapStateToProps = createStructuredSelector({
  hourList:makeSelectHourReports(),
  weeklyList:makeSelectWeeklyReports(),
  monthlyList:makeSelectMonthlyReports()
})


export default connect(mapStateToProps)(ReportComponent)
