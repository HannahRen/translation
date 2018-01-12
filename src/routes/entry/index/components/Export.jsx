/* global API_HOST */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import AxiosAPI from '../../../../../utils/axios-api'
import openNotificationWithIcon from '../../../../base/components/Notification'
import { Form, Select, Button, Icon, DatePicker, Switch, Row, Col } from 'antd'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option


class IndexForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    productId: PropTypes.object,
    entry: PropTypes.object
  }

  state = {
    switch: false
  }

  componentWillUnmount() {
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        if (values.switch) {
          values.time = values.time.format('YYYY-MM-DD HH:mm:ss')
        }
        this.fetchExport(values)
      }
    })
  }

  handleSwitch = (e) => {
    this.setState({
      switch: e
    })
  }

  fetchExport = (value) => {
    let url = `${API_HOST}/trans/export/products/${this.props.productId.productId}/version/${value.versions}/language/${value.languages}`
    let params = {}
    if (value.time) {
      params.startDate = value.time
    }
    AxiosAPI.post(
      url,
      {},
      {
        params: params,
        headers: {
          'adminUserId': JSON.parse(sessionStorage.getItem('hoolai')).userId,
          'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('hoolai')).token}`
        }
      }
    ).then(response => {
      window.open(`${API_HOST}/trans/download/${response.data.downloadLink}`)
    }).catch(error => {
      if (error.response) {
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
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
    // const formItemLayout2 = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4, offset: 3 },
    //     md: { span: 4, offset: 2 },
    //     lg: { span: 4, offset: 2 }
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 14 },
    //     md: { span: 17 },
    //     lg: { span: 17 }
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

    let verOptions = []
    _.map(this.props.entry.versions, (v, i) => {
      verOptions.push(<Option key={v.version}>{v.version}</Option>)
    })

    let lagOptions = []
    _.map(this.props.entry.languages, (v, i) => {
      lagOptions.push(<Option key={v.id}>{v.name}</Option>)
    })

    return (
      <div>
        <Form onSubmit={this.handleSubmit} hideRequiredMark >
          <FormItem
            {...formItemLayout}
            label='版本'
            className='form_version'
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
            className='form_version'
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
              sm={{ span: 3, offset: 5 }}
              md={{ span: 2, offset: 6 }}
              lg={{ span: 2, offset: 6 }}
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
              sm={{ span: 10, offset: 1 }}
              md={{ span: 10, offset: 2 }}
              lg={{ span: 10, offset: 2 }}
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
              className='upload-demo-start'
              type='primary'
              size='large'
              htmlType='submit'
            >
              <Icon type='download' />导出
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const Index = Form.create()(IndexForm)

export default Index
