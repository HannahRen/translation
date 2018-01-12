import {connect} from 'react-redux'

import LogIndex from '../components/Log'
import {
  // fetchLanguage,
  fetchVersion,
  fetchLog
} from '../modules/Module'
// import {
//   fetchProductsMap
// } from '../../../base/modules/Products'

const mapDispatchToProps = {
  fetchVersion,
  fetchLog
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  productsMap: state.productsMap,
  imports: state.imports
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIndex)
