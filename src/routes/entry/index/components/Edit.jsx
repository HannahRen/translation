/* global API_HOST */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import _ from 'lodash'
import {Form, Button, Input, Icon, Select} from 'antd'
import openNotificationWithIcon from '../../../../base/components/Notification'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

let languageId = 0

class EditForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    productId: PropTypes.object,
    currentEdit: PropTypes.object,
    languages: PropTypes.array,
    onSubmitting: PropTypes.func,
    refreshEdit: PropTypes.func
  }

  handleUpload = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let productId = this.props.productId.productId
        let param = {}
        param.product = productId
        param.language = languageId
        if (values.version) param.version = values.version
        if (values.key) param.key = values.key
        if (values.base) param.base = values.base
        if (values.translation) param.translation = values.translation

        axios({
          method: 'PUT',
          data: param,
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

        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const currentEdit = this.props.currentEdit

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

    _.map(this.props.languages, (v, i) => {
      if (this.props.currentEdit.language == v.name) {
        languageId = v.id
      }
    })

    const editContent = (languageId === 1) ? (
      <FormItem
        {...formItemLayout2}
        label='基础词条'
      >
        {getFieldDecorator('base', {
          rules: [{ required: true, message: '请编辑基础词条！' }],
          initialValue: currentEdit.baseEntry
        })(
          <TextArea placeholder='请编辑基础词条' autosize={{minRows: 4}} />
        )}
      </FormItem>
    ) : (
      <div>
        <FormItem
          {...formItemLayout2}
          label='基础词条'
        >
          {getFieldDecorator('base', {
            initialValue: currentEdit.baseEntry
          })(
            <TextArea disabled autosize={{minRows: 2}} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout2}
          label='词条翻译'
        >
          {getFieldDecorator('translation', {
            rrules: [{ required: true, message: '请编辑词条翻译！' }],
            initialValue: currentEdit.translation
          })(
            <TextArea placeholder='请输入翻译!' autosize={{minRows: 4}} />
          )}
        </FormItem>
      </div>
    )

    return (
      <Form onSubmit={this.handleUpload} hideRequiredMark>
        <FormItem
          {...formItemLayout}
          label='版本'
        >
          {getFieldDecorator('version', {
            initialValue: currentEdit.version
          })(
            <Select disabled>
              <Option key={currentEdit.version}>{currentEdit.version}</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='语种'
        >
          {getFieldDecorator('language', {
            initialValue: currentEdit.language
          })(
            <Select disabled>
              <Option key={currentEdit.language}>{currentEdit.language}</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='KEY'
        >
          {getFieldDecorator('key', {
            initialValue: currentEdit.key
          })(
            <Input disabled />
          )}
        </FormItem>
        {editContent}
        <FormItem
          {...tailFormItemLayout}
        >
          <Button type='primary' size='large' htmlType='submit'>
            <Icon type='edit' />提交</Button>
        </FormItem>
      </Form>
    )
  }
}

const Edit = Form.create()(EditForm)

export default Edit
