import 'ant-design-pro/dist/ant-design-pro.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import BaseLayout from '../base/components/BaseLayout.jsx'
import IndexContainer from './index/containers/IndexContainer'
import { injectReducer } from '../store/reducers'
import { default as loginReducer } from './../base/modules/Login'
import { default as productsReducer } from './../base/modules/Products'
import manage from './manage'
import product from './product'
import search from './search'
import entry from './entry'
import imports from './import'
import exportsEn from './export'
import PageNotFound from './pagenotfound'
import pwdChange from './pwdchange'
import version from './version'
import Redirect from './pagenotfound/redirect'


export const createRoutes = store => ({
  path: '/',
  breadcrumbName: 'Home',
  getComponent(nextState, cb) {
    injectReducer(store, {
      key: 'islogin',
      reducer: loginReducer
    })
    injectReducer(store, {
      key: 'productsMap',
      reducer: productsReducer
    })

    cb(null, BaseLayout)
  },
  getIndexRoute(location, cb) {
    cb(null, {component: IndexContainer})
  },
  childRoutes: [
    manage(store),
    product(store),
    search(store),
    entry(store),
    PageNotFound(),
    pwdChange(store),
    imports(store),
    exportsEn(store),
    version(store),
    Redirect
  ]
})

export default createRoutes
