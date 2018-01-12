import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, IndexLink, Link } from 'react-router'
import _ from 'lodash'
import {connect} from 'react-redux'
import {isLoginActionCreator, fetchPurview, onceLogin, receiveLogin, singOut} from '../modules/Login'

import './SysLayout.less'

import {
  Layout,
  Menu,
  Breadcrumb,
  BackTop,
  message
} from 'antd'
const { SubMenu } = Menu
const { Content, Sider } = Layout

const mapDispatchToProps = {
  isLoginActionCreator,
  fetchPurview,
  receiveLogin,
  onceLogin,
  singOut
}

const mapStateToProps = (state) => ({
  login: state.islogin
})

@connect(mapStateToProps, mapDispatchToProps)
export default class SysLayout extends Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    isLoginActionCreator: PropTypes.func.isRequired,
    fetchPurview: PropTypes.func.isRequired,
    onceLogin: PropTypes.func.isRequired,
    receiveLogin: PropTypes.func.isRequired,
    singOut: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      rander: true
    }
    // this.handleSingOut = this.handleSingOut.bind(this)
  }

  menu = (
    <Menu onClick={key => this.handleSingOut(key)}>
      <Menu.Item key='3'>退出</Menu.Item>
      <Menu.Item key='0'>修改密码</Menu.Item>
    </Menu>
  )

  static myData = {}

  handleSingOut = ({ key }) => {
    if (key === '3') {
      browserHistory.push('/')
      this.props.singOut()
      this.showModal()
    }
    if (key === '0') {
      browserHistory.push('/pwdchange')
    }
  }

  itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1
    if (last) {
      return <span>{route.breadcrumbName}</span>
    } else {
      return paths.join('/') == '' ? (
        <IndexLink to='/'>主页</IndexLink>
      ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
      )
    }
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  handleSubmit = data => {
    this.props.isLoginActionCreator(data)
  }

  componentDidMount() {
    const { fetchPurview, receiveLogin } = this.props
    const hoolai = sessionStorage.getItem('hoolai')
    // 如果sessionStorage有值，就直接登录
    if (hoolai !== null && hoolai !== '') {
      receiveLogin(JSON.parse(hoolai))
      fetchPurview(JSON.parse(hoolai))
    } else {
      this.showModal()
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { onceLogin } = this.props

    if (nextProps.login.resolved && nextProps.login.once) {
      message.success('登录成功')
      onceLogin()
      this.handleCancel()
    } else if (nextProps.login.err) {
      message.error(nextProps.login.errMes)
    } else if (!nextProps.login.resolved) {
      this.showModal()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.login.once) {
      return true
    }

    if (nextProps.login.errMes.tips) {
      return false
    }

    if (nextProps.login.fetching) {
      // message.info('shouldComponentUpdate 不rander', 10)
      return false
    } else {
      // message.info('shouldComponentUpdate 就rander', 10)
      return true
    }
  }

  render() {
    // 此时的routes 不是传进来的了 注意是router index.js里分配来的
    const props = this.props
    let myMenus = []
    const { admin, purview } = this.props.login
    if (_.size(admin) > 0) {
      _.forEach(purview, function(value, key) {
        if (value.id === 10000) {
          let subMenus = []
          _.map(value.subMenu, function(v, i) {
            subMenus.push(
              <Menu.Item key={v.id}>
                {' '}
                <Link to={{ pathname: v.route, state: { authorize: v.id } }}>
                  {v.name}
                </Link>{' '}
              </Menu.Item>
            )
          })
          myMenus.push(
            <SubMenu title={value.name} children={subMenus} key={value.id} />
          )
        }
      })
    }

    return (
      <div className='components-layout-demo-top-side-2'>

        <Layout>

          <Layout
            style={{
              padding: '64px 24px 24px',
              minHeight: '100vh',
              marginTop: '-62px',
              marginLeft: '-44px'
            }}
          >
            <Sider
              width={200}
              style={{
                background: '#fff'
              }}
            >
              <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                  height: '100%'
                }}
              >
                {myMenus}
              </Menu>
            </Sider>

            <Content
              style={{
                margin: 0,
                minHeight: 280
              }}
            >
              <Breadcrumb
                itemRender={this.itemRender}
                style={{
                  margin: '12px 0'
                }}
                routes={props.routes}
                params={props.params}
                separator='/'
              />
              {props.children}
            </Content>
          </Layout>
        </Layout>

        <BackTop />
      </div>
    )
  }
}
