/* global API_HOST */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Upload, Icon, Modal } from 'antd'
import AxiosApi from '../../../../utils/axios-api'

const FormItem = Form.Item

class ProductModal extends PureComponent {
  state = {
    currentItem: {},
    modalType: '',
    select: true,
    upload: {
      fileList: [],
      previewVisible: false,
      previewImage: ''
    }
  }

  componentWillMount() {
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem,
      modalType: modalType
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {}
        if (values.id) data.id = values.id
        if (values.name) data.name = values.name
        if (values.description) data.description = values.description
        if (values.img) data.img = values.img

        let posts = {
          form: data
        }

        this.props.onCreate(posts)
        this.props.onSubmitting()
      }
    })
  }

  handleRequest = (items) => {
    const formData = new FormData()
    formData.append('file', items.file)
    AxiosApi({
      method: 'POST',
      url: items.action,
      data: formData,
      headers: items.headers
    }).then(response => {
      this.setState({
        upload: {
          ...this.state.upload,
          fileList: [{
            uid: items.file.uid,
            name: items.file.name,
            status: 'done',
            url: response.data.imgUrl
          }]
        }
      })
    }).catch(error => {
      console.log('Error', error.message)
    })
  }

  handleChange = (data) => {
    console.log(data)
    this.setState({
      upload: {
        ...this.state.upload,
        fileList: data.fileList
      }
    })
    this.props.form.setFieldsValue({
      img: (data.file.status === 'done' && data.file.response.imgUrl) || null
    })
  }

  handlePreview = (file) => {
    this.setState({
      upload: {
        ...this.state.upload,
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      }
    })
  }

  handlePreviewCancel = () => {
    this.setState({
      upload: {
        fileList: [],
        previewImage: '',
        previewVisible: false
      }
    })
    this.props.form.resetFields([ 'img' ])
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const detail = this.state.currentItem
    const modalType = this.state.modalType
    const check = ['update'].includes(modalType)

    const currProps = {
      action: `${API_HOST}/trans/products/upload/pic`,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
      }
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    }

    getFieldDecorator('img')

    return (
      <Form onSubmit={this.handleSubmit}>
        {
          check &&
          <FormItem
            {...formItemLayout}
            label='ID'
          >
            {getFieldDecorator('id', {
              initialValue: detail.id || '',
              rules: [{ required: true, message: '请填写 ID!' }]
            })(
              <Input placeholder='请填写 ID' disabled={check} />
            )}
          </FormItem>
        }
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label='产品名称'
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请填写产品名称' }]
          })(
            <Input placeholder='请填写产品名称' />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label='产品描述'
        >
          {getFieldDecorator('description', {
            rules: [{ required: false, message: '请填写产品描述' }]
          })(
            <Input.TextArea autosize={{minRows: 6}} placeholder='请填写产品描述' />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label='产品图片'
        >
          {getFieldDecorator('upload', {
            rules: [{ required: false, message: '请填写产品图片' }]
          })(
            <div className='clearfix'>
              <Upload
                {...currProps}
                listType='picture-card'
                fileList={this.state.upload.fileList}
                onChange={this.handleChange}
                onPreview={this.handlePreview}
              >
                {this.state.upload.fileList.length >= 1 ? null : <div><Icon type='upload' /></div>}
              </Upload>
              <Modal visible={this.state.upload.previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
                <img alt='example' style={{ width: '100%' }} src={this.state.upload.previewImage} />
              </Modal>
            </div>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

ProductModal.propTypes = {
  form: PropTypes.object,
  onCreate: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const createProductModal = Form.create()(ProductModal)

export default createProductModal
