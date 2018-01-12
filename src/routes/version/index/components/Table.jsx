import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Form, Select, Button, Icon } from 'antd'
// import './Index.less'
// import Logs from '../containers/LogContainer'
import openNotificationWithIcon from '../../../../base/components/Notification'

const FormItem = Form.Item
const Option = Select.Option


class IndexForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    authorize: PropTypes.array,
    versions: PropTypes.object,
    productsMap: PropTypes.object,
    fetchLanguage: PropTypes.func,
    fetchVersion: PropTypes.func,
    fetchProductsMap: PropTypes.func,
    fetchRecord: PropTypes.func,
    fetchRecord2: PropTypes.func,
    clearRecord2: PropTypes.func
  }

  state = {
    fileList: [],
    ver: false,
    productId: ''
  }

  componentWillMount() {
    this.props.clearRecord2()
    this.props.fetchProductsMap()
    this.props.fetchLanguage()
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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!values.versions || values.versions.length < 1) {
          return
        }
        if (values.versions.length > 2) {
          openNotificationWithIcon('warning', '版本选择过多', '请选择至多两个版本')
        }
        let v1 = {}
        let v2 = {}
        if (values.versions.length === 1) {
          v1 = {...values, versions: values.versions[0]}
          this.props.fetchRecord(v1)
        }
        if (values.versions.length === 2) {
          v1 = {...values, versions: values.versions[0]}
          this.props.fetchRecord(v1)
          v2 = {...values, versions: values.versions[1]}
          this.props.fetchRecord2(v2)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { authorize } = this.props
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
    _.map(this.props.versions.version, (v, i) => {
      verOptions.push(<Option key={v.version}>{v.version}</Option>)
    })
    if (this.state.ver) {
      verOptions = []
    }

    let lagOptions = []
    _.map(this.props.versions.language, (v, i) => {
      lagOptions.push(<Option key={v.id}>{v.name}</Option>)
    })

    return (
      <div>
        {
          _.indexOf(authorize, 50100) !== -1 ?
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: '35px'}} >
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
                    mode='multiple'
                    showSearch
                    allowClear
                    optionFilterProp='children'
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

              <FormItem {...tailFormItemLayout}>
                <Button
                  className='upload-demo-start'
                  type='primary'
                  size='large'
                  htmlType='submit'
                >
                  <Icon type='arrow-right' />下一步
                </Button>
              </FormItem>
            </Form>
          :
            ''
        }
      </div>
    )
  }
}

const Table = Form.create()(IndexForm)

export default Table
