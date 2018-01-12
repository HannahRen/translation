import {connect} from 'react-redux'

import Index from './../components/Index'
import {
  fetchLanguage,
  fetchVersion,
  fetchAddress
} from '../modules/Module'
import {
  fetchProductsMap
} from '../../../base/modules/Products'

const mapDispatchToProps = {
  fetchLanguage,
  fetchVersion,
  fetchAddress,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  exportsEn: state.exportsEn,
  productsMap: state.productsMap
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
