import React, {PureComponent} from 'react'
import _ from 'lodash'
import { Modal, Button, Card, Divider } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import PageHeader from 'ant-design-pro/lib/PageHeader'
import { Link } from 'react-router'

import Edit from './Edit'
import './Index.less'

export default class Detail extends PureComponent {
  static propTypes = {
    location: PropTypes.object,
    detail: PropTypes.object,
    fetchDetail: PropTypes.func,
    fetchEdit: PropTypes.func,
    login: PropTypes.object
  }

  state = {
    visible: false
  }

  componentWillMount() {
    this.props.fetchDetail(
      {
        id: this.props.location.state.id,
        language: this.props.location.state.languageId
      }
    )
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { lists } = this.props.detail
    const { Description } = DescriptionList
    const { login: { authorize } } = this.props

    let transdetail = (
      <div>
        <DescriptionList size='small' col='1'>
          <Description className='des_fanyi' term='基础词条'>{lists.baseEntry}</Description>
        </DescriptionList>
        <Divider />
        <Link to={{ pathname: `${this.props.location.state.searchURL}/entries` }} >返回</Link>
      </div>
    )
    if (lists.language !== '基础词条') {
      transdetail = (
        <div>
          <DescriptionList size='small' col='1'>
            <Description className='des_jichu' term='基础词条'>{lists.baseEntry}</Description>
            <Divider style={{ margin: '16px 0' }} />
            <Description className='des_fanyi' term='翻译'>{lists.translation}</Description>
          </DescriptionList>
          <Divider />
          <Link to={{ pathname: `${this.props.location.state.searchURL}/entries`, state: this.props.location.state.proName }} >返回</Link>
        </div>
      )
    }

    const description = (
      <DescriptionList size='small' col='3'>
        <Description term='创建人'>{lists.author}</Description>
        <Description term='创建时间'>{moment(lists.createTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
        <Description term='版本'>{lists.version}</Description>
        <Description term='项目'>{this.props.location.state.product}</Description>
        <Description term='更新时间'>{moment(lists.updateTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
        <Description term='语种'>{lists.language}</Description>
      </DescriptionList>
     )

    const action = (
      <div>
        {
          _.indexOf(authorize, 30400) !== -1 ? <Button type='primary' style={{position: 'relative', top: '25px'}} onClick={this.showModal}>编辑</Button> : ''
        }
        <Modal
          width={800}
          title='编辑'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Edit
            data={lists}
            productId={this.props.location.state.productId}
            languageId={this.props.location.state.languageId}
            fetchEdit={this.props.fetchEdit}
            handleCancel={this.handleCancel}
          />
        </Modal>
      </div>
  )
    return (
      <div>
        <PageHeader
          title={
            <div>
              <div className='title'>词条详情</div>
              <div className='keyname'>{`KEY：\n ${lists.key}`}</div>
            </div>
          }
          action={action}
          content={description}
        />
        <PageHeader
          content={
            <Card
              title='翻译详情'
              type='inner'
            >
              {transdetail}
            </Card>
          }
        />
      </div>
    )
  }
}
