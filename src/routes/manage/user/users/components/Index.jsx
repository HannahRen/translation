import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Page from '../containers/IndexContainer'

class Index extends Component {

  render() {
    const { location } = this.props

    return (
      <div>
        <Page
          location={location}
        />
      </div>
    )
  }
}

Index.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Index)
