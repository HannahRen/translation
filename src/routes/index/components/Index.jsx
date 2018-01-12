import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, List, Button, Icon } from 'antd'

import styles from './Index.less'

export default class Index extends PureComponent {

  handleRoute = (path) => {
    this.context.router.push(path)
  }

  render() {
    const list = [
      { title: '导入词条', icon: 'upload', path: '/import' },
      { title: '导出词条', icon: 'download', path: '/export' },
      { title: '产品列表', icon: 'bars', path: '/products' }
    ]

    const cardList = list ? (
      <List
        rowKey='id'
        grid={{ gutter: 64, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Button type='dashed' className={styles.newButton} onClick={() => this.handleRoute(item.path)}>
              <Icon type={item.icon} style={{ fontSize: 22 }} />{ item.title }
            </Button>
          </List.Item>
        )}
      />
    ) : null

    return (
      <div style={{ margin: 30 }}>
        <Card borderd='false' style={{ padding: 40 }}>
          <div className={styles.cardList}>
            {cardList}
          </div>
        </Card>
      </div>
    )
  }
}

Index.contextTypes = {
  router: PropTypes.object
}
