import {connect} from 'react-redux'

import Index from '../components/Index'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({login: state.islogin})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
