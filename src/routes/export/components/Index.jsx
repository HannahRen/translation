import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import PageHeader from 'ant-design-pro/lib/PageHeader'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import { Form, Select, Card, Button, DatePicker, Switch, Row, Col, Modal } from 'antd'
import openNotificationWithIcon from '../../../base/components/Notification'
import ExpLogs from '../containers/ExpLogContainer'
import ImpLogs from '../containers/ImpLogContainer'

const FormItem = Form.Item
const Option = Select.Option


class IndexForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    exportsEn: PropTypes.object,
    productsMap: PropTypes.object,
    fetchLanguage: PropTypes.func,
    fetchVersion: PropTypes.func,
    fetchAddress: PropTypes.func,
    fetchProductsMap: PropTypes.func
  }

  state = {
    ver: false,
    switch: false,
    expVisible: false,
    impVisible: false,
    num: 0
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.fetchLanguage()
  }

  shouldComponentUpdate() {
    if (this.state.num === 1) {
      return !this.state.expVisible
    }
    if (this.state.num === 2) {
      return !this.state.impVisible
    }
    else {
      return true
    }
  }

  handleGroup = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if ((values.products.length > 0) && (values.versions.length > 0) && (values.languages.length > 0)) {
          if (values.switch) {
            values.time = values.time.format('YYYY-MM-DD HH:mm:ss')
          }
          this.props.fetchAddress(values)
        } else {
          openNotificationWithIcon('warning', '请填写正确的产品名,版本号和语种', '请查看您填写的数据,保证填写正确的产品名,版本号和语种!')
        }
      }
    })
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

  handleSwitch = (e) => {
    this.setState({
      switch: e
    })
  }

  handleLogExp = () => {
    this.setState({
      expVisible: true,
      num: 1
    })
  }
  handleLogExpCancel = () => {
    this.setState({
      expVisible: false,
      num: 0
    })
  }

  handleLogImp = () => {
    this.setState({
      impVisible: true,
      num: 2
    })
  }
  handleLogImpCancel = () => {
    this.setState({
      impVisible: false,
      num: 0
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
    // const formItemLayout2 = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4, offset: 4 },
    //     md: { span: 4, offset: 4 },
    //     lg: { span: 4, offset: 4 }
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 14, offset: 8 },
    //     md: { span: 12, offset: 8 },
    //     lg: { span: 10, offset: 8 }
    //   }
    // }
    // const formItemLayout3 = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4, offset: 4 },
    //     md: { span: 4, offset: 4 },
    //     lg: { span: 4, offset: 4 }
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 14, offset: 7 },
    //     md: { span: 12, offset: 7 },
    //     lg: { span: 10, offset: 7 }
    //   }
    // }

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
    _.map(this.props.exportsEn.version, (v, i) => {
      verOptions.push(<Option key={v.version}>{v.version}</Option>)
    })
    if (this.state.ver) {
      verOptions = []
    }

    let lagOptions = []
    _.map(this.props.exportsEn.language, (v, i) => {
      lagOptions.push(<Option key={v.id}>{v.name}</Option>)
    })

    const logEnter = (
      <div>
        <Button onClick={this.handleLogExp} type='primary'>
          导出log
        </Button>
        <Button onClick={this.handleLogImp} type='primary'>
          导入log
        </Button>
      </div>
    )

    return (
      <div>
        <div style={{marginTop: '30px'}} >
          <PageHeader title='导出词条' action={logEnter} />
        </div>
        <Card style={{marginTop: '10px'}} >
          {
            _.indexOf(authorize, 70100) !== -1 ?
              <Form onSubmit={this.handleGroup} hideRequiredMark style={{marginTop: '35px'}} >
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
                <Row>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 3, offset: 6 }}
                    md={{ span: 2, offset: 8 }}
                    lg={{ span: 2, offset: 8 }}
                  >
                    <FormItem>
                      {getFieldDecorator('switch', {
                        rules: [{ required: true, message: '请选择导出数据时间范围' }],
                        initialValue: false
                      })(
                        <Switch unCheckedChildren='全量' checkedChildren='部分' onChange={this.handleSwitch} />
                      )}
                    </FormItem>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 10 }}
                    md={{ span: 10 }}
                    lg={{ span: 10 }}
                  >
                    {
                      this.state.switch ?
                        <FormItem>
                          <i>从&nbsp;&nbsp;&nbsp;</i>
                          {getFieldDecorator('time', {
                            rules: [{ required: true, message: '请选择开始时间' }],
                            initialValue: moment('00:00:00', 'HH:mm:ss')
                          })(
                            <DatePicker
                              showTime
                              format='YYYY-MM-DD HH:mm:ss'
                              allowClear
                              placeholder='请选择开始时间'
                            />
                          )}
                          <i>&nbsp;&nbsp;&nbsp;---   至今</i>
                        </FormItem>
                      :
                        ''
                    }
                  </Col>
                </Row>
                <FormItem {...tailFormItemLayout}>
                  <Button
                    htmlType='submit'
                    className='upload-demo-start'
                    type='primary'
                    icon='download'
                    size='large'
                  >
                    导出
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
          title='导出log'
          visible={this.state.expVisible}
          onCancel={this.handleLogExpCancel}
          footer={null}
          maskClosable={false}
        >
          <ExpLogs
            handleLogCancel={this.handleLogExpCancel}
            exportsEn={this.props.exportsEn}
            productsMap={this.props.productsMap}
          />
        </Modal>
        <Modal
          width={800}
          key={Math.random()}
          title='导入log'
          visible={this.state.impVisible}
          onCancel={this.handleLogImpCancel}
          footer={null}
          maskClosable={false}
        >
          <ImpLogs
            handleLogCancel={this.handleLogImpCancel}
            exportsEn={this.props.exportsEn}
            productsMap={this.props.productsMap}
          />
        </Modal>
      </div>
    )
  }
}

const Index = Form.create()(IndexForm)

export default Index
