import {connect} from 'react-redux'

import LogIndex from '../components/ImpLog'
import {
  // fetchLanguage,
  fetchVersion,
  fetchImpLog
} from '../modules/Module'
// import {
//   fetchProductsMap
// } from '../../../base/modules/Products'

const mapDispatchToProps = {
  fetchVersion,
  fetchImpLog
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  productsMap: state.productsMap,
  exportsEn: state.exportsEn
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIndex)
