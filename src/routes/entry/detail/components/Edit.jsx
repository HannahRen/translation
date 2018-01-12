import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Button, Input, Icon, Select} from 'antd'


const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

class EditForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    data: PropTypes.object,
    entry: PropTypes.object,
    productId: PropTypes.string,
    currentLanguageId: PropTypes.number,
    fetchEdit: PropTypes.func,
    handleCancel: PropTypes.func
  }

  handleUpload = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let param = {
          version: values.version,
          key: values.key,
          base: values.baseEntry,
          language: this.props.currentLanguageId,
          product: this.props.productId
        }

        if (this.props.data.language !== '基础词条' && values.translation) param.translation = values.translation

        this.props.fetchEdit(param, this.props.entry)
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const data = this.props.data

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

    return (
      <Form onSubmit={this.handleUpload} hideRequiredMark>
        <FormItem
          {...formItemLayout}
          label='版本'
        >
          {getFieldDecorator('version', {
            initialValue: data.version
          })(
            <Select disabled>
              <Option key={data.version}>{data.version}</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='语种'
        >
          {getFieldDecorator('language', {
            initialValue: data.language
          })(
            <Select disabled>
              <Option key={data.language}>{data.language}</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='KEY'
        >
          {getFieldDecorator('key', {
            initialValue: data.key
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout2}
          label='基础词条'
        >
          {getFieldDecorator('baseEntry', {
            rules: [{required: true, message: '请编辑基础词条！'}],
            initialValue: data.baseEntry
          })(
            <TextArea placeholder='请输入基础词条!' autosize={{minRows: 4}} disabled={data.language !== '基础词条'} />
          )}
        </FormItem>
        {
          data.language !== '基础词条' &&
          <FormItem
            {...formItemLayout2}
            label='词条翻译'
          >
            {getFieldDecorator('translation', {
              rules: [{required: true, message: '请编辑词条翻译！'}],
              initialValue: data.translation
            })(
              <TextArea placeholder='请输入翻译!' autosize={{minRows: 4}} />
            )}
          </FormItem>
        }

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
