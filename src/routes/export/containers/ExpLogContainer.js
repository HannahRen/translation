import {connect} from 'react-redux'

import LogIndex from '../components/ExpLog'
import {
  fetchVersion,
  fetchExpLog
} from '../modules/Module'


const mapDispatchToProps = {
  fetchVersion,
  fetchExpLog
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  productsMap: state.productsMap,
  exportsEn: state.exportsEn
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIndex)
