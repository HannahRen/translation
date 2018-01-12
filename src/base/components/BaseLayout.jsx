import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, IndexLink, Link } from 'react-router'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {
  isLoginActionCreator,
  fetchPurview,
  onceLogin,
  receiveLogin,
  singOut
} from './../modules/Login'
import './BaseLayout.less'
import logoImage from '../../static/hoolai.png'
import myImage from '../../static/admin.png'

import WrappedHorizontalLoginForm from './Login'

import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Modal,
  Row,
  Col,
  BackTop,
  message
} from 'antd'
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter'

const { SubMenu } = Menu
const { Header, Content, Footer } = Layout

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
export default class BaseLayout extends Component {
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
  }

  menu = (
    <Menu onClick={key => this.handleSingOut(key)}>
      <Menu.Item key='3'><Icon type='logout' />&nbsp;&nbsp;&nbsp;退出</Menu.Item>
      <Menu.Divider />
      <Menu.Item key='0'><Icon type='setting' />&nbsp;&nbsp;&nbsp;修改密码</Menu.Item>
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

  handleCancel = () => {
    this.setState({ visible: false })
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  handleSubmit = data => {
    this.props.isLoginActionCreator(data)
  }

  clickIndex = () => {
    // document.getElementByClassName('ant-menu-item-selected').className = 'ant-menu-item'
    // console.log(ReactDOM.findDOMNode(this.refs.header_menu_list).childNodes)
    let domLists = ReactDOM.findDOMNode(this.refs.header_menu_list).childNodes
    _.map(domLists, (v, i) => {
      if (v.className !== 'ant-menu-item') {
        v.className = 'ant-menu-item'
      }
    })
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
    const { admin, purview, authorize } = this.props.login
    if (_.size(admin) > 0) {
      _.forEach(purview, function(value, key) {
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
      })
    }

    const copyright = <div>Copyright <Icon type='copyright' /> 2017 互爱科技出品</div>

    return (
      <div className='components-layout-demo-top-side-2'>
        <Modal
          width={300}
          key={Math.random()}
          title='登录'
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
          closable={false}
          maskClosable={false}
        >
          <WrappedHorizontalLoginForm handleSubmit={this.handleSubmit} />
        </Modal>
        <Layout>
          <Header className='header'>
            <Row>
              <Col className='gutter-row' span={8} xl={{ span: 7 }}>
                <div className='logo'>
                  <IndexLink to='/' activeClassName='route--active' activeStyle={{lineHeight: '50px'}} onClick={this.clickIndex}>
                    <img className='logo-img' src={logoImage} />
                  </IndexLink>
                </div>
              </Col>
              <Col className='gutter-row' span={11} xl={{ span: 14 }}>
                <Menu
                  ref='header_menu_list'
                  theme='dark'
                  mode='horizontal'
                  defaultSelectedKeys={['2']}
                  style={{
                    lineHeight: '64px'
                  }}
                >
                  <Menu.Item key='import' ref='header_menu_list_1'>
                    <IndexLink to='/import' activeClassName='route--active'>
                      <Icon type='upload' />导入
                    </IndexLink>
                  </Menu.Item>
                  <Menu.Item key='export'>
                    <IndexLink to='/export' activeClassName='route--active'>
                      <Icon type='download' />导出
                    </IndexLink>
                  </Menu.Item>
                  <Menu.Item key='product'>
                    <IndexLink to='/products' activeClassName='route--active'>
                      <Icon type='bars' />产品列表
                    </IndexLink>
                  </Menu.Item>
                  <Menu.Item key='version'>
                    <IndexLink to='/version/index' activeClassName='route--active'>
                      <Icon type='down' />版本对比
                    </IndexLink>
                  </Menu.Item>
                  {
                    (authorize.includes(10000) || authorize.includes(20000)) &&
                    <Menu.Item key='manage'>
                      <IndexLink to='/manage' activeClassName='route--active'>
                        <Icon type='setting' />系统管理
                      </IndexLink>
                    </Menu.Item>
                  }
                </Menu>
              </Col>
              <Col className='gutter-row header_user' span={3}>
                <Dropdown overlay={this.menu}>
                  <div className='menu_img_span_div'>
                    <img alt='' className='my-image' src={myImage} />
                    <span style={{ color: '#314659', position: 'absolute', left: '60px' }}>
                      {_.size(admin) === 0 ? '未登录' : admin.userName}
                    </span>
                  </div>
                </Dropdown>

              </Col>
            </Row>
          </Header>

          <Layout
            style={{
              padding: '64px 24px 12px',
              minHeight: '100vh',
              marginTop: '-64px'
            }}
          >
            <Content
              style={{
                margin: 0,
                minHeight: 280
              }}
            >
              {props.children}
            </Content>
          </Layout>
          <Footer>
            <GlobalFooter copyright={copyright} />
          </Footer>
        </Layout>

        <BackTop />
      </div>
    )
  }
}
