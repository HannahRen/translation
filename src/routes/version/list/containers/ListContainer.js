import {connect} from 'react-redux'

import List from './../components/List'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  login: state.islogin,
  versions: state.versions
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
