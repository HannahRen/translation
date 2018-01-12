/* global API_HOST */
import _ from 'lodash'
import AxiosAPI from '../../../../utils/axios-api'
import openNotificationWithIcon from '../../../base/components/Notification'

// ------------------------------------
// Constants
// ------------------------------------
const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST'
const PRODUCTS_REQUEST_ERR = 'PRODUCTS_REQUEST_ERR'
const PRODUCTS_RECEIVE = 'PRODUCTS_RECEIVE'
const PRODUCTS_CLEAR = 'PRODUCTS_CLEAR'

const PRODUCT_ADD_REQUEST = 'PRODUCT_ADD_REQUEST'
const PRODUCT_ADD_REQUEST_ERR = 'PRODUCT_ADD_REQUEST_ERR'
const PRODUCT_ADD_RECEIVE = 'PRODUCT_ADD_RECEIVE'

const PRODUCT_MOD_REQUEST = 'PRODUCT_MOD_REQUEST'
const PRODUCT_MOD_REQUEST_ERR = 'PRODUCT_MOD_REQUEST_ERR'
const PRODUCT_MOD_RECEIVE = 'PRODUCT_MOD_RECEIVE'

const PRODUCT_KEEPING = 'PRODUCT_KEEPING'

// ------------------------------------
// Actions
// ------------------------------------

function requestProducts() {
  return {
    type: PRODUCTS_REQUEST
  }
}

function requestProductsErr(data) {
  return {
    type: PRODUCTS_REQUEST_ERR,
    payload: data
  }
}

function receiveProducts(data) {
  return {
    type: PRODUCTS_RECEIVE,
    payload: data
  }
}

function clearProducts() {
  return {
    type: PRODUCTS_CLEAR
  }
}

function requestProductAdd() {
  return {
    type: PRODUCT_ADD_REQUEST
  }
}

function requestProductAddErr(data) {
  return {
    type: PRODUCT_ADD_REQUEST_ERR,
    payload: data
  }
}

function receiveProductAdd(data) {
  return {
    type: PRODUCT_ADD_RECEIVE,
    payload: data
  }
}

function requestProductMod() {
  return {
    type: PRODUCT_MOD_REQUEST
  }
}

function requestProductModErr(data) {
  return {
    type: PRODUCT_MOD_REQUEST_ERR,
    payload: data
  }
}

function receiveProductMod(data) {
  return {
    type: PRODUCT_MOD_RECEIVE,
    payload: data
  }
}

function keepProduct(data) {
  return {
    type: PRODUCT_KEEPING,
    payload: data
  }
}

function fetchProducts() {
  return (dispatch) => {

    dispatch(requestProducts())
    let url = `${API_HOST}/trans/products`
    AxiosAPI.get(
      url, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveProducts(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestProductsErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createProduct(data) {
  return (dispatch) => {

    dispatch(requestProductAdd())
    let url = `${API_HOST}/trans/products`
    AxiosAPI.post(
      url, data.form, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveProductAdd(response))
      openNotificationWithIcon('success', '添加产品操作完成！')
      dispatch(fetchProducts())
    }).catch(error => {
      if (error.response) {
        dispatch(requestProductAddErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateProduct(data) {
  return (dispatch) => {

    dispatch(requestProductMod())
    let url = `${API_HOST}/trans/products`
    AxiosAPI.put(
      url, data.form, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveProductMod(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestProductModErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchProducts,
  clearProducts,
  createProduct,
  updateProduct,
  keepProduct
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PRODUCTS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      products: []
    })
  },
  [PRODUCTS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [PRODUCTS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      products: action.payload.data.domainObject || []
    })
  },
  [PRODUCTS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      products: []
    })
  },
  [PRODUCT_ADD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      productAdd: []
    })
  },
  [PRODUCT_ADD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [PRODUCT_ADD_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      productAdd: action.payload.data.domainObject || []
    })
  },
  [PRODUCT_MOD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      productMod: {}
    })
  },
  [PRODUCT_MOD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [PRODUCT_MOD_RECEIVE]: (state, action) => {
    const products = [...state.products]
    const product = action.payload.data
    _.map(products, (val, index) => {
      if (product.id && val.id === product.id) {
        Object.assign(val, product)
      }
    })
    return ({
      ...state,
      fetching: false,
      products: [...products],
      productMod: product
    })
  },
  [PRODUCT_KEEPING]: (state, action) => {
    return ({
      ...state,
      keeping: {
        ...state.keeping,
        ...action.payload
      }
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
  products: [],
  productAdd: {},
  productMod: {},
  keeping: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
