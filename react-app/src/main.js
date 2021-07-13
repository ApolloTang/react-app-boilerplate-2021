import React from 'react'
import ReactDom from 'react-dom'

import fonts from 'common/fonts/'
import fooStyleModule from './foo.module.less'
console.log('xxxx', fooStyleModule)

import './main.less'
const App = () => <div>hello react</div>
const appContainer = document.getElementById('app-container')
ReactDom.render( <App/>,  appContainer)

