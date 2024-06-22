import React, { Component } from 'react'
import img from './XOsX.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-2 d-flex justify-content-center'>
        <img src={img} alt="loading" />
      </div>
    )
  }
}

export default Spinner
