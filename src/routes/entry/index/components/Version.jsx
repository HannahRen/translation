import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Input, Button, Icon } from 'antd'
const FormItem = Form.Item

let itemsId = 0

class VersionModal extends Component {
  state = {
    currentItem: [],
    modalType: '',
    select: true,
    createVersion: false
  }

  componentWillMount() {
    const modals = this.props.onModalLoad()
    const entry = this.props.options.entry

    this.props.form.getFieldDecorator('itemsKeys', { initialValue: [] })
    itemsId = 0
    this._fieldSet(entry.versions)

    this.setState({
      currentItem: entry.versions,
      modalType: modals.type
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const entry = this.props.options.entry
        entry.versions.map(item => {
          _.remove(values.versionItems, version => version === item.version)
        })
        let data = {}
        data.form = { param: values.versionItems.pop() }
        data.params = {}

        this.props.onCreate({...data, handle: this.state.modalType})
        this.props.onSubmitting()
      }
    })
  }

  handleItemsAdd = () => {
    itemsId++
    const { form } = this.props
    const itemsKeys = form.getFieldValue('itemsKeys')
    itemsKeys.unshift(itemsId)
    form.setFieldsValue({
      itemsKeys: itemsKeys
    })
    this.setState({
      createVersion: true
    })
  }

  handleItemsRemove = (k) => {
    const { form } = this.props
    const itemsKeys = form.getFieldValue('itemsKeys')
    if (itemsKeys.length === 1) {
      return
    }
    form.setFieldsValue({
      itemsKeys: itemsKeys.filter(key => key !== k)
    })
  }

  _fieldSet = (versionItems) => {
    const { form } = this.props
    const itemsKeys = form.getFieldValue('itemsKeys')
    if (versionItems && !itemsKeys.length) {
      versionItems.map((option, index) => {
        itemsId++
        itemsKeys.unshift(itemsId)
        form.setFieldsValue({
          itemsKeys: itemsKeys
        })
      })
    }
  }

  render() {
    const { options } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form

    const versionItems = options.entry.versions || []

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 0 }
      }
    }

    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 6 }
      }
    }

    const itemsKeys = getFieldValue('itemsKeys')

    const formItems = itemsKeys.map((key, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayout)}
          label={index === 0 ? '版本列表' : ' '}
          key={`version-${key}`}
          colon={index === 0}
          required={false}
        >
          {getFieldDecorator(`versionItems[${key}]`, {
            initialValue: versionItems.length && key <= versionItems.length ? versionItems[key - 1].version : '',
            rules: [{
              required: true,
              pattern: /\d{1,2}.\d{1,2}.\d{1,3}$/i,
              message: '请填写版本号!'
            }]
          })(
            <Input placeholder='填写版本' style={{ width: '80%', marginRight: 8 }} />
          )}
        </FormItem>
      )
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' disabled={!this.state.createVersion}>提交</Button>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='dashed' onClick={this.handleItemsAdd} disabled={this.state.createVersion}>
            <Icon type='plus' />添加版本
          </Button>
        </FormItem>

        {
          formItems
        }
      </Form>
    )
  }
}

VersionModal.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  onCreate: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(VersionModal)

export default Modal
