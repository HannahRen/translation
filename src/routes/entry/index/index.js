import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'entries',
  breadcrumbName: '词条列表',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Index = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'entry', reducer })
      cb(null, Index)
    }, 'entries')
  }
})
