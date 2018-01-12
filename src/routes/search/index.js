export default (store) => ({
  path: 'search/:searchId',
  breadcrumbName: '词条搜索页',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/Index').default(store),
        require('./detail').default(store)
      ])
    })
  }
})
