import { combineReducers } from 'redux-immutable'

import task from './task'
import report from './report'
 
export default function createReducer (asyncReducers) {
  return combineReducers({
    task,
    report,
    ...asyncReducers
  })
}
