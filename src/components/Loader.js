import React, { Component } from 'react'

export class Loader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      className: ''
    }
  }
  componentDidMount () {
    if (this.props.showLoader && !this.state.show) {
      this.show()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.showLoader && this.state.show) {
      this.hide()
    }
  }

  hide () {
    this.setState({ className: 'hide' })
    setTimeout(() => this.setState({ className: '', show: false }), 1200)
  }

  show () {
    this.setState({ show: true })
    setTimeout(() => this.setState({ className: 'show' }), 50)
  }

  render () {
    return (
      <div>
        {this.state.show &&
          <div className={`loader-overlay ${this.state.className}`}>

            <div className='loader-wrapper'>

              <div className='loader'>
                <div className='roller' />
                <div className='roller' />
              </div>

              <div id='loader2' className='loader'>
                <div className='roller' />
                <div className='roller' />
              </div>

              <div id='loader3' className='loader'>
                <div className='roller' />
                <div className='roller' />
              </div>

            </div>

            <h2 style={{ color: 'rgba(250,250,250, .75)', marginTop: '270px' }}>
              LOADING
            </h2>

          </div>}
      </div>
    )
  }
}

export default Loader
