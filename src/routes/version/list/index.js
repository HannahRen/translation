import { injectReducer } from '../../../store/reducers'

export default store => ({
  path: 'list',
  breadcrumbName: '版本对比列表',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const versions = require('./components/Page').default
      const reducer = require('../index/modules/Module').default
      injectReducer(store, { key: 'versions', reducer })
      cb(null, versions)
    }, 'versions')
  }
})
