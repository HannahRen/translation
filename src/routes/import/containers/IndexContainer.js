import {connect} from 'react-redux'

import Index from './../components/Index'
import {
  fetchLanguage,
  fetchVersion
} from '../modules/Module'
import {
  fetchProductsMap
} from '../../../base/modules/Products'

const mapDispatchToProps = {
  fetchLanguage,
  fetchVersion,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  productsMap: state.productsMap,
  imports: state.imports
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
