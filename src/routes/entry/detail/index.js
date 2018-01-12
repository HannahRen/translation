import { injectReducer } from '../../../store/reducers'

export default store => ({
  path: 'detail/:id',
  breadcrumbName: '词条详情',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const imports = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'detail', reducer })
      cb(null, imports)
    }, 'import')
  }
})
