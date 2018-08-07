
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
  
  const makeSelectWeeklyReports = () =>
  createSelector(selectTask, state => {
    const list= state.get('list')
    const time= Math.floor(Date.now() / 1000)
    const getDigit=Math.floor((time / 100000) % 10)
    var result=list.filter(doc=>{
      const getDigitFromList=Math.floor((doc.timeStamp / 100000) % 10)
        return getDigitFromList===getDigit
    })
    return result
  })
  const makeSelectMonthlyReports = () =>
  createSelector(selectTask, state => {
    const list= state.get('list')
    const time= Math.floor(Date.now() / 1000)
    const getDigit=Math.floor((time / 1000000) % 10)
    console.log("getdigit",getDigit);
    var result=list.filter(doc=>{
      const getDigitFromList=Math.floor((doc.timeStamp / 1000000) % 10)
        return getDigitFromList===getDigit
    })
    return result
  })

export {
  makeSelectReports,
  makeSelectHourReports,
  makeSelectWeeklyReports,
  makeSelectMonthlyReports
}
