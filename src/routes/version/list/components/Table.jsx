import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Transfer, Button, Row, Col } from 'antd'

import openNotificationWithIcon from '../../../../base/components/Notification'
import './Table.less'


class IndexForm extends Component {

  static propTypes = {
    versions: PropTypes.object,
    authorize: PropTypes.array,
    fetchCompare: PropTypes.func,
    handleVisible: PropTypes.func
  }

  state = {
    targetKeys: [],
    dataSource: []
  }

  componentWillMount() {
    let dataSource = []
    _.map(this.props.versions.lists, (v, i) => {
      if (v.revisionName) {
        dataSource.push({
          key: v.id,
          title: v.revisionName
        })
      }
      else {
        dataSource.push({
          key: v.id,
          title: '无描述名称的版本号'
        })
      }
    })
    _.map(this.props.versions.lists2, (v, i) => {
      if (v.revisionName) {
        dataSource.push({
          key: v.id,
          title: v.revisionName
        })
      }
      else {
        dataSource.push({
          key: v.id,
          title: '无描述名称的版本号'
        })
      }
    })
    this.setState({
      dataSource: dataSource
    })
  }

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    if (nextTargetKeys.length > 2) {
      openNotificationWithIcon('warning', '请选择两个版本进行对比', '您选择的版本过多，请选择两个不同版本进行对比')
      return
    }
    this.setState({ targetKeys: nextTargetKeys })
  }

  handleSubmit = () => {
    if (this.state.targetKeys.length > 2) {
      return
    }
    if (this.state.targetKeys.length < 2) {
      openNotificationWithIcon('warning', '请选择两个不同版本', '版本选择错误，请选择两个不同版本进行对比')
      return
    }
    let value = {
      version1: this.state.targetKeys[0],
      version2: this.state.targetKeys[1]
    }
    this.props.fetchCompare(value)
    this.props.handleVisible()
  }

  render() {
    const { authorize } = this.props

    return (
      <div>
        <Form onSubmit={this.handleSubmit} hideRequiredMark>
          <Row>
            <Col span={24}>
              <Transfer
                showSearch
                dataSource={this.state.dataSource}
                filterOption={this.filterOption}
                targetKeys={this.state.targetKeys}
                render={item => item.title}
                onChange={this.handleChange}
                notFoundContent='请将要对比的两个不同版本拉至右侧,然后点击查询按钮。'
                listStyle={{
                  width: 420,
                  height: 500
                }}
              />
              {
                _.indexOf(authorize, 50200) !== -1 ?
                  <Button
                    icon='search'
                    type='primary'
                    onClick={this.handleSubmit}
                    style={{ marginLeft: '15px' }}
                  >
                    查询
                  </Button>
                :
                  ''
              }
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const Index = Form.create()(IndexForm)

export default Index
