/* global API_HOST */
import axiosHoolai from '../../../../utils/axios-api'
import openNotificationWithIcon from '../../../base/components/Notification'

// ------------------------------------
// Constants
// ------------------------------------
const IMPORT_LANGUAGE_REQUEST = 'IMPORT_LANGUAGE_REQUEST'
const IMPORT_LANGUAGE_RECEIVE = 'IMPORT_LANGUAGE_RECEIVE'

const IMPORT_VERSION_REQUEST = 'IMPORT_VERSION_REQUEST'
const IMPORT_VERSION_RECEIVE = 'IMPORT_VERSION_RECEIVE'

const IMPORT_LOG_REQUEST = 'IMPORT_LOG_REQUEST'
const IMPORT_LOG_RECEIVE = 'IMPORT_LOG_RECEIVE'

const IMPORT_ERR = 'IMPORT_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestLanguage() {
  return {
    type: IMPORT_LANGUAGE_REQUEST
  }
}

function receiveLanguage(data) {
  return {
    type: IMPORT_LANGUAGE_RECEIVE,
    payload: data
  }
}


function requestVersion() {
  return {
    type: IMPORT_VERSION_REQUEST
  }
}

function receiveVersion(data) {
  return {
    type: IMPORT_VERSION_RECEIVE,
    payload: data
  }
}


function requestLog() {
  return {
    type: IMPORT_LOG_REQUEST
  }
}

function receiveLog(data) {
  return {
    type: IMPORT_LOG_RECEIVE,
    payload: data
  }
}

function requestErr(data) {
  return {
    type: IMPORT_ERR,
    payload: data
  }
}

function fetchLanguage() {
  return (dispatch) => {

    dispatch(requestLanguage())
    let url = `${API_HOST}/trans/configs`
    axiosHoolai.get(
      url,
      {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveLanguage(response))
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

function fetchVersion(value) {
  return (dispatch) => {

    dispatch(requestVersion())
    let url = `${API_HOST}/trans/version/product/${value}`
    axiosHoolai.get(
      url,
      {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveVersion(response))
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

function fetchLog(value) {
  return (dispatch, getState) => {
    if (getState().imports.fetching) {
      return
    }
    dispatch(requestLog())
    let url = `${API_HOST}/trans/log/import`
    let params = value
    axiosHoolai.get(
      url,
      {
        params: params,
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveLog(response))
      openNotificationWithIcon('success', '导入日志成功!')
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
  fetchLanguage,
  fetchVersion,
  fetchLog
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [IMPORT_LANGUAGE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      language: []
    })
  },
  [IMPORT_LANGUAGE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      language: action.payload.data.configs || []
    })
  },

  [IMPORT_VERSION_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      version: []
    })
  },
  [IMPORT_VERSION_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      version: action.payload.data.list || []
    })
  },

  [IMPORT_LOG_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      log: []
    })
  },
  [IMPORT_LOG_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      log: action.payload.data.logs || []
    })
  },

  [IMPORT_ERR]: (state, action) => {
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
  language: [],
  version: [],
  log: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
