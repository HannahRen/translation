import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import IndexP from '../containers/IndexContainer'

class Page extends Component {

  constructor(props) {
    super(props)
    this.redirect = this.redirect.bind(this)
  }

  redirect() {
    this.props.router.push('/form')
  }

  render() {
    const { location } = this.props

    return (
      <div>
        <IndexP
          location={location}
        />
      </div>
    )
  }
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

export default withRouter(Page)
