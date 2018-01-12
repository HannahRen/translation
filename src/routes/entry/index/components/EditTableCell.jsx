import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Ellipsis from 'ant-design-pro/lib/Ellipsis'
// import _ from 'lodash'
import { Input, Icon } from 'antd'


export default class EditTable extends Component {

  static propTypes = {
    data: PropTypes.string,
    onValueChange: PropTypes.func
  }

  state = {
    value: this.props.data,
    editable: false,
    spare: this.props.data
  }

  handleChange = (e) => {
    const val = e.target.value
    this.setState({
      value: val
    })
  }
  handleCheck = () => {
    this.setState({ editable: false })
    if (this.props.onValueChange) {
      this.props.onValueChange(this.state.value)
      this.setState({ spare: this.state.value })
    }
  }
  handleEdit = () => {
    this.setState({ editable: true })
  }
  handleCancel = () => {
    const spares = this.state.spare
    this.setState({
      editable: false,
      value: spares
    })
  }
  handleKeyDown = (e) => {
    if (e.keyCode == '27') {
      const spares = this.state.spare
      this.setState({
        editable: false,
        value: spares
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.data
    })
  }

  render() {
    const { value, editable } = this.state

    return (
      <div className='editable-cell'>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.handleCheck}
                onKeyDown={this.handleKeyDown}
                style={{ width: '90%' }}
              />
              <Icon
                type='check'
                onClick={this.handleCheck}
                style={{ marginLeft: '10px' }}
              />
              <Icon
                type='close'
                onClick={this.handleCancel}
                style={{ marginLeft: '6px' }}
              />
            </div>
            :
            <div>
              {
                <Ellipsis tooltip length={30} style={{ display: 'inline' }}>{value}</Ellipsis> || ' '
              }
              <Icon
                type='edit'
                onClick={this.handleEdit}
                style={{ marginLeft: '10px' }}
              />
            </div>
        }
      </div>
    )
  }
}
