import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AppState from './context/appState'

ReactDOM.render(
  <React.StrictMode>
    <AppState>
      <App />
    </AppState>
  </React.StrictMode>,
  document.getElementById('root')
)
