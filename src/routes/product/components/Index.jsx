import React, { PureComponent } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Row, Col, Form, Card, List, Button, Modal, Input } from 'antd'
import { Link } from 'react-router'

import PageHeaderLayout from '../../../base/components/PageHeaderLayout'
// import StandardFormRow from 'ant-design-pro/lib/StandardFormRow'
// import TagSelect from 'ant-design-pro/lib/TagSelect'
import AvatarList from 'ant-design-pro/lib/AvatarList'
import styles from './Index.less'

import ProductModal from './Modal'

// const { Option } = Select
// const FormItem = Form.Item

class Product extends PureComponent {
  state = {
    currentItem: {},
    modalType: '',
    visible: false
  }

  componentWillMount() {
    this.props.fetchProducts()
  }

  componentDidMount() {
  }

  handleFormSubmit = () => {
    // const { form } = this.props
    // form.validateFields((err) => {
    //   if (!err) {
    //   }
    // })
  }

  handleSearch = (value) => {
    if (value) {
      this.context.router.push({
        pathname: `/search/${value}/entries`
      })
    }
  }

  handleCreate = () => {
    this.setState({
      modalType: 'create',
      visible: true
    })
  }

  handleUpload = (item) => {
    this.setState({
      currentItem: { ...item },
      modalType: 'upload',
      visible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      currentItem: {},
      modalType: '',
      visible: false
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    const { product } = this.props
    // const { getFieldDecorator } = form
    const list = product.products
    const modalType = this.state.modalType
    const { login: { authorize } } = this.props

    const cardList = list ? (
      <List
        rowKey='id'
        grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              // actions={_.indexOf(authorize, 20200) !== -1 ?
              //   [<Tooltip title='上传产品图片'><a onClick={() => this.handleUpload(item)}><Icon type='picture' /></a></Tooltip>]
              //  : ''}
              // actions={[
              //   <Tooltip title='下载'><Icon type='download' /></Tooltip>,
              //   _.indexOf(authorize, 202000) !== -1 ? <Tooltip title='上传产品图片'><a onClick={() => this.handleUpload(item)}><Icon type='picture' /></a></Tooltip> : '',
              //   <Tooltip title='分享'><Icon type='share-alt' /></Tooltip>
              //  ]}
              cover={<img alt={item.name} src={item.img} height={154} />}
            >
              <Link to={{ pathname: `/products/${item.id}/entries`, state: item.name }} className={styles.card_a}>
                <Card.Meta
                  title={<div className='card_a_title'>{item.name}</div>}
                  description={item.description}
                />
                <div style={{ marginTop: 16 }}>
                  <Row>
                    <Col span={12}>
                      <div style={{ color: 'rgba(0,0,0,.45)' }}>所有词条</div>
                      <div style={{color: '#5f5959', fontWeight: 900, fontSize: '24px', fontFamily: 'Helvetica Neue For Number'}}>{item.totalEntry}</div>
                    </Col>
                    <Col span={12}>
                      <div style={{ color: 'rgba(0,0,0,.45)' }}>新增词条</div>
                      <div style={{color: '#5f5959', fontWeight: 900, fontSize: '24px', fontFamily: 'Helvetica Neue For Number'}}>{item.recentEntry}</div>
                    </Col>
                  </Row>
                </div>
                <div className={styles.cardItemContent}>
                  <span>{moment(item.updateTime).fromNow()}</span>
                  <div className={styles.avatarList}>
                    <AvatarList size='mini'>
                      {
                        item.editors && item.editors.substring(1, item.editors.lastIndexOf(']')).split(',').map((member, i) => (
                          <AvatarList.Item
                            key={`${item.id}-avatar-${i}`}
                            src=''
                            tips={member}
                          />
                        ))
                      }
                    </AvatarList>
                  </div>
                </div>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    ) : null

    const pageHeaderContent = _.indexOf(authorize, 30200) !== -1 ?
    (
      <div style={{ textAlign: 'center', margin: _.indexOf(authorize, 20100) !== -1 ? '0 0 10px 20rem' : '' }}>
        <Input.Search
          placeholder='请输入...'
          enterButton='搜索'
          size='large'
          onSearch={value => this.handleSearch(value)}
          style={{ width: 522 }}
        />
      </div>
    ) : ''

    const pageExtraContent = _.indexOf(authorize, 20100) !== -1 ?
    (
      <div>
        <Button icon='plus' type='primary' onClick={this.handleCreate}>新增产品</Button>
      </div>
    ) : ''

    // const formItemLayout = {
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 }
    //   }
    // }

    return (
      <div style={{ marginTop: 30 }}>
        <PageHeaderLayout
          title='产品列表'
          content={pageHeaderContent}
          extraContent={pageExtraContent}
        >
          <div className={styles.coverCardList}>
            {/* <Card bordered={false}>
              <Form layout='inline'>
                <StandardFormRow title='所属类目' block style={{ paddingBottom: 11 }}>
                  <FormItem>
                    {getFieldDecorator('category')(
                      <TagSelect onChange={this.handleFormSubmit} expandable>
                        <TagSelect.Option value='cat1'>类目一</TagSelect.Option>
                        <TagSelect.Option value='cat2'>类目二</TagSelect.Option>
                        <TagSelect.Option value='cat3'>类目三</TagSelect.Option>
                        <TagSelect.Option value='cat4'>类目四</TagSelect.Option>
                        <TagSelect.Option value='cat5'>类目五</TagSelect.Option>
                        <TagSelect.Option value='cat6'>类目六</TagSelect.Option>
                        <TagSelect.Option value='cat7'>类目七</TagSelect.Option>
                        <TagSelect.Option value='cat8'>类目八</TagSelect.Option>
                        <TagSelect.Option value='cat9'>类目九</TagSelect.Option>
                        <TagSelect.Option value='cat10'>类目十</TagSelect.Option>
                        <TagSelect.Option value='cat11'>类目十一</TagSelect.Option>
                        <TagSelect.Option value='cat12'>类目十二</TagSelect.Option>
                        <TagSelect.Option value='cat13'>类目十三</TagSelect.Option>
                      </TagSelect>
                    )}
                  </FormItem>
                </StandardFormRow>
                <StandardFormRow
                  title='其它选项'
                  grid
                  last
                >
                  <Row gutter={24}>
                    <Col lg={8} md={10} sm={10} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='作者'
                      >
                        {getFieldDecorator('author', {})(
                          <Select
                            onChange={this.handleFormSubmit}
                            placeholder='不限'
                            style={{ maxWidth: 200, width: '100%' }}
                          >
                            <Option value='lisa'>王昭君</Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col lg={8} md={10} sm={10} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label='好评度'
                      >
                        {getFieldDecorator('rate', {})(
                          <Select
                            onChange={this.handleFormSubmit}
                            placeholder='不限'
                            style={{ maxWidth: 200, width: '100%' }}
                          >
                            <Option value='good'>优秀</Option>
                            <Option value='normal'>普通</Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </StandardFormRow>
              </Form>
            </Card> */}
            <div className={styles.cardList}>
              {cardList}
            </div>
            <Modal
              key='create-product'
              title='新增产品'
              visible={modalType === 'create' && this.state.visible}
              onCancel={this.handleCancel}
              footer={null}
              maskClosable={false}
              destroyOnClose
            >
              <ProductModal
                // options={this.props.options}
                // initials={this.props.initials}
                onCreate={this.props.createProduct}
                onModalLoad={this.onModalLoad}
                onSubmitting={this.handleCancel}
              />
            </Modal>
          </div>

        </PageHeaderLayout>
      </div>
    )
  }
}

Product.propTypes = {
  // form: PropTypes.object,
  product: PropTypes.object,
  fetchProducts: PropTypes.func,
  createProduct: PropTypes.func,
  login: PropTypes.object
}
Product.contextTypes = {
  router: PropTypes.object
}


const Index = Form.create()(Product)

export default Index
