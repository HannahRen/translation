/* global API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../components/Notification'

// ------------------------------------
// Constants
// ------------------------------------

const SERVER_MAP_PRODUCT_REQUEST = 'SERVER_MAP_PRODUCT_REQUEST'
const SERVER_MAP_PRODUCT_RECEIVE = 'SERVER_MAP_PRODUCT_RECEIVE'

// ------------------------------------
// Actions
// ------------------------------------

function requestProductsMap() {
  return {
    type: SERVER_MAP_PRODUCT_REQUEST
  }
}

function receiveProductsMap(data) {
  return {
    type: SERVER_MAP_PRODUCT_RECEIVE,
    payload: data
  }
}

function fetchProductsMap() {
  return (dispatch, getState) => {
    dispatch(requestProductsMap())
    let url = `${API_HOST}/trans/products`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
      }
    }).then(response => {
      dispatch(receiveProductsMap(response))
    }).catch(error => {
      if (error.response) {
        // dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchProductsMap
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SERVER_MAP_PRODUCT_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [SERVER_MAP_PRODUCT_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      options: action.payload.data.domainObject
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  options: []
}

export default function productsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
