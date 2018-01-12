import {connect} from 'react-redux'

import Index from './../components/Index'
import {
  fetchRecord,
  fetchRecord2,
  fetchCompare,
  fetchLanguage,
  fetchVersion,
  clearRecord2
} from '../modules/Module'
import {
  fetchProductsMap
} from '../../../../base/modules/Products'

const mapDispatchToProps = {
  fetchRecord,
  fetchRecord2,
  fetchCompare,
  fetchLanguage,
  fetchVersion,
  fetchProductsMap,
  clearRecord2
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  productsMap: state.productsMap,
  versions: state.versions
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
