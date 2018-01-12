/* global API_HOST */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Form, Select, Button, Icon, Table } from 'antd'

const FormItem = Form.Item
const Option = Select.Option


class IndexForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    exportsEn: PropTypes.object,
    productsMap: PropTypes.object,
    fetchVersion: PropTypes.func,
    fetchExpLog: PropTypes.func
    // handleLogCancel: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'author',
        dataIndex: 'author'
      },
      {
        title: 'version',
        dataIndex: 'version'
      },
      {
        title: 'totalCount',
        dataIndex: 'totalCount'
      },
      {
        title: 'createTime',
        dataIndex: 'createTime'
      },
      {
        title: 'fileName',
        dataIndex: 'fileName'
      },
      {
        title: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <Button onClick={() => this.handleDownloadExportLog(record)}>
              下载
            </Button>
          )
        }
      }
    ]
  }

  state = {
    fileList: [],
    ver: false,
    isList: false
  }

  handleChangePro = (e) => {
    if (!e) {
      this.setState({
        ver: true
      })
      this.props.form.setFields({
        versions: null
      })
      return
    }
    if (e) {
      this.props.fetchVersion(e)
      this.props.form.setFields({
        versions: null
      })
      this.setState({
        ver: false
      })
     }
  }

  handleUpload = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let val = {
          product: values.products,
          version: values.versions,
          language: values.languages
        }
        this.setState({
          isList: true
        })
        this.props.fetchExpLog(val)
        this.props.form.resetFields()
        // this.props.handleLogCancel()
      }
    })
  }

  handleReExport = () => {
    this.setState({
      isList: false
    })
  }

  handleDownloadExportLog = (v) => {
    window.open(`${API_HOST}/trans/download/${v.fileName}`)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7, offset: 1 },
        md: { span: 7, offset: 1 },
        lg: { span: 7, offset: 1 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
        // lg: { span: 6 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 10
        }
      }
    }

    let proOptions = []
    _.map(this.props.productsMap.options, (v, i) => {
      proOptions.push(<Option key={v.id} >{`${v.name}(${v.id})`}</Option>)
    })

    let verOptions = []
    _.map(this.props.exportsEn.version, (v, i) => {
      verOptions.push(<Option key={v.version}>{v.version}</Option>)
    })

    if (this.state.ver) {
      verOptions = []
    }

    let lagOptions = []
    _.map(this.props.exportsEn.language, (v, i) => {
      lagOptions.push(<Option key={v.id}>{v.name}</Option>)
    })

    return (
      <div>
        <Form onSubmit={this.handleUpload} hideRequiredMark>
          {
            !this.state.isList &&
              <FormItem
                {...formItemLayout}
                label='选择产品'
              >
                {getFieldDecorator('products', {
                  rules: [{ required: true, message: '请选择产品' }]
                })(
                  <Select
                    onChange={this.handleChangePro}
                    showSearch
                    optionFilterProp='children'
                    allowClear
                    placeholder='请选择产品(必选)'
                    dropdownMatchSelectWidth
                  >
                    {proOptions}
                  </Select>
                )}
              </FormItem>
          }
          {
            !this.state.isList &&
              <FormItem
                {...formItemLayout}
                label='版本(需先选择产品)'
              >
                {getFieldDecorator('versions', {
                  rules: [{ required: true, message: '请选择版本(请先选择产品)' }]
                })(
                  <Select
                    onChange={this.handleChangeVer}
                    showSearch
                    optionFilterProp='children'
                    allowClear
                    placeholder='请选择版本(必选)'
                    dropdownMatchSelectWidth
                    notFoundContent='请先选择产品，再选择版本!'
                  >
                    {verOptions}
                  </Select>
                )}
              </FormItem>
          }
          {
            !this.state.isList &&
              <FormItem
                {...formItemLayout}
                label='语言'
              >
                {getFieldDecorator('languages', {
                  rules: [{ required: true, message: '请选择语言' }]
                })(
                  <Select
                    onChange={this.handleChangeLan}
                    showSearch
                    optionFilterProp='children'
                    allowClear
                    placeholder='请选择语言(必选)'
                    dropdownMatchSelectWidth
                  >
                    {lagOptions}
                  </Select>
                )}
              </FormItem>
          }
          {
            !this.state.isList &&
              <FormItem {...tailFormItemLayout}>
                <Button
                  className='upload-demo-start'
                  type='primary'
                  size='large'
                  htmlType='submit'
                >
                  <Icon type='cloud-upload-o' />导出
                </Button>
              </FormItem>
          }

          {
            this.state.isList &&
            <Table
              rowKey='id'
              columns={this.columns}
              dataSource={this.props.exportsEn.expLog}
              scroll={{ y: 500 }}
            />
          }
          {
            this.state.isList &&
              <FormItem {...tailFormItemLayout}>
                <div>
                  <Button
                    type='primary'
                    onClick={this.handleReExport}
                  >
                    <Icon type='arrow-up' />重新导出
                  </Button>
                </div>
              </FormItem>
          }
        </Form>
      </div>
    )
  }
}

const Log = Form.create()(IndexForm)

export default Log
