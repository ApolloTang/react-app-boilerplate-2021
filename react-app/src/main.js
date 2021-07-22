import React from 'react'
import ReactDom from 'react-dom'

import fonts from 'common/fonts/'

import './main.less'

import CuteCat from './cute-cat/index.jsx'

import reactLogo from './react-logo.svg'
console.log('xxx :', reactLogo)

const App = () => <>
  <div>hello react</div>
  <div>
    <img src={`${reactLogo}`}/>
  </div>

  <CuteCat />
</>
const appContainer = document.getElementById('app-container')
ReactDom.render( <App/>,  appContainer)

