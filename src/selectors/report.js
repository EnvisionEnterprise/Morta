
import { createSelector } from 'reselect'
import * as moment from 'moment';

const selectReports = state =>{
    return state.get('report')
}
const selectTask = state =>{
  return state.get('task')
}

const makeSelectReports = () =>
  createSelector(selectTask, state => {
    return state.get('list')
  })

  const makeSelectHourReports = () =>
  createSelector(selectTask, state => {
    const list= state.get('list')
    const time= Math.floor(Date.now() / 1000)
    var result=list.filter(doc=>{
      var timeInMin=doc.timeStamp
        return timeInMin >= time-3600 && timeInMin <= time
    })
    return result
  })
  
export {
  makeSelectReports,
  makeSelectHourReports
}
