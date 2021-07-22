import React from 'react'
import ReactDom from 'react-dom'

import fonts from 'common/fonts/'
import fooStyleModule from './foo.module.less'
console.log('xxxx', fooStyleModule)

import './main.less'
import img from './react.png'

import CuteCat from './cute-cat/index.jsx'

const App = () => <>
  <div>hello react</div>
  <div><img src={img} /></div>
  <CuteCat />
</>
const appContainer = document.getElementById('app-container')
ReactDom.render( <App/>,  appContainer)

