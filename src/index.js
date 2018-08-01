import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MultiAppContainer from './MultiAppContainer'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<MultiAppContainer />, document.getElementById('root'))
registerServiceWorker()
