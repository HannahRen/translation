import { connect } from 'react-redux'

import Index from '../components/Index'
import {
  fetchDetail,
  fetchEdit
} from '../modules/Module'

const mapDispatchToProps = {
  fetchDetail,
  fetchEdit
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  detail: state.detail
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
