import React from 'react'
import ReactDom from 'react-dom'

import './main.less'
const App = () => <div>hello react</div>
const appContainer = document.getElementById('app-container')
ReactDom.render( <App/>,  appContainer)



