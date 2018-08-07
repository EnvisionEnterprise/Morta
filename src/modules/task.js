import {types} from '../constants/types'
import {fromJS} from 'immutable';


export const addTask = (data) => {
    return {
        type: types.ADD_TASK,
        data
    }
}

export const editTask = (data) => {
    return {
        type: types.EDIT_INPUT,
        data
    }
}

export const deleteTask = (data) => {
    return {
        type: types.DELETE_TASK,
        data
    }
}
export const getTaskList = (data) => ({
    type: types.FETCH_TASK_LIST,
    data
})

export const getLIst = () => {
    return {
        type: types.GET_LIST
    }
}
const initialState = fromJS({
    list:[]
})

const task = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TASK_LIST: {
      return state.set('list',action.data)
    }
    default:
    return state
}
}
export default task
