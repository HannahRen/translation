import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'products',
  breadcrumbName: '产品列表',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Index = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'product', reducer })
      cb(null, Index)
    }, 'products')
  }
})
