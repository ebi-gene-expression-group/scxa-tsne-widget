import React from 'react'
import ReactDOM from 'react-dom'
import TSnePlotWidget from '../src/index'

const render = (options, target) => {
  ReactDOM.render(<TSnePlotWidget {...options} />, document.getElementById(target))
}

export { render }
