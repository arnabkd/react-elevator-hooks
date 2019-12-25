import React from 'react'
import './App.css'
import { Building } from './Building'

const App: React.FC = () => {
  return (
    <div className='App'>
      <Building numFloors={10} />
    </div>
  )
}

export default App
