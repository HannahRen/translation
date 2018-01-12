export default store => ({
  path: 'version',
  breadcrumbName: '版本-对比',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./list').default(store)
      ])
    })
  }
})
