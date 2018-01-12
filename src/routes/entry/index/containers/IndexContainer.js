import { connect } from 'react-redux'

import {
  entryDelete,
  fetchEntries,
  queryEntry,
  fetchVersions,
  createVersion,
  fetchLanguages,
  refreshEdit
} from '../modules/Module'
import Index from '../components/Index'

const mapDispatchToProps = {
  entryDelete,
  fetchEntries,
  queryEntry,
  fetchVersions,
  createVersion,
  fetchLanguages,
  refreshEdit
}

const mapStateToProps = (state) => ({
  entry: state.entry,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
