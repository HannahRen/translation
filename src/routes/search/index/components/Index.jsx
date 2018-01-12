import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input, Card, List, Select } from 'antd'

import PageHeaderLayout from '../../../../base/components/PageHeaderLayout'
import styles from './Index.less'

class Search extends PureComponent {
  state = {
    productSelection: 0
  }

  componentWillMount() {
    this.props.fetchLanguages()
    this.props.fetchProductsMap()
    this.props.fetchSearchEntries({
      entry: this.props.params.searchId
    })
  }
  handleSearch = (value) => {
    if (value) {
      this.context.router.push({
        pathname: `/search/${value}/entries`,
        state: value
      })
      this.props.fetchSearchEntries({
        entry: value
      })
      console.log(this.state.productSelection)
    } else {
      this.context.router.push('/products')
    }
  }
  productSelect = (e) => {
    this.setState({
      productSelection: e
    })
  }

  render() {
    const Option = Select.Option
    const { searchEntries, languages } = this.props.search
    const products = this.props.productsMap.options
    const { login: { authorize } } = this.props

    let productOptions = []
    _.map(products, (v, i) => {
      productOptions.push(<Option key={v.id} >{`${v.name}`}</Option>)
    })

    const pageHeaderContent = _.indexOf(authorize, 30200) !== -1 ?
    (
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <Input.Search
          defaultValue={this.props.params.searchId}
          placeholder='请输入...'
          enterButton='搜索'
          size='large'
          onSearch={value => this.handleSearch(value)}
          style={{ width: 500 }}
        />
      </div>
    ) : ''

    // const pageExtraContent = (
    //   <Select
    //     style={{ width: 150, marginRight: '20rem' }}
    //     defaultValue='所有游戏'
    //     onChange={this.productSelect}
    //     disabled
    //   >
    //     <Option key='0'>所有游戏</Option>
    //     {productOptions}
    //   </Select>
    // )

    const ListContent = ({ data: { key, base, translation, productName, languageName, version, createTime } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}><strong>KEY: </strong>{key}</div>
        <div className={styles.description}>
          <strong>基础词条: </strong>
          <span dangerouslySetInnerHTML={{__html: base}} />
        </div>
        <div className={styles.description}>
          <strong>翻译: </strong>
          <span dangerouslySetInnerHTML={{__html: translation}} />
        </div>
        <div className={styles.extra}>
          <span><strong>来源: </strong>{productName}</span>
          <span><strong>版本: </strong>{version}</span>
          <span><strong>语种: </strong>{languageName}</span>
          <em>{createTime}</em>
        </div>
      </div>
    )

    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100', '200'],
      total: searchEntries.length
    }

    return (
      <div style={{marginTop: 30}}>
        <PageHeaderLayout
          title='搜索列表'
          content={pageHeaderContent}
        >
          <Card
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: '8px 32px 32px 32px' }}
          >
            <List
              size='large'
              pagination={pagination}
              itemLayout='vertical'
              dataSource={searchEntries}
              renderItem={item => {
                _.map(languages, (v, i) => {
                  if (item.language == v.id) {
                    item.languageName = v.name
                  }
                })
                _.map(products, (v, i) => {
                  if (item.product == v.id) {
                    item.productName = v.name
                  }
                })
                item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                let url = this.props.location.pathname.slice(0, this.props.location.pathname.length - 8)
                return (
                  <List.Item>
                    <List.Item.Meta
                      title={(
                        <Link to={_.indexOf(authorize, 30300) !== -1 ? {
                            pathname: `${url}/detail/${item.key}`,
                            state: {
                              languageId: item.language,
                              product: item.productName,
                              productId: item.product,
                              id: item.id,
                              searchURL: url
                            }
                          } : 'javascript:void(0)'}
                          dangerouslySetInnerHTML={{__html: item.base}}
                          className={styles.listItemMetaTitle}
                        />
                      )}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )
              }}
            />
          </Card>
        </PageHeaderLayout>
      </div>
    )
  }
}

Search.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
  fetchSearchEntries: PropTypes.func,
  fetchLanguages: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  productsMap: PropTypes.object,
  search: PropTypes.object,
  login: PropTypes.object
}

Search.contextTypes = {
  router: PropTypes.object
}

export default Search
