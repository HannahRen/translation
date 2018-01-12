import { connect } from 'react-redux'

import {
  fetchProducts,
  createProduct,
  updateProduct,
  clearProducts
} from '../modules/Module'
import Index from './../components/Index'

const mapDispatchToProps = {
  fetchProducts,
  createProduct,
  updateProduct,
  clearProducts
}

const mapStateToProps = (state) => ({
  product: state.product,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
