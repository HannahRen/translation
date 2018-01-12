import {connect} from 'react-redux'
import {
  fetchRoles,
  createRole,
  deleteRole,
  updateRole,
  fetchMenus,
  updateRoleMenu,
  keepPermission,
  updateLimit
} from '../../permissions/modules/Module'
import Page from '../components/Page'

const mapDispatchToProps = {
  fetchRoles,
  createRole,
  deleteRole,
  updateRole,
  fetchMenus,
  updateRoleMenu,
  keepPermission,
  updateLimit
}

const mapStateToProps = state => ({
  permission: state.permission,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
