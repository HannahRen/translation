import {connect} from 'react-redux'

import Index from './../components/Index'
import {
  fetchRecord,
  fetchCompare
} from '../../index/modules/Module'

const mapDispatchToProps = {
  fetchRecord,
  fetchCompare
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  versions: state.versions
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
