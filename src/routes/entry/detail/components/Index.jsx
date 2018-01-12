import React, {Component} from 'react'
import { Modal, Button, Card, Divider } from 'antd'
import PropTypes from 'prop-types'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
// import PageHeaderLayout from '../../../../base/components/PageHeaderLayout'
import PageHeader from 'ant-design-pro/lib/PageHeader'
import { Link } from 'react-router'
import _ from 'lodash'
import Edit from './Edit'
import './Index.less'


export default class Index extends Component {

  static propTypes = {
    location: PropTypes.object,
    detail: PropTypes.object,
    entry: PropTypes.object,
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
        id: this.props.location.state.data.id,
        language: this.props.location.state.currentLanguageId
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
    let transdetail = (
      <div>
        <DescriptionList size='small' col='1'>
          <Description className='des_fanyi' term='基础词条'>{lists.baseEntry}</Description>
        </DescriptionList>
        <Divider />
        <Link to={{ pathname: `${this.props.location.pathname.slice(0, 11)}/entries`, state: this.props.location.state.proName }} >返回</Link>
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
          <Link to={{ pathname: `${this.props.location.pathname.slice(0, 11)}/entries`, state: this.props.location.state.proName }} >返回</Link>
        </div>
      )
    }

    const description = (
      <DescriptionList size='small' col='3'>
        <Description term='创建人'>{lists.author}</Description>
        <Description term='创建时间'>{lists.createTime}</Description>
        <Description term='版本'>{lists.version}</Description>
        <Description term='项目'>{this.props.location.state.titles}</Description>
        <Description term='更新时间'>{lists.updateTime}</Description>
        <Description term='语种'>{lists.language}</Description>
      </DescriptionList>
     )
    const action = (
      <div>
        {
          _.indexOf(this.props.login.authorize, 30400) !== -1 ?
            <Button type='primary' style={{position: 'relative', top: '25px'}} onClick={this.showModal}>编辑</Button>
            :
            ''
          }
        <Modal
          title='编辑'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Edit
            data={lists}
            entry={this.props.entry}
            currentLanguageId={this.props.location.state.currentLanguageId}
            fetchEdit={this.props.fetchEdit}
            productId={this.props.location.state.productId}
            handleCancel={this.handleCancel}
            login={this.props.login}
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
              <div className='keyname'>{`KEY：\n ${this.props.detail.lists.key}`}</div>
            </div>
          }
          action={action}
          content={description}
        />
        {/* <PageHeader
          title='翻译详情'
          content={transdetail}
        /> */}
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
