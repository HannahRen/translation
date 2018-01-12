import { injectReducer } from '../../../store/reducers'

export default store => ({
  path: 'entries',
  breadcrumbName: '词条搜索',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const imports = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'search', reducer })
      cb(null, imports)
    }, 'search')
  }
})
