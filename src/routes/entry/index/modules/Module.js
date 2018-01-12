/* global API_HOST */
import _ from 'lodash'
import AxiosAPI from '../../../../../utils/axios-api'
import openNotificationWithIcon from '../../../../base/components/Notification'

// ------------------------------------
// Constants
// ------------------------------------
const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
const CATEGORIES_REQUEST_ERR = 'CATEGORIES_REQUEST_ERR'
const CATEGORIES_RECEIVE = 'CATEGORIES_RECEIVE'
const CATEGORIES_CLEAR = 'CATEGORIES_CLEAR'

const CATEGORY_ADD_REQUEST = 'CATEGORY_ADD_REQUEST'
const CATEGORY_ADD_REQUEST_ERR = 'CATEGORY_ADD_REQUEST_ERR'
const CATEGORY_ADD_RECEIVE = 'CATEGORY_ADD_RECEIVE'

const CATEGORY_MOD_REQUEST = 'CATEGORY_MOD_REQUEST'
const CATEGORY_MOD_REQUEST_ERR = 'CATEGORY_MOD_REQUEST_ERR'
const CATEGORY_MOD_RECEIVE = 'CATEGORY_MOD_RECEIVE'

const CATEGORY_DEL_REQUEST = 'CATEGORY_DEL_REQUEST'
const CATEGORY_DEL_REQUEST_ERR = 'CATEGORY_DEL_REQUEST_ERR'
const CATEGORY_DEL_RECEIVE = 'CATEGORY_DEL_RECEIVE'

const ENTRIES_REQUEST = 'ENTRIES_REQUEST'
const ENTRIES_REQUEST_ERR = 'ENTRIES_REQUEST_ERR'
const ENTRIES_RECEIVE = 'ENTRIES_RECEIVE'
const ENTRIES_CLEAR = 'ENTRIES_CLEAR'

const ENTRY_QUERY_REQUEST = 'ENTRY_QUERY_REQUEST'
const ENTRY_QUERY_REQUEST_ERR = 'ENTRY_QUERY_REQUEST_ERR'
const ENTRY_QUERY_RECEIVE = 'ENTRY_QUERY_RECEIVE'

const VERSIONS_REQUEST = 'VERSIONS_REQUEST'
const VERSIONS_REQUEST_ERR = 'VERSIONS_REQUEST_ERR'
const VERSIONS_RECEIVE = 'VERSIONS_RECEIVE'
const VERSIONS_CLEAR = 'VERSIONS_CLEAR'

const VERSION_ADD_REQUEST = 'VERSION_ADD_REQUEST'
const VERSION_ADD_REQUEST_ERR = 'VERSION_ADD_REQUEST_ERR'
const VERSION_ADD_RECEIVE = 'VERSION_ADD_RECEIVE'

const VERSION_TPL_REQUEST = 'VERSION_TPL_REQUEST'
const VERSION_TPL_REQUEST_ERR = 'VERSION_TPL_REQUEST_ERR'
const VERSION_TPL_RECEIVE = 'VERSION_TPL_RECEIVE'

const LANGUAGES_REQUEST = 'LANGUAGES_REQUEST'
const LANGUAGES_REQUEST_ERR = 'LANGUAGES_REQUEST_ERR'
const LANGUAGES_RECEIVE = 'LANGUAGES_RECEIVE'
const LANGUAGES_CLEAR = 'LANGUAGES_CLEAR'

const ENTRIES_EDIT_RECEIVE = 'ENTRIES_EDIT_RECEIVE'

const ENTRY_KEEPING = 'ENTRY_KEEPING'

const LANGUAGE_ID_STORE = 'LANGUAGE_ID_STORE'
const ENTRY_DELETE_RECEIVE = 'ENTRY_DELETE_RECEIVE'
const ENTRY_DELETE_ERR = 'ENTRY_DELETE_ERR'

// ------------------------------------
// Actions
// ------------------------------------
function entriesDelete(data) {
  return {
    type: ENTRY_DELETE_RECEIVE,
    payload: data
  }
}

function entryDeleteErr(date) {
  return {
    type: ENTRY_DELETE_ERR
  }
}

function languageStore(data) {
  return {
    type: LANGUAGE_ID_STORE,
    payload: data
  }
}

function requestCategories() {
  return {
    type: CATEGORIES_REQUEST
  }
}


function requestCategoriesErr(data) {
  return {
    type: CATEGORIES_REQUEST_ERR,
    payload: data
  }
}

function receiveCategories(data) {
  return {
    type: CATEGORIES_RECEIVE,
    payload: data
  }
}

function clearCategories() {
  return {
    type: CATEGORIES_CLEAR
  }
}

function requestCategoryAdd() {
  return {
    type: CATEGORY_ADD_REQUEST
  }
}

function requestCategoryAddErr(data) {
  return {
    type: CATEGORY_ADD_REQUEST_ERR,
    payload: data
  }
}

function receiveCategoryAdd(data) {
  return {
    type: CATEGORY_ADD_RECEIVE,
    payload: data
  }
}

function requestCategoryMod() {
  return {
    type: CATEGORY_MOD_REQUEST
  }
}

