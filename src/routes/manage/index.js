import { browserHistory } from 'react-router'
import { injectReducer } from '../../store/reducers'
import { default as loginReducer } from './../../base/modules/Login'
import SysLayout from './../../base/components/SysLayout.jsx'
import user from './user'

export default store => ({
  path: 'manage',
  breadcrumbName: '系统管理',
  getComponent(nextState, cb) {
    const rootMenu = JSON.parse(sessionStorage.getItem('rootMenu'))

    if (rootMenu.includes(10000) || rootMenu.includes(20000)) {
      injectReducer(store, {
        key: 'islogin',
        reducer: loginReducer
      })
      cb(null, SysLayout)
    } else {
      browserHistory.push('/')
    }
  },
  childRoutes: [
    user(store)
  ]
})
