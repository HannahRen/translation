import { injectReducer } from '../../store/reducers'

export default store => ({
  path: 'import',
  breadcrumbName: '导入词条',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const imports = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'imports', reducer })
      cb(null, imports)
    }, 'import')
  }
})
