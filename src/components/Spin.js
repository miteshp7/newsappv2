import React, { Component } from 'react'

export class Spin extends Component {
  render() {
    return (
        <div className="my-3 text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
  }
}

export default Spin
