/* global API_HOST */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Popconfirm, Divider, Table } from 'antd'
import moment from 'moment'
import { Link } from 'react-router'
import Ellipsis from 'ant-design-pro/lib/Ellipsis'
import openNotificationWithIcon from '../../../../base/components/Notification'
import EditTableCell from './EditTableCell'
import './Index.less'
import _ from 'lodash'


export default class List extends Component {

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'KEY',
        dataIndex: 'key',
        key: 'key'
      }, {
        title: '基础词条',
        dataIndex: 'baseEntry',
        key: 'baseEntry',
        render: (text, record) => (
          <Ellipsis tooltip length={14}>{text}</Ellipsis>
        )
      }, {
        title: '翻译',
        dataIndex: 'translation',
        key: 'translation',
        render: (text, record) => {
          return (
            <EditTableCell
              data={text}
              onValueChange={(v) => this.onCellChange(record, v)}
            />
          )
        }
      }, {
        title: '版本',
        dataIndex: 'version',
        key: 'version'
      }, {
        title: '语种',
        dataIndex: 'language',
        key: 'language'
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
        sorter: (a, b) => {
          return (moment(a.updateTime).unix() - moment(b.updateTime).unix())
        }
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          let url = this.props.location.pathname.slice(0, 11)
          return (
            <div>
              <span style={{marginRight: '8px'}}>
                {
                  _.indexOf(this.props.login.authorize, 30400) !== -1 ?
                    <a href='javascript:void(0)' onClick={() => this.handleCurrentEntry(record)}>编辑</a>
                :
                ''
              }
              </span>
              <span>
                {
                  _.indexOf(this.props.login.authorize, 30600) !== -1 ?
                    <Link to={{
                    pathname: `${url}/detail/${record.key}`,
                    state: {
                    proName: this.props.proName,
                    titles: this.props.titles,
                    data: record,
                    currentLanguageId: this.props.currentLanguageId,
                    productId: this.props.productId
                  }
                }}>
                  详情
                </Link>
                :
                ''
              }
              </span>
            </div>
          )
        }
      }
    ]

    this.baseColumns = [
      {
        title: 'KEY',
        dataIndex: 'key',
        key: 'key'
      }, {
        title: '基础词条',
        dataIndex: 'baseEntry',
        key: 'baseEntry',
        render: (text, record) => {
          return (
            <EditTableCell
              data={text}
              onValueChange={(v) => this.onCellChange(record, v)}
            />
          )
        }
      }, {
        title: '版本',
        dataIndex: 'version',
        key: 'version'
      }, {
        title: '语种',
        dataIndex: 'language',
        key: 'language'
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
        sorter: (a, b) => {
          return (moment(a.updateTime).unix() - moment(b.updateTime).unix())
        }
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          let url = this.props.location.pathname.slice(0, 11)
          return (
            <div>
              <span style={{marginRight: '8px'}}>
                {
                  _.indexOf(this.props.login.authorize, 30100) !== -1 ?
                    <Popconfirm title='确定删除当前词条?' onConfirm={() => this.delEntry(record)} okText='确定' cancelText='取消'>
                      <a href='javascript:void(0)'>删除</a>
                    </Popconfirm>
                :
                ''
              }
              </span>
              <span style={{marginRight: '8px'}}>
                {
                  _.indexOf(this.props.login.authorize, 30400) !== -1 ?
                    <a href='javascript:void(0)' onClick={() => this.handleCurrentEntry(record)}>编辑</a>
                   :
                   ''
                 }
              </span>
              <span>
                {
                  _.indexOf(this.props.login.authorize, 30600) !== -1 ?
                    <Link to={{
                    pathname: `${url}/detail/${record.key}`,
                    state: {
                    proName: this.props.proName,
                    titles: this.props.titles,
                    data: record,
                    currentLanguageId: this.props.currentLanguageId,
                    productId: this.props.productId
                  }
                }}>
                  详情
                </Link>
                :
                ''
              }
              </span>
            </div>
          )
        }
      }
    ]
    this.dataSource = []
  }


  handleCurrentEntry = (record) => {
    this.props.handleEdit(record)
  }

  delEntry = (record) => {
    // console.log(record)
    this.props.entryDelete(record, this.props.entry)
  }

  onCellChange = (v, nv) => {
    let value = {
      product: this.props.productId,
      language: this.props.currentLanguageId,
      version: v.version,
      key: v.key
    }
    if (v.language !== '基础词条') {
      value.translation = nv
      value.base = v.baseEntry
    }
    else {
      value.base = nv
    }
    openNotificationWithIcon('warning', '正在提交修改', '修改正在发送中......请稍等')
    axios({
      method: 'PUT',
      data: value,
      url: `${API_HOST}/trans`,
      headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
    }).then(response => {
      openNotificationWithIcon('success', '修改成功！')
      this.props.refreshEdit(response.data)
    }).catch(error => {
      if (error.response) {
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }

  render() {
    const { params, conf } = this.props.initials
    const { entry } = this.props.options
    // const { login: { authorize } } = this.props
    this.dataSource = entry.entries
    let arrParam = []
    params.base ? arrParam.push(`基础词条：${params.base}`) : ''
    params.version ? arrParam.push(`版本：${params.version}`) : ''
    params.language ? arrParam.push(`语种：${params.language}`) : ''
    params.category ? arrParam.push(`分类：${params.category}`) : ''
    let strParam = arrParam.join('，')
    let defaultLocale = {
      emptyText: conf.locale ? `查询：{ ${strParam} }，暂未查到数据` : '未作查询，暂无数据。请选择版本和语种，点击查询'
    }
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.dataSource.length
    }

    return (
      <div>
        <Table
          dataSource={this.dataSource}
          columns={this.props.currentLanguage === '基础词条' ? this.baseColumns : this.columns}
          expandedRowRender={record => {
            return (
              <div>
                <p style={{ marginTop: '5px', paddingLeft: '20px' }}><i style={{ fontWeight: 'bold', fontStyle: 'normal' }}>基础词条</i>:&nbsp;&nbsp;&nbsp;&nbsp;{record.baseEntry}</p>
                <Divider />
                <p style={{ marginBottom: '5px', paddingLeft: '20px' }}><i style={{ fontWeight: 'bold', fontStyle: 'normal' }}>翻译</i>:&nbsp;&nbsp;&nbsp;&nbsp;{record.translation}</p>
              </div>
            )
          }}
          locale={defaultLocale}
          rowKey='key'
          pagination={pagination}
          bordered
        />

      </div>
    )
  }
}

List.propTypes = {
  entry: PropTypes.object,
  currentLanguageId: PropTypes.number,
  currentLanguage: PropTypes.string,
  titles: PropTypes.string,
  options: PropTypes.object,
  initials: PropTypes.object,
  location: PropTypes.object,
  productId: PropTypes.string,
  proName: PropTypes.string,
  handleEdit: PropTypes.func,
  refreshEdit: PropTypes.func,
  entryDelete: PropTypes.func,
  login: PropTypes.object
}
