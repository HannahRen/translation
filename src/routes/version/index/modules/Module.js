/* global API_HOST */
import axiosHoolai from '../../../../../utils/axios-api'
import openNotificationWithIcon from '../../../../base/components/Notification'
import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
const VERSION_RECORD_REQUEST = 'VERSION_RECORD_REQUEST'
const VERSION_RECORD_RECEIVE = 'VERSION_RECORD_RECEIVE'

const VERSION_RECORD_REQUEST_2 = 'VERSION_RECORD_REQUEST_2'
const VERSION_RECORD_RECEIVE_2 = 'VERSION_RECORD_RECEIVE_2'
const VERSION_RECORD_CLEAR = 'VERSION_RECORD_CLEAR'

const VERSION_COMPARE_REQUEST = 'VERSION_COMPARE_REQUEST'
const VERSION_COMPARE_RECEIVE = 'VERSION_COMPARE_RECEIVE'

const IMPORT_LANGUAGE_REQUEST = 'IMPORT_LANGUAGE_REQUEST'
const IMPORT_LANGUAGE_RECEIVE = 'IMPORT_LANGUAGE_RECEIVE'

const IMPORT_VERSION_REQUEST = 'IMPORT_VERSION_REQUEST'
const IMPORT_VERSION_RECEIVE = 'IMPORT_VERSION_RECEIVE'

const VERSION_TRANS_ERR = 'VERSION_TRANS_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestRecord() {
  return {
    type: VERSION_RECORD_REQUEST
  }
}

function receiveRecord(data) {
  return {
    type: VERSION_RECORD_RECEIVE,
    payload: data
  }
}

function requestRecord2() {
  return {
    type: VERSION_RECORD_REQUEST_2
  }
}

function receiveRecord2(data) {
  return {
    type: VERSION_RECORD_RECEIVE_2,
    payload: data
  }
}

function clearRecord2() {
  return {
    type: VERSION_RECORD_CLEAR
  }
}

function requestCompare() {
  return {
    type: VERSION_COMPARE_REQUEST
  }
}

function receiveCompare(data) {
  return {
    type: VERSION_COMPARE_RECEIVE,
    payload: data
  }
}

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

function requestErr(data) {
  return {
    type: VERSION_TRANS_ERR,
    payload: data
  }
}

function fetchRecord(value) {
  return (dispatch) => {

    dispatch(requestRecord())
    let url = `${API_HOST}/trans/revison/records`
    let query = {
      product: value.products,
      version: value.versions,
      language: value.languages
    }
    axiosHoolai.get(
      url,
      {
        params: query,
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveRecord(response))
      browserHistory.push('/version/list')
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

function fetchRecord2(value) {
  return (dispatch) => {

    dispatch(requestRecord2())
    let url = `${API_HOST}/trans/revison/records`
    let query = {
      product: value.products,
      version: value.versions,
      language: value.languages
    }
    axiosHoolai.get(
      url,
      {
        params: query,
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveRecord2(response))
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

function fetchCompare(value) {
  return (dispatch) => {

    dispatch(requestCompare())
    let url = `${API_HOST}/trans/revison/compare`
    let query = {
      v1: value.version1,
      v2: value.version2
    }
    axiosHoolai.get(
      url,
      {
        params: query,
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveCompare(response))
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

export {
  fetchLanguage,
  fetchVersion,
  fetchRecord,
  fetchRecord2,
  fetchCompare,
  clearRecord2
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

  [VERSION_RECORD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      lists: []
    })
  },
  [VERSION_RECORD_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      lists: action.payload.data.revisions || []
    })
  },

  [VERSION_RECORD_REQUEST_2]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      lists2: []
    })
  },
  [VERSION_RECORD_RECEIVE_2]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      lists2: action.payload.data.revisions || []
    })
  },
  [VERSION_RECORD_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      lists2: []
    })
  },

  [VERSION_COMPARE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: {},
      compare: []
    })
  },
  [VERSION_COMPARE_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      compare: action.payload.data.list || []
    })
  },

  [VERSION_TRANS_ERR]: (state, action) => {
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
  lists: [],
  lists2: [],
  compare: [],
  language: [],
  version: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
