import { injectReducer } from '../../store/reducers'


export default store => ({
  path: 'export',
  breadcrumbName: '导出词条',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const imports = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'exportsEn', reducer })
      cb(null, imports)
    }, 'export')
  }
})
