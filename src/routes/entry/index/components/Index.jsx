import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import moment from 'moment'
import { Row, Col, Form, Card, Select, Input, Button, Modal } from 'antd'

import PageHeaderLayout from '../../../../base/components/PageHeaderLayout'
// import StandardFormRow from 'ant-design-pro/lib/StandardFormRow'
// import TagSelect from 'ant-design-pro/lib/TagSelect'
// import AvatarList from 'ant-design-pro/lib/AvatarList'

import styles from './Index.less'
import List from './List'
import Version from './Version'
import Import from './Import'
import Export from './Export'
import Create from './Create'
import Edit from './Edit'

const { Option } = Select

class Entry extends PureComponent {
  state = {
    initials: {
      params: {
        base: '',
        version: '',
        language: '',
        category: ''
      },
      conf: {
        locale: false
      }
    },
    modal: {
      visible: false,
      type: '',
      title: ''
    },
    currentEdit: {},
    currentLanguage: '',
    currentLanguageId: 1
  }

  componentWillMount() {
    const { params } = this.props
    this.props.fetchVersions({
      path: { productId: params.productId }
    })
    this.props.fetchLanguages()
    this.setState({
      currentLanguageId: this.props.entry.lanId
    })
  }

  handleCreateVersion = () => {
    this.setState({
      modal: {
        visible: true,
        type: 'VERSION',
        title: '添加版本号'
      }
    })
  }

  handleImport = () => {
    this.setState({
      modal: {
        visible: true,
        type: 'IMPORT',
        title: '导入'
      }
    })
  }

  handleExport = () => {
    this.setState({
      modal: {
        visible: true,
        type: 'EXPORT',
        title: '导出'
      }
    })
  }

  handleCreate = () => {
    this.setState({
      modal: {
        visible: true,
        type: 'CREATE',
        title: `新增词条 - ${this.props.location.state}`
      }
    })
  }

  handleEdit = (record) => {
    this.setState({
      modal: {
        visible: true,
        type: 'EDIT',
        title: `编辑词条 - ${this.props.location.state}`
      },
      currentEdit: record
    })
  }

  handleCancel = (e) => {
    this.setState({
      modal: {
        visible: false,
        type: '',
        title: ''
      }
    })
  }

  onCreate = (values) => {
    const { params } = this.props
    if (values.handle === 'VERSION')
    this.props.createVersion({
      path: { productId: params.productId },
      form: values.form
    })
  }

