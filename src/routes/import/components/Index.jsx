/* global API_HOST */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import _ from 'lodash'
import PageHeader from 'ant-design-pro/lib/PageHeader'

import { Form, Select, Card, Upload, Button, Icon, Modal } from 'antd'
import './Index.less'
import Logs from '../containers/LogContainer'
import openNotificationWithIcon from '../../../base/components/Notification'

const FormItem = Form.Item
const Option = Select.Option
const Dragger = Upload.Dragger


class IndexForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    imports: PropTypes.object,
    productsMap: PropTypes.object,
    fetchLanguage: PropTypes.func,
    fetchVersion: PropTypes.func,
    fetchProductsMap: PropTypes.func
  }

  state = {
    fileList: [],
    ver: false,
    productId: '',
    version: '',
    lanId: '',
    fetching: false,
    logVisible: false
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.fetchLanguage()
  }

  shouldComponentUpdate() {
    return !this.state.logVisible
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
    this.setState({
      productId: e
    })
  }
  handleChangeVer = (e) => {
    this.setState({
      version: e
    })
  }
  handleChangeLan = (e) => {
    this.setState({
      lanId: e
    })
  }

  handleUpload = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.fileList.length === 0) {
          openNotificationWithIcon('warning', '请选择文件', '未选择要上传的文件。请选择您要上传的文件，文件应为EXCEL文件。')
          return
        }
        if (!values.products || !values.versions || !values.languages) {
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
        let state = this.state
        axios({
          method: 'POST',
          data: formData,
          url: `${API_HOST}/trans/import/products/${state.productId}/version/${state.version}/language/${state.lanId}`,
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

  // 导入log
  handleLog = () => {
    this.setState({
      logVisible: true
    })
  }
  // 导入log
  handleLogCancel = () => {
    this.setState({
      logVisible: false
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { login: { authorize } } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 4 },
        md: { span: 4, offset: 4 },
        lg: { span: 4, offset: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 8 },
        lg: { span: 6 }
      }
    }

    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4, offset: 2 },
        md: { span: 4, offset: 2 },
        lg: { span: 2, offset: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
        lg: { span: 10 }
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

    const logEnter = (
      <Button onClick={this.handleLog} type='primary'>
        导入log
      </Button>
    )

    return (
      <div>
        <div style={{marginTop: '30px'}} >
          <PageHeader title='导入词条' action={logEnter} />
        </div>
        <Card style={{marginTop: '10px'}} >
          {
            _.indexOf(authorize, 60100) !== -1 ?
              <Form onSubmit={this.handleUpload} hideRequiredMark style={{marginTop: '35px'}} >
                <FormItem
                  {...formItemLayout}
                  label='产品'
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
                  label='版本'
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
            :
              ''
          }
        </Card>
        <Modal
          width={800}
          key={Math.random()}
          title='导入log'
          visible={this.state.logVisible}
          onCancel={this.handleLogCancel}
          footer={null}
          maskClosable={false}
        >
          <Logs
            handleLogCancel={this.handleLogCancel}
            imports={this.props.imports}
            productsMap={this.props.productsMap}
          />
        </Modal>
      </div>
    )
  }
}

const Index = Form.create()(IndexForm)

export default Index
