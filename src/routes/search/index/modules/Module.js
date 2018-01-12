/* global API_HOST */
//  _ from 'lodash'
import AxiosAPI from '../../../../../utils/axios-api'
import openNotificationWithIcon from '../../../../base/components/Notification'

// ------------------------------------
// Constants
// ------------------------------------
const SEARCH_ENTRY_REQUEST = 'SEARCH_ENTRY_REQUEST'
const SEARCH_ENTRY_RECEIVE = 'SEARCH_ENTRY_RECEIVE'
const SEARCH_ENTRY_REQUEST_ERR = 'SEARCH_ENTRY_REQUEST_ERR'

const LANGUAGES_REQUEST = 'LANGUAGES_REQUEST'
const LANGUAGES_REQUEST_ERR = 'LANGUAGES_REQUEST_ERR'
const LANGUAGES_RECEIVE = 'LANGUAGES_RECEIVE'

function requestSearchEntries() {
  return {
    type: SEARCH_ENTRY_REQUEST
  }
}

function receiveSearchEntries(data) {
  return {
    type: SEARCH_ENTRY_RECEIVE,
    payload: data
  }
}

function requestSearchEntriesErr(data) {
  return {
    type: SEARCH_ENTRY_REQUEST_ERR,
    payload: data
  }
}
function requestLanguages() {
  return {
    type: LANGUAGES_REQUEST
  }
}

function requestLanguagesErr(data) {
  return {
    type: LANGUAGES_REQUEST_ERR,
    payload: data
  }
}

function receiveLanguages(data) {
  return {
    type: LANGUAGES_RECEIVE,
    payload: data
  }
}

function fetchSearchEntries(value) {
  return (dispatch) => {

    dispatch(requestSearchEntries())
    let url = `${API_HOST}/trans/search/product/solr/`
    AxiosAPI.get(
      url,
      {
        params: {
          entry: value.entry
        }
      },
      {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveSearchEntries(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestSearchEntriesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchLanguages() {
  return (dispatch) => {

    dispatch(requestLanguages())
    let url = `${API_HOST}/trans/configs`
    AxiosAPI.get(
      url, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveLanguages(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestLanguagesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchSearchEntries,
  fetchLanguages
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEARCH_ENTRY_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      searchEntries: []
    })
  },
  [SEARCH_ENTRY_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [SEARCH_ENTRY_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      searchEntries: action.payload.data.list || []
    })
  },
  [LANGUAGES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      languages: []
    })
  },
  [LANGUAGES_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [LANGUAGES_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      languages: action.payload.data.configs || []
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: false,
  errMes: {},
  searchEntries: [],
  languages: []
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