  onModalLoad = () => {
    return this.state.modal
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { params } = this.props
        let data = {}
        if (values.entry) data.entry = values.entry
        if (values.version) data.version = values.version
        if (values.language) data.language = values.language

        this.props.fetchEntries({
          language: values.language,
          path: {
            productId: params.productId
          },
          params: {
            ...data
          }
        })

        _.map(this.props.entry.languages, (v, i) => {
          if (v.id === values.language) {
            this.setState({
              currentLanguage: v.name,
              currentLanguageId: v.id
            })
          }
        })

        this.setState({
          conf: {
            locale: true
          }
        })
      }
    })
  }

  render() {
    const { form, entry } = this.props
    const { getFieldDecorator } = form
    const { versions, languages } = entry
    const options = { entry }
    const initials = this.state.initials
    const modals = this.state.modal
    const { login: { authorize } } = this.props

    const versionOpts = versions.map(item => <Option key={item.id} value={item.version}>{item.version}</Option>)
    const languageOpts = languages.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)

    const pageHeaderContent = _.indexOf(authorize, 30500) !== -1 ?
    (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row justify='center' align='middle' className='searchTipRow'>
            <Col xs={{ span: 20 }} lg={{ span: 12 }} xl={{ span: 14 }} className='firstRowInput'>
              {getFieldDecorator('entry')(
                <Input
                  placeholder='请输入基础词条'
                  size='large'
                />
              )}
            </Col>
            <Col xs={{ span: 20 }} lg={{ span: 10, offset: 2 }} xl={{ span: 6 }} key='secondRowSelect'>
              <Row justify='center' align='middle'>
                <Col xs={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 22 }} style={{marginBottom: '20px'}} key='secondRowVersion'>
                  {getFieldDecorator('version', {
                    rules: [{
                      required: true,
                      pattern: /\d{1,2}.\d{1,2}.\d{1,3}$/i,
                      message: '请选择版本'
                    }]
                  })(
                    <Select placeholder='请选择版本' style={{ width: '80%' }}>
                      {versionOpts}
                    </Select>
                  )}
                </Col>
                <Col xs={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 22 }} key='secondRowLanguage'>
                  {getFieldDecorator('language', {
                    rules: [{ required: true, message: '请选择语种' }]
                  })(
                    <Select placeholder='请选择语种' style={{ width: '80%' }}>
                      {languageOpts}
                    </Select>
                    )}
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <Button type='primary' htmlType='submit'>查询</Button>
            </Col>
          </Row>
        </Form>
      </div>
    ) : ''

    const pageHeaderExtra = (
      <Row className='pageHeaderExtra_Row'>
        <Col lg={{ span: 7 }} xl={{ span: 5 }} xxl={{ span: 4 }}>
          {
            _.indexOf(authorize, 50300) !== -1 ? (
              <div>
                <Button icon='profile' type='primary' onClick={this.handleCreateVersion}>产品版本</Button>
              </div>
            ) : ''
          }
          {
            _.indexOf(authorize, 30700) !== -1 ? (
              <div>
                <Button icon='plus' type='primary' onClick={this.handleCreate}>新增词条</Button>
              </div>
            ) : ''
          }
        </Col>
        <Col lg={{ span: 7 }} xl={{ span: 5 }} xxl={{ span: 4 }}>
          {
            _.indexOf(authorize, 30800) !== -1 ? (
              <div>
                <Button icon='upload' type='primary' onClick={this.handleImport}>导入</Button>
              </div>
            ) : ''
          }
          {
            _.indexOf(authorize, 30900) !== -1 ? (
              <div>
                <Button icon='download' type='primary' onClick={this.handleExport}>导出</Button>
              </div>
            ) : ''
          }
        </Col>
        {/* <Col lg={{ span: 7 }} xl={{ span: 5 }} xxl={{ span: 4 }}>
          <div>
            <Button icon='download' type='primary' onClick={this.handleExport}>导出</Button>
          </div>
          <div>
            <Button icon='plus' type='primary' onClick={this.handleCreate}>词条分类</Button>
          </div>
        </Col> */}
      </Row>
    )

    return (
      <div style={{ marginTop: 30 }}>
        <PageHeaderLayout
          title={`词条列表 - ${this.props.location.state}`}
          content={pageHeaderContent}
          extraContent={pageHeaderExtra}
        >
          <div className={styles.coverCardList}>
            {/* <Card bordered={false}>
              <Form layout='inline'>
                <StandardFormRow title='词条分类' block style={{ paddingBottom: 11 }}>
                  <FormItem>
                    {getFieldDecorator('category', {
                      rules: [{ required: true, message: '请填写产品名称' }]
                    })(
                      <TagSelect onChange={this.handleSubmit} expandable>
                        <TagSelect.Option value='cat1'>其他</TagSelect.Option>
                        <TagSelect.Option value='cat2'>背包</TagSelect.Option>
                        <TagSelect.Option value='cat3'>装备</TagSelect.Option>
                        <TagSelect.Option value='cat4'>技能</TagSelect.Option>
                        <TagSelect.Option value='cat5'>宝石</TagSelect.Option>
                        <TagSelect.Option value='cat6'>邮件</TagSelect.Option>
                        <TagSelect.Option value='cat7'>聊天</TagSelect.Option>
                        <TagSelect.Option value='cat8'>充值</TagSelect.Option>
                        <TagSelect.Option value='cat9'>体力</TagSelect.Option>
                        <TagSelect.Option value='cat10'>小红点</TagSelect.Option>
                        <TagSelect.Option value='cat11'>神兵</TagSelect.Option>
                        <TagSelect.Option value='cat12'>坐骑</TagSelect.Option>
                        <TagSelect.Option value='cat13'>道具</TagSelect.Option>
                      </TagSelect>
                    )}
                  </FormItem>
                </StandardFormRow>
              </Form>
            </Card> */}
            <Card bordered={false} style={{ marginTop: 24 }}>
              <div className={styles.tableList}>
                <List
                  options={options}
                  initials={initials}
                  location={this.props.location}
                  handleEdit={this.handleEdit}
                  refreshEdit={this.props.refreshEdit}
                  currentLanguageId={this.state.currentLanguageId}
                  currentLanguage={this.state.currentLanguage}
                  productId={this.props.params.productId}
                  titles={this.props.location.state}
                  proName={this.props.location.state}
                  entryDelete={this.props.entryDelete}
                  entry={this.props.entry}
                  login={this.props.login}
                />
              </div>
            </Card>
            <Modal
              width={800}
              key={Math.random()}
              title={modals.type === 'VERSION' && modals.title}
              visible={modals.type === 'VERSION' && modals.visible}
              onCancel={this.handleCancel}
              footer={null}
              maskClosable={false}
            >
              <Version
                options={options}
                initials={initials}
                onCreate={this.onCreate}
                onModalLoad={this.onModalLoad}
                onSubmitting={this.handleCancel}
              />
            </Modal>
            <Modal
              width={800}
              key={Math.random()}
              title={modals.type === 'IMPORT' && modals.title}
              visible={modals.type === 'IMPORT' && modals.visible}
              onCancel={this.handleCancel}
              footer={null}
              maskClosable={false}
            >
              <Import
                productId={{productId: this.props.params.productId}}
                entry={this.props.entry}
              />
            </Modal>
            <Modal
              width={800}
              key={Math.random()}
              title={modals.type === 'EXPORT' && modals.title}
              visible={modals.type === 'EXPORT' && modals.visible}
              onCancel={this.handleCancel}
              footer={null}
              maskClosable={false}
            >
              <Export
                productId={{productId: this.props.params.productId}}
                entry={this.props.entry}
              />
            </Modal>
            <Modal
              width={800}
              key={Math.random()}
              title={modals.type === 'CREATE' && modals.title}
              visible={modals.type === 'CREATE' && modals.visible}
              onCancel={this.handleCancel}
              footer={null}
              maskClosable={false}
            >
              <Create
                productId={{productId: this.props.params.productId}}
                entry={this.props.entry}
                onSubmitting={this.handleCancel}
              />
            </Modal>
            <Modal
              width={800}
              key={Math.random()}
              title={modals.type === 'EDIT' && modals.title}
              visible={modals.type === 'EDIT' && modals.visible}
              onCancel={this.handleCancel}
              footer={null}
              maskClosable={false}
            >
              <Edit
                productId={{productId: this.props.params.productId}}
                entry={this.props.entry}
                currentEdit={this.state.currentEdit}
                languages={this.props.entry.languages}
                onSubmitting={this.handleCancel}
                refreshEdit={this.props.refreshEdit}
              />
            </Modal>
          </div>
        </PageHeaderLayout>
      </div>
    )
  }
}

Entry.propTypes = {
  location: PropTypes.object,
  form: PropTypes.object,
  entry: PropTypes.object,
  params: PropTypes.object,
  fetchEntries: PropTypes.func,
  fetchVersions: PropTypes.func,
  createVersion: PropTypes.func,
  fetchLanguages: PropTypes.func,
  refreshEdit: PropTypes.func,
  entryDelete: PropTypes.func,
  login: PropTypes.object
}

const Index = Form.create()(Entry)

export default Index
