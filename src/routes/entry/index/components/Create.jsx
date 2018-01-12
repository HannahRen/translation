/* global API_HOST */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import axios from 'axios'
import {Form, Button, Input, Icon, Select} from 'antd'
import openNotificationWithIcon from '../../../../base/components/Notification'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

class CreateForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    productId: PropTypes.object,
    entry: PropTypes.object,
    onSubmitting: PropTypes.func
  }

  state = {
    fetching: false
  }

  handleFetching = () => {
    this.setState({
      fetching: true
    })
  }

  handleUpload = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let productId = this.props.productId.productId

        let entryList = {}
        entryList.product = productId
        if (values.version) entryList.version = values.version
        if (values.key) entryList.key = values.key
        if (values.base) entryList.base = values.base

        // 防止重复提交
        this.handleFetching()
        if (this.state.fetching) {
          return
        }

        axios({
          method: 'POST',
          data: entryList,
          url: `${API_HOST}/trans`,
          headers: {
            'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
            'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
          }
        }).then(response => {
          openNotificationWithIcon('success', '新增成功', '新增词条上传成功!')
          this.setState({
            fetching: false
          })
        }).catch(error => {
          if (error.response) {
            openNotificationWithIcon('error', error.response.status, error.response.data.tips)
          } else {
            console.log('Error', error.message)
          }
        })
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 3 },
        md: { span: 4, offset: 3 },
        lg: { span: 4, offset: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 12 },
        lg: { span: 12 }
      }
    }

    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 2 },
        md: { span: 4, offset: 2 },
        lg: { span: 4, offset: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
        lg: { span: 14 }
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

    let verOptions = []
    _.map(this.props.entry.versions, (v, i) => {
      verOptions.push(<Option key={v.version}>{v.version}</Option>)
    })


    return (
      <Form onSubmit={this.handleUpload} hideRequiredMark>
        <FormItem
          {...formItemLayout}
          label='版本'
        >
          {getFieldDecorator('version', {
            rules: [{ required: true, message: '请选择版本' }]
          })(
            <Select
              showSearch
              optionFilterProp='children'
              allowClear
              placeholder='请选择版本(必选)'
              dropdownMatchSelectWidth
            >
              {verOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='KEY'
        >
          {getFieldDecorator('key', {
            rules: [{required: true,
                     pattern: /[a-zA-Z]+[0-9a-zA-Z_]*(\.[a-zA-Z]+[0-9a-zA-Z_]*)*/,
                     message: '请填写KEY！'}]
          })(
            <Input placeholder='填写KEY' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout2}
          label='基础词条'
        >
          {getFieldDecorator('base', {
            rules: [{required: true, message: '请填写基础词条！'}]
          })(
            <TextArea placeholder='填写基础词条' rows={4} />
          )}
        </FormItem>
        <FormItem
          {...tailFormItemLayout}
        >
          <Button type='primary' size='large' htmlType='submit'>
            <Icon type='upload' />提交</Button>
        </FormItem>
      </Form>
    )
  }
}

const Create = Form.create()(CreateForm)

export default Create
