/* global API_HOST */
import _ from 'lodash'
import axiosHoolai from '../../../../../utils/axios-api'
import openNotificationWithIcon from '../../../../base/components/Notification'

// ------------------------------------
// Constants
// ------------------------------------
const ENTRY_DETAIL_RECEIVE = 'ENTRY_DETAIL_RECEIVE'

const ENTRY_DETAIL_EDIT_RECEIVE = 'ENTRY_DETAIL_EDIT_RECEIVE'

const ENTRY_DETAIL_ERR = 'ENTRY_DETAIL_ERR'
// ------------------------------------
// Actions
// ------------------------------------
function receiveDetail(data) {
  return {
    type: ENTRY_DETAIL_RECEIVE,
    payload: data
  }
}

function requestErr(data) {
  return {
    type: ENTRY_DETAIL_ERR,
    payload: data
  }
}

function receiveEdit(data) {
  return {
    type: ENTRY_DETAIL_EDIT_RECEIVE,
    payload: data
  }
}

function fetchDetail(value) {
  return (dispatch) => {

    let url = `${API_HOST}/trans/search/${value.id}`
    axiosHoolai.get(
      url,
      {
        params: {
          language: value.language
        }
      },
      {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveDetail(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchEdit(value, st) {
  return (dispatch) => {

    let url = `${API_HOST}/trans`
    axiosHoolai.put(
      url,
      value,
      {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      console.log(st)
      dispatch(receiveEdit(response))
      _.map(st.entries, (v, i) => {
        if (v.key === response.data.entry.key) {
          st.entries[i] = response.data.entry
        }
      })
      openNotificationWithIcon('success', '修改成功!')
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchDetail,
  fetchEdit
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ENTRY_DETAIL_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      lists: action.payload.data.entry || {}
    })
  },

  [ENTRY_DETAIL_EDIT_RECEIVE]: (state, action) => {
    if (action.payload.data.entry.key === state.lists.key) {
      if (action.payload.data.entry.language === '基础词条') {
        state.lists.baseEntry = action.payload.data.entry.baseEntry
      }
      else {
        state.lists.translation = action.payload.data.entry.translation
      }
    }

    return ({
      ...state,
      fetching: false
    })
  },

  [ENTRY_DETAIL_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: { tips: action.payload.response.data.tips }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: {},
  lists: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
