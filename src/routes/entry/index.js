export default (store) => ({
  path: 'products/:productId',
  breadcrumbName: '词条列表页',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./index/index').default(store),
        require('./detail').default(store)
      ])
    })
  }
})