function requestCategoryModErr(data) {
  return {
    type: CATEGORY_MOD_REQUEST_ERR,
    payload: data
  }
}

function receiveCategoryMod(data) {
  return {
    type: CATEGORY_MOD_RECEIVE,
    payload: data
  }
}

function requestCategoryDel() {
  return {
    type: CATEGORY_DEL_REQUEST
  }
}

function requestCategoryDelErr(data) {
  return {
    type: CATEGORY_DEL_REQUEST_ERR,
    payload: data
  }
}

function receiveCategoryDel(data) {
  return {
    type: CATEGORY_DEL_RECEIVE,
    payload: data
  }
}

function requestEntries() {
  return {
    type: ENTRIES_REQUEST
  }
}

function requestEntriesErr(data) {
  return {
    type: ENTRIES_REQUEST_ERR,
    payload: data
  }
}

function receiveEntries(data) {
  return {
    type: ENTRIES_RECEIVE,
    payload: data
  }
}

function clearEntries() {
  return {
    type: ENTRIES_CLEAR
  }
}

function requestEntryQuery() {
  return {
    type: ENTRY_QUERY_REQUEST
  }
}

function requestEntryQueryErr(data) {
  return {
    type: ENTRY_QUERY_REQUEST_ERR,
    payload: data
  }
}

function receiveEntryQuery(data) {
  return {
    type: ENTRY_QUERY_RECEIVE,
    payload: data
  }
}

function requestVersions() {
  return {
    type: VERSIONS_REQUEST
  }
}

function requestVersionsErr(data) {
  return {
    type: VERSIONS_REQUEST_ERR,
    payload: data
  }
}

function receiveVersions(data) {
  return {
    type: VERSIONS_RECEIVE,
    payload: data
  }
}

function clearVersions() {
  return {
    type: VERSIONS_CLEAR
  }
}

function requestVersionAdd() {
  return {
    type: VERSION_ADD_REQUEST
  }
}

function requestVersionAddErr(data) {
  return {
    type: VERSION_ADD_REQUEST_ERR,
    payload: data
  }
}

function receiveVersionAdd(data) {
  return {
    type: VERSION_ADD_RECEIVE,
    payload: data
  }
}

function requestVersionTpl() {
  return {
    type: VERSION_TPL_REQUEST
  }
}

function requestVersionTplErr(data) {
  return {
    type: VERSION_TPL_REQUEST_ERR,
    payload: data
  }
}

