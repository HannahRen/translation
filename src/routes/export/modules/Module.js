/* global API_HOST */
import axiosHoolai from '../../../../utils/axios-api'
import openNotificationWithIcon from '../../../base/components/Notification'

// ------------------------------------
// Constants
// ------------------------------------
const EXPORT_LANGUAGE_REQUEST = 'EXPORT_LANGUAGE_REQUEST'
const EXPORT_LANGUAGE_RECEIVE = 'EXPORT_LANGUAGE_RECEIVE'

const EXPORT_VERSION_REQUEST = 'EXPORT_VERSION_REQUEST'
const EXPORT_VERSION_RECEIVE = 'EXPORT_VERSION_RECEIVE'

const EXPORT_GROUP_REQUEST = 'EXPORT_GROUP_REQUEST'
const EXPORT_GROUP_RECEIVE = 'EXPORT_GROUP_RECEIVE'

const EXPORT_ADDRESS_REQUEST = 'EXPORT_ADDRESS_REQUEST'
const EXPORT_ADDRESS_RECEIVE = 'EXPORT_ADDRESS_RECEIVE'

const EXPORT_EXPLOG_REQUEST = 'EXPORT_EXPLOG_REQUEST'
const EXPORT_EXPLOG_RECEIVE = 'EXPORT_EXPLOG_RECEIVE'

const EXPORT_IMPLOG_REQUEST = 'EXPORT_IMPLOG_REQUEST'
const EXPORT_IMPLOG_RECEIVE = 'EXPORT_IMPLOG_RECEIVE'

const EXPORT_ERR = 'EXPORT_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestLanguage() {
  return {
    type: EXPORT_LANGUAGE_REQUEST
  }
}

function receiveLanguage(data) {
  return {
    type: EXPORT_LANGUAGE_RECEIVE,
    payload: data
  }
}

function requestVersion() {
  return {
    type: EXPORT_VERSION_REQUEST
  }
}

function receiveVersion(data) {
  return {
    type: EXPORT_VERSION_RECEIVE,
    payload: data
  }
}

function requestGroup() {
  return {
    type: EXPORT_GROUP_REQUEST
  }
}

function receiveGroup(data) {
  return {
    type: EXPORT_GROUP_RECEIVE,
    payload: data
  }
}

function requestAddress() {
  return {
    type: EXPORT_ADDRESS_REQUEST
  }
}

function receiveAddress(data) {
  const load = window.open(`${API_HOST}/trans/download/${data.data.downloadLink}`)
  return {
    type: EXPORT_ADDRESS_RECEIVE,
    payload: data,
    url: load
  }
}

function requestExpLog() {
  return {
    type: EXPORT_EXPLOG_REQUEST
  }
}

function receiveExpLog(data) {
  return {
    type: EXPORT_EXPLOG_RECEIVE,
    payload: data
  }
}

function requestImpLog() {
  return {
    type: EXPORT_IMPLOG_REQUEST
  }
}

function receiveImpLog(data) {
  return {
    type: EXPORT_IMPLOG_RECEIVE,
    payload: data
  }
}

function requestErr(data) {
  return {
    type: EXPORT_ERR,
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

function fetchGroup(a, b, c) {
  return (dispatch) => {

    dispatch(requestGroup())
    let url = `${API_HOST}/trans/log/import`
    axiosHoolai.get(
      url,
      {
        params: {
          product: a,
          version: b,
          language: c
        },
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveGroup(response))
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

function fetchAddress(value) {
  return (dispatch) => {

    dispatch(requestAddress())
    let url = `${API_HOST}/trans/export/products/${value.products}/version/${value.versions}/language/${value.languages}`
    let params = {}
    if (value.time) {
      params.startDate = value.time
    }
    axiosHoolai.post(
      url,
      {},
      {
        params: params,
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveAddress(response))
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

function fetchExpLog(value) {
  return (dispatch, getState) => {
    if (getState().exportsEn.fetching) {
      return
    }
    dispatch(requestExpLog())
    let url = `${API_HOST}/trans/log/export`
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
      dispatch(receiveExpLog(response))
      openNotificationWithIcon('success', '获取导入日志列表成功!')
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

function fetchImpLog(value) {
  return (dispatch, getState) => {
    if (getState().exportsEn.fetching) {
      return
    }
    dispatch(requestImpLog())
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
      dispatch(receiveImpLog(response))
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
  fetchGroup,
  fetchAddress,
  fetchExpLog,
  fetchImpLog
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EXPORT_LANGUAGE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      language: []
    })
  },
  [EXPORT_LANGUAGE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      language: action.payload.data.configs || []
    })
  },

  [EXPORT_VERSION_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      version: []
    })
  },
  [EXPORT_VERSION_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      version: action.payload.data.list || []
    })
  },

  [EXPORT_GROUP_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      group: []
    })
  },
  [EXPORT_GROUP_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      group: action.payload.data.logs || []
    })
  },

  [EXPORT_ADDRESS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      address: [],
      url: ''
    })
  },
  [EXPORT_ADDRESS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      address: action.payload.data.log || {},
      url: action.url
    })
  },

  [EXPORT_EXPLOG_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      expLog: []
    })
  },
  [EXPORT_EXPLOG_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      expLog: action.payload.data.logs || []
    })
  },

  [EXPORT_IMPLOG_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      impLog: []
    })
  },
  [EXPORT_IMPLOG_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      impLog: action.payload.data.logs || []
    })
  },

  [EXPORT_ERR]: (state, action) => {
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
  group: [],
  address: {},
  url: '',
  expLog: [],
  impLog: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
