/* global API_HOST */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Input, Upload, Icon, Modal } from 'antd'

const CustomizedUpload = (props) => {
  const { upload, customRequest, onPreviewCancel, onPreview } = props

  const currProps = {
    action: `${API_HOST}/trans/products/upload/pic`,
    headers: {
      'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
      'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
    }
  }

  const uploadButton = (
    <div>
      <Icon type='plus' />
      <div className='ant-upload-text'>Upload</div>
    </div>
  )

  return (
    <div className='clearfix'>
      <Upload
        {...currProps}
        listType='picture-card'
        fileList={upload.fileList}
        onPreview={onPreview}
        customRequest={customRequest}
      >
        {upload.fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal visible={upload.previewVisible} footer={null} onCancel={onPreviewCancel}>
        <img alt='example' style={{ width: '100%' }} src={upload.previewImage} />
      </Modal>
    </div>
  )
}
CustomizedUpload.propTypes = {
  upload: PropTypes.object,
  onPreview: PropTypes.func,
  customRequest: PropTypes.func,
  onPreviewCancel: PropTypes.func
}

export default class UploadFile extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
  }

  state = {
    visible: false,
    upload: {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }

  handleRequest = (items) => {
    const formData = new FormData()
    formData.append('file', items.file)
    axios({
      method: 'POST',
      url: items.action,
      data: formData,
      headers: items.headers
    }).then(response => {
      this.props.onChange(response.data.imgUrl)
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
      if (error.response) {

      } else {
        console.log('Error', error.message)
      }
    })
  }

  handleCancel = () => this.setState({ visible: false })

  handlePreviewCancel = () => this.setState({
    upload: {
      ...this.state.upload,
      previewVisible: false
    }
  })

  handlePreview = (file) => {
    this.setState({
      upload: {
        ...this.state.upload,
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      }
    })
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  saveFormRef = (form) => {
    this.form = form
  }

  render() {

    return (
      <div>
        <Input value={this.props.value} addonAfter={<a onClick={this.showModal}><Icon type='upload' /></a>} placeholder='请填写图片' />
        <Modal
          visible={this.state.visible}
          title='图片上传'
          onCancel={this.handleCancel}
          footer={null}
        >
          <CustomizedUpload
            upload={this.state.upload}
            onPreview={this.handlePreview}
            customRequest={this.handleRequest}
            onPreviewCancel={this.handlePreviewCancel}
          />
        </Modal>

      </div>
    )
  }
}
