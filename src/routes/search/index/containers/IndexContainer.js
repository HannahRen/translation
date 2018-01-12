import { connect } from 'react-redux'

import Index from '../components/Index'
import {
  fetchSearchEntries,
  fetchLanguages
} from '../modules/Module'
import {
  fetchProductsMap
} from '../../../../base/modules/Products'

const mapDispatchToProps = {
  fetchSearchEntries,
  fetchLanguages,
  fetchProductsMap
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  search: state.search,
  productsMap: state.productsMap
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
