import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Table } from 'antd'


export default class List extends Component {

  static propTypes = {
    versions: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.grid = [
      {value: 0, name: '没有变化'},
      {value: 1, name: '修改'},
      {value: 2, name: '新增'},
      {value: 3, name: '删除'}
    ]

    this.columns = [
      {
        title: 'KEY',
        dataIndex: 'key',
        key: 'key',
        onCell: () => {
          return {
            style: { borderRight: '2px solid #3C3C3C' }
          }
        }
      }, {
        title: '基础词条1',
        dataIndex: 'baseA',
        key: 'baseA'
      }, {
        title: '翻译1',
        dataIndex: 'translationA',
        key: 'translationA',
        onCell: () => {
          return {
            style: { borderRight: '2px solid #3C3C3C' }
          }
        }
      }, {
        title: '基础词条2',
        dataIndex: 'baseB',
        key: 'baseB'
      }, {
        title: '翻译2',
        dataIndex: 'translationB',
        key: 'translationB',
        onCell: () => {
          return {
            style: { borderRight: '2px solid #3C3C3C' }
          }
        }
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (text, record) => {
          let content = '无'
          let colorVal = ''
          _.map(this.grid, (v, i) => {
            if (v.value === text) {
              content = v.name
              if (v.value === 1) {
                colorVal = '#FFD322'
              }
              if (v.value === 2) {
                colorVal = '#00DD00'
              }
              if (v.value === 3) {
                colorVal = 'red'
              }
            }
          })

          if (colorVal.length > 0) {
            return (
              <div style={{color: colorVal}}>{content}</div>
            )
          }
          else {
            return (
              <div>{content}</div>
            )
          }
        }
      }
    ]

    this.dataSource = []
  }

  render() {
    this.dataSource = this.props.versions.compare
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['50', '100', '200', '500'],
      total: this.dataSource.length
    }

    return (
      <div>
        <Table
          dataSource={this.dataSource}
          columns={this.columns}
          rowKey='key'
          pagination={pagination}
          bordered
        />
      </div>
    )
  }
}
