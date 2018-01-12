import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Form, Select, Button, Icon } from 'antd'

const FormItem = Form.Item
const Option = Select.Option


class IndexForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    imports: PropTypes.object,
    productsMap: PropTypes.object,
    fetchVersion: PropTypes.func,
    fetchLog: PropTypes.func,
    handleLogCancel: PropTypes.func
  }

  state = {
    fileList: [],
    ver: false
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
        console.log(values)
        let val = {
          product: values.products,
          version: values.versions,
          language: values.languages
        }
        this.props.fetchLog(val)
        this.props.handleLogCancel()
      }
    })
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
    _.map(this.props.imports.version, (v, i) => {
      verOptions.push(<Option key={v.version}>{v.version}</Option>)
    })

    if (this.state.ver) {
      verOptions = []
    }

    let lagOptions = []
    _.map(this.props.imports.language, (v, i) => {
      lagOptions.push(<Option key={v.id}>{v.name}</Option>)
    })

    return (
      <div>
        <Form onSubmit={this.handleUpload} hideRequiredMark>
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

          <FormItem {...tailFormItemLayout}>
            <Button
              className='upload-demo-start'
              type='primary'
              size='large'
              htmlType='submit'
            >
              <Icon type='cloud-upload-o' />导入
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const Log = Form.create()(IndexForm)

export default Log
