import { injectReducer } from '../../../store/reducers'

export default store => ({
  path: 'index',
  breadcrumbName: '版本对比',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const versions = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'versions', reducer })
      cb(null, versions)
    }, 'versions')
  }
})
