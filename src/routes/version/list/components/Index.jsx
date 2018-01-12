import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PageHeader from 'ant-design-pro/lib/PageHeader'
import { Card, Modal, Button } from 'antd'
import { Link } from 'react-router'

import Tables from './Table'
import List from './ListPage'


export default class Index extends Component {

  static propTypes = {
    versions: PropTypes.object,
    login: PropTypes.object,
    fetchCompare: PropTypes.func
  }

  state = {
    panel: ['1'],
    visible: false
  }

  shouldComponentUpdate() {
    return !this.state.visible
  }

  handleChange = (e) => {
    this.setState({
      panel: e
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleVisible = () => {
    this.setState({
      visible: true
    })
  }

  render() {
    const { login: { authorize } } = this.props
    console.log(authorize)
    return (
      <div>
        <div style={{marginTop: '30px'}} >
          <PageHeader
            title='版本对比'
            action={
              <Link to='/version/index'>
                <Button type='default'>
                  返回
                </Button>
              </Link>
            }
          />
          <Card style={{marginTop: '10px', padding: '30px 0'}}>
            <Tables
              versions={this.props.versions}
              authorize={authorize}
              fetchCompare={this.props.fetchCompare}
              handleVisible={this.handleVisible}
            />
          </Card>
        </div>
        <Modal
          width={1200}
          key={Math.random()}
          title='版本对比列表'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <List
            versions={this.props.versions}
          />
        </Modal>
      </div>
    )
  }
}