function receiveVersionTpl(data) {
  return {
    type: VERSION_TPL_RECEIVE,
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

function clearLanguages() {
  return {
    type: LANGUAGES_CLEAR
  }
}

function keepEntry(data) {
  return {
    type: ENTRY_KEEPING,
    payload: data
  }
}

function refreshEditReceive(data) {
  return {
    type: ENTRIES_EDIT_RECEIVE,
    payload: data
  }
}

function refreshEdit(data) {
  return (dispatch) => {
    dispatch(refreshEditReceive(data))
  }
}

function fetchCategories(data) {
  return (dispatch) => {

    dispatch(requestCategories())
    let url = `${API_HOST}/trans/category/product/${data.path.productId}`
    AxiosAPI.get(
      url, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveCategories(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCategoriesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createCategory(data) {
  return (dispatch) => {

    dispatch(requestCategoryAdd())
    let url = `${API_HOST}/trans/category/product/${data.path.productId}`
    AxiosAPI.post(
      url, data.form, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveCategoryAdd(response))
      openNotificationWithIcon('success', '添加词条分类完成！')
      dispatch(fetchCategories(data))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCategoryAddErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function entryDelete(data, st) {
  return (dispatch) => {

    // dispatch(entriesDelete())
    let url = `${API_HOST}/trans/${data.id}`
    AxiosAPI.delete(
      url, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(entriesDelete(data))
      openNotificationWithIcon('success', '删除成功！')
      // dispatch(fetchEntries(data))
    }).catch(error => {
      if (error.response) {
        dispatch(entryDeleteErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateCategory(data) {
  return (dispatch) => {

    dispatch(requestCategoryMod())
    let url = `${API_HOST}/trans/category/product/${data.path.productId}/key/${data.path.keyNum}`
    AxiosAPI.put(
      url, data.form, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveCategoryMod(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCategoryModErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function deleteCategory(data) {
  return (dispatch) => {

    dispatch(requestCategoryDel())
    let url = `${API_HOST}/trans/category/product/${data.path.productId}/key/${data.path.keyNum}`
    AxiosAPI.delete(
      url, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveCategoryDel(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestCategoryDelErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchEntries(data) {
  return (dispatch) => {

    dispatch(requestEntries())
    let url = `${API_HOST}/trans/search/product/${data.path.productId}`
    AxiosAPI.get(
      url, {
        params: {
          ...data.params
        },
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveEntries(response))
      dispatch(languageStore(data.language))
    }).catch(error => {
      if (error.response) {
        dispatch(requestEntriesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function queryEntry(data) {
  return (dispatch) => {

    dispatch(requestEntryQuery())
    let url = `${API_HOST}/trans/label/product/${data.path.productId}/query`
    AxiosAPI.get(
      url, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveEntryQuery(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestEntryQueryErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchVersions(data) {
  return (dispatch) => {

    dispatch(requestVersions())
    let url = `${API_HOST}/trans/version/product/${data.path.productId}`
    AxiosAPI.get(
      url, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveVersions(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestVersionsErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createVersion(data) {
  return (dispatch) => {

    dispatch(requestVersionAdd())
    let url = `${API_HOST}/trans/version/product/${data.path.productId}`
    AxiosAPI.post(
      url, data.form, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveVersionAdd(response))
      openNotificationWithIcon('success', '添加版本操作完成！')
      dispatch(fetchVersions(data))
    }).catch(error => {
      if (error.response) {
        dispatch(requestVersionAddErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function copyVersion(data) {
  return (dispatch) => {

    dispatch(requestVersionTpl())
    let url = `${API_HOST}/trans/version/product/${data.path.productId}`
    AxiosAPI.put(
      url, data.form, {
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      dispatch(receiveVersionTpl(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestVersionTplErr(error.response.data))
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
  entryDelete,
  fetchCategories,
  clearCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchEntries,
  clearEntries,
  queryEntry,
  fetchVersions,
  clearVersions,
  createVersion,
  copyVersion,
  fetchLanguages,
  clearLanguages,
  keepEntry,
  refreshEdit
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LANGUAGE_ID_STORE]: (state, action) => {
    return ({
      ...state,
      lanId: action.payload
    })
  },
  [CATEGORIES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      categories: []
    })
  },
  [CATEGORIES_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [CATEGORIES_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      categories: action.payload.data.list || []
    })
  },
  [CATEGORIES_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      categories: []
    })
  },
  [CATEGORY_ADD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      categoryAdd: []
    })
  },
  [CATEGORY_ADD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [CATEGORY_ADD_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      categoryAdd: action.payload.data.domainObject || []
    })
  },
  [CATEGORY_MOD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      categoryMod: {}
    })
  },
  [CATEGORY_MOD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [CATEGORY_MOD_RECEIVE]: (state, action) => {
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
      categoryMod: product
    })
  },
  [CATEGORY_DEL_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      categoryDel: {}
    })
  },
  [CATEGORY_DEL_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [CATEGORY_DEL_RECEIVE]: (state, action) => {
    const versions = [...state.versions]
    const version = action.payload.data.list
    return ({
      ...state,
      fetching: false,
      versions: [...versions],
      categoryDel: version
    })
  },
  [ENTRIES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      entries: []
    })
  },
  [ENTRIES_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [ENTRIES_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      entries: action.payload.data.list || []
    })
  },
  [ENTRIES_EDIT_RECEIVE]: (state, action) => {
    _.map(state.entries, (v, i) => {
      if (v.key === action.payload.entry.key) {
        state.entries[i] = action.payload.entry
      }
    })
    return ({
      ...state,
      fetching: false
    })
  },
  [ENTRIES_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      entries: []
    })
  },
  [ENTRY_QUERY_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      entryOne: {}
    })
  },
  [ENTRY_QUERY_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ENTRY_QUERY_RECEIVE]: (state, action) => {
    const versions = state.versions
    const version = action.payload.data.list
    return ({
      ...state,
      fetching: false,
      versions: [...versions, version],
      entryOne: version
    })
  },
  [VERSIONS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      versions: []
    })
  },
  [VERSIONS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [VERSIONS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      versions: action.payload.data.list || []
    })
  },
  [VERSIONS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      versions: []
    })
  },
  [VERSION_ADD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      versionAdd: []
    })
  },
  [VERSION_ADD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [VERSION_ADD_RECEIVE]: (state, action) => {
    const versions = state.versions
    const version = action.payload.data.list
    return ({
      ...state,
      fetching: false,
      versions: [...versions, ...version],
      versionAdd: version
    })
  },
  [VERSION_TPL_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      versionTpl: {}
    })
  },
  [VERSION_TPL_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [VERSION_TPL_RECEIVE]: (state, action) => {
    const versions = [...state.versions]
    const version = action.payload.data.list
    return ({
      ...state,
      fetching: false,
      versions: [...versions],
      versionTpl: version
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
  },
  [LANGUAGES_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      languages: []
    })
  },
  [ENTRY_KEEPING]: (state, action) => {
    return ({
      ...state,
      keeping: {
        ...state.keeping,
        ...action.payload
      }
    })
  },
  [ENTRY_DELETE_RECEIVE]: (state, action) => {
    _.map(state.entries, (v, i) => {
       if (v.key === action.payload.key) {
         let list = state.entries.slice(0)
         list.splice(i, 1)
         state.entries = list
       }
     })
    return ({
      ...state,
      fetching: true
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
  categories: [],
  categoryAdd: {},
  categoryMod: {},
  categoryDel: {},
  entries: [],
  entryOne: {},
  versions: [],
  versionAdd: [],
  versionTpl: {},
  languages: [],
  keeping: {},
  lanId: 1
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
