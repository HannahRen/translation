/* global API_HOST */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import _ from 'lodash'

import { Form, Select, Upload, Button, Icon } from 'antd'
import openNotificationWithIcon from '../../../../base/components/Notification'

const FormItem = Form.Item
const Option = Select.Option
const Dragger = Upload.Dragger


class IndexForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    productId: PropTypes.object,
    entry: PropTypes.object
  }

  state = {
    fileList: [],
    fetching: false
  }

  componentWillMount() {
    console.log(this.props)
  }


  handleUpload = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.fileList.length === 0) {
          openNotificationWithIcon('warning', '请选择文件', '未选择要上传的文件。请选择您要上传的文件，文件应为EXCEL文件。')
          return
        }
        if (!values.versions || !values.languages) {
          return
        }
        if (this.state.fetching) {
          return
        }
        this.setState({
          fetching: true
        })
        openNotificationWithIcon('warning', '正在上传，请勿重复提交', '正在上传，请勿重复提交!!!!')
        const formData = new FormData()
        formData.append('file', this.state.fileList[0])
        let productId = this.props.productId.productId
        axios({
          method: 'POST',
          data: formData,
          url: `${API_HOST}/trans/import/products/${productId}/version/${values.versions}/language/${values.languages}`,
          headers: {
            'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
            'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
          }
        }).then(response => {
          openNotificationWithIcon('success', '上传成功', 'EXCEL文档上传成功!')
          this.setState({
            fileList: [],
            fetching: false
          })
        }).catch(error => {
          if (error.response) {
            openNotificationWithIcon('error', error.response.status, error.response.data.tips)
            this.setState({
              fetching: false
            })
          } else {
            console.log('Error', error.message)
          }
        })
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

    let lagOptions = []
    _.map(this.props.entry.languages, (v, i) => {
      lagOptions.push(<Option key={v.id}>{v.name}</Option>)
    })

    const props = {
      action: `${API_HOST}/trans/import/products/${this.state.productId}/version/${this.state.version}/language/${this.state.lanId}`,
      onChange(info) {
      },
      beforeUpload: (file) => {
        this.setState({
          fileList: [file]
        })
        return false
      },
      onRemove: (file) => {
        this.setState({
          fileList: []
        })
      },
      fileList: this.state.fileList
    }

    return (
      <div>
        <Form onSubmit={this.handleUpload} hideRequiredMark >
          <FormItem
            {...formItemLayout}
            label='版本'
          >
            {getFieldDecorator('versions', {
              rules: [{ required: true, message: '请选择版本' }]
            })(
              <Select
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
          <FormItem
            {...formItemLayout2}
            label='上传文件'
            className='customUploadFormItem'
          >
            <Dragger {...props}>
              <p className='ant-upload-drag-icon'>
                <Icon type='inbox' />
              </p>
              <p>请上传EXCEL</p>
              <p>支持点击或拖拽</p>
            </Dragger>
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

const Index = Form.create()(IndexForm)

export default Index
