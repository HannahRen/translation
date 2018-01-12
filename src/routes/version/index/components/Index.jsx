import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PageHeader from 'ant-design-pro/lib/PageHeader'
import { Card } from 'antd'

import Tables from './Table'

export default class Index extends Component {

  static propTypes = {
    versions: PropTypes.object,
    login: PropTypes.object,
    productsMap: PropTypes.object,
    fetchLanguage: PropTypes.func,
    fetchVersion: PropTypes.func,
    fetchProductsMap: PropTypes.func,
    fetchRecord: PropTypes.func,
    fetchRecord2: PropTypes.func,
    clearRecord2: PropTypes.func
  }

  render() {
    const { login: { authorize } } = this.props

    return (
      <div>
        <div style={{marginTop: '30px'}} >
          <PageHeader
            title='版本对比'
            content={
              <div style={{marginLeft: '100px'}}>请先选择你要查询的版本记录,然后点击‘下一步’获取版本历史记录。在版本历史记录中选择你想要对比的版本进行对比查看。</div>
            }
          />
        </div>
        <Card style={{marginTop: '10px'}} >
          <Tables
            versions={this.props.versions}
            authorize={authorize}
            productsMap={this.props.productsMap}
            fetchLanguage={this.props.fetchLanguage}
            fetchVersion={this.props.fetchVersion}
            fetchProductsMap={this.props.fetchProductsMap}
            fetchRecord={this.props.fetchRecord}
            fetchRecord2={this.props.fetchRecord2}
            clearRecord2={this.props.clearRecord2}
          />
        </Card>
      </div>
    )
  }
}
